const endpoint = 'https://api.jikan.moe/v4/top/anime';

// top 100 animes
export async function getTopAnimeChoices() {
  
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
    return allData.map((item: any) => ({
      id: item.mal_id,
      title: item.title,
      image: item.images.jpg.image_url,
      rating: item.score,
      popularity: item.popularity,
      favorites: item.favorites,
    }));
}
