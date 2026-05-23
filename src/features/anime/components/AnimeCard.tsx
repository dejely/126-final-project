import { useEffect, useState } from "react";
import { getRandomAnime } from "../hooks/getRandomAnime.ts";
import type { AnimeData } from "../types.ts";
import Heading from "../../../components/layout/Heading.tsx";

function AnimeCard(){
    const [anime, setAnime] = useState<AnimeData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRandomAnime = async () => {
            try {
                const randomAnime = await getRandomAnime();
                if (!randomAnime) {
                    setError("No anime data received");
                    return;
                }
                setAnime(randomAnime);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Unknown error";
                setError(errorMessage);
            }
        };

        fetchRandomAnime();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!anime) {
        return <div>Loading...</div>;
    }

    return (
        <article className="animeCard">
            <div>
            <img src={anime.image} alt={anime.title} style={{ width: '200px', height: '300px' }} />
            <Heading>{anime.title}</Heading>
            </div>
        </article>
    );
}

export default AnimeCard;