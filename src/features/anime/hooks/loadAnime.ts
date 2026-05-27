import { getTop100 } from "../api/animeApi";
import type { AnimeData } from "../types.ts";

let animeData: AnimeData[] | null = null;
let fetchPromise: Promise<AnimeData[]> | null = null;

export async function getData() {
  if (animeData) {
    return animeData;
  }

  if (fetchPromise) {
    return fetchPromise; // Wait for the in-flight request
  }

  fetchPromise = (async () => {
    try {
      const data = await getTop100();
      animeData = data;
      return animeData;
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}
