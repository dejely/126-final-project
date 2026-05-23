import {getData} from './loadAnime';

export async function getRandomAnime() {
    const data = await getData();
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}