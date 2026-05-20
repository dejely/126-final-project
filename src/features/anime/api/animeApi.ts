const endpoint = 'https://api.jikan.moe/v4/top/anime';

// pull top 100 anime
export async function getTop100() {
   const allData: any[] = [];

  for (let p = 1; p <= 4; p++) {
    let url = endpoint + "?page=" + p;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error on page ${p}: ${response.status}`);
    }

    const result = await response.json();

    allData.push(...result.data);
  }

  return allData.map((item) => ({ 
    id: item.mal_id,
    title: item.title,
    image: item.images.jpg.image_url,
    rating: item.score,
    popularity: item.popularity,
    favorites: item.favorites,
  }));
}
