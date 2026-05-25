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
