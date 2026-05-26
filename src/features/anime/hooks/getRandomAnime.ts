import {getData} from './loadAnime';
import type { AnimeData } from '../types';

export async function getRandomAnime(): Promise<AnimeData | null> {
    const data = await getData();
    if (!data || data.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

export async function getTwoUniqueAnime(): Promise<[AnimeData, AnimeData] | null> {
    const anime1 = await getRandomAnime();
    let anime2 = await getRandomAnime();

    while (anime1 && anime2 && anime1.title === anime2.title) {
        anime2 = await getRandomAnime();
    }

    return anime1 && anime2 ? [anime1, anime2] : null;
}
