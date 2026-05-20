import { getTop100 } from "../api/animeApi";

let animeData: any[] | null = null;
let isFetching = false; //to ensure no duplicate fetches because of jikan's rate limit

export async function getData() {
  if (animeData) {
    return animeData;
  }

  let fetchPromise: Promise<any[]> | null = null;

  if (isFetching) {
    return fetchPromise!; // Wait for the in-flight request
  }

  isFetching = true;
  fetchPromise = (async () => {
    try {
        const data = await getTop100();
        animeData = data;
        return animeData;
  } finally {
        isFetching = false;
        fetchPromise = null;
  }
})();
 
return fetchPromise;
}
