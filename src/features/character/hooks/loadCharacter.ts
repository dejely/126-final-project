import { getTop100 } from "../api/characterApi";
import type { CharacterData } from "../types.ts";

let characterData: CharacterData[] | null = null;
let fetchPromise: Promise<CharacterData[]> | null = null;

export async function getData() {
  if (characterData) {
    return characterData;
  }

  if (fetchPromise) {
    return fetchPromise; // Wait for the in-flight request
  }

  fetchPromise = (async () => {
    try {
      const data = await getTop100();
      characterData = data;
      return characterData;
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}
