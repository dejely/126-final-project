import {getTop100} from "../api/animeApi";

let animeData: any[] | null = null;
let isFetching = false; //to ensure no duplicate fetches because of jikan's rate limit

export async function getData() {
    if (animeData) {
        return animeData;
    }

    if (isFetching) {
        while (isFetching) {} //hold until Fetching is done 
        return animeData;
    }

    try{
        isFetching = true;

        const data = await getTop100();
        animeData = data;

        return animeData;
    } finally {
        isFetching = false;
    }

}   
