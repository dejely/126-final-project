export interface AnimeEntry {
  mal_id: number;
  title: string;
  images: { jpg: { image_url: string}};
  score: number;
  popularity: number;
  favorites: number;
};

export interface AnimeData {
  id: number;
  title: string;
  image: string;
  rating: number;
  popularity: number;
  favorites: number;
}