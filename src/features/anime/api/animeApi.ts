const endpoint = 'https://api.jikan.moe/v4/top/anime';

interface AnimeEntry {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string}};
  score: number;
  popularity: number;
  favorites: number;
}

interface AnimeData {
  id: number;
  title: string;
  image: string;
  rating: number;
  popularity: number;
  favorites: number;
}

// pull top 100 anime
export async function getTop100() {
  
  const allData: AnimeEntry[] = [];

  for (let p = 1; p <= 4; p++) {
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
