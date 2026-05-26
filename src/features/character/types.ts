export interface CharacterEntry {
  mal_id: number;
  name: string;
  images: { jpg: { image_url: string}};
  favorites: number;
};

export interface CharacterData {
  id: number;
  name: string;
  image: string;
  favorites: number;
}