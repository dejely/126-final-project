import type { CharacterEntry, CharacterData } from "../types";

const endpoint = 'https://api.jikan.moe/v4/top/characters';

// Helper to add delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// pull top 100 characters
export async function getTop100() {
  
  const allData: CharacterEntry[] = [];

  for (let p = 1; p <= 8; p++) {
    if (p > 1) {
      // Add 1 second delay between requests to respect rate limits
      await delay(1000);
    }

    const url = endpoint + "?page=" + p;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error on page ${p}: ${response.status}`);
    }

    const result = await response.json();

    allData.push(...result.data);
  }

  return allData.map((item): CharacterData => ({ 
    id: item.mal_id,
    name: item.name,
    image: item.images?.jpg?.image_url ?? '',
    favorites: item.favorites,
  }));
}

