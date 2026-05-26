import {getData} from './loadCharacter';
import type { CharacterData } from '../types';

export async function getRandomCharacter(): Promise<CharacterData | null> {
    const data = await getData();
    if (!data || data.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
}

export async function getTwoUniqueCharacters(): Promise<[CharacterData, CharacterData] | null> {
    const character1 = await getRandomCharacter();
    let character2 = await getRandomCharacter();

    while (character1 && character2 && character1.name === character2.name) {
        character2 = await getRandomCharacter();
    }

    return character1 && character2 ? [character1, character2] : null;
}
