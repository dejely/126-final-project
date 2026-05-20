const endpoint = 'https://api.jikan.moe/v4/top/anime';

// top 25 animes
export async function getTopAnimeChoices() {
  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    return result.data.map((item: any) => ({
      id: item.mal_id,
      title: item.title,
      image: item.images.jpg.image_url,
      rating: item.score,
      popularity: item.popularity,
      favorites: item.favorites,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}