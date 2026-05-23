import type { AnimeEntry, AnimeData } from "../types";

const endpoint = 'https://api.jikan.moe/v4/top/anime';

// Helper to add delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// pull top 100 anime
export async function getTop100() {
  
  const allData: AnimeEntry[] = [];

  for (let p = 1; p <= 4; p++) {
    if (p > 1) {
      // Add 1 second delay between requests to respect rate limits
      await delay(1000);
    }

    let url = endpoint + "?page=" + p;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error on page ${p}: ${response.status}`);
    }

    const result = await response.json();

    allData.push(...result.data);
  }

  return allData.map((item): AnimeData => ({ 
    id: item.mal_id,
    title: item.title,
    image: item.images?.jpg?.image_url ?? '',
    rating: item.score,
    popularity: item.popularity,
    favorites: item.favorites,
  }));
}
