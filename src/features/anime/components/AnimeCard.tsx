import { useEffect, useState } from "react";
import { getRandomAnime } from "../hooks/getRandomAnime.ts";
import type { AnimeData } from "../types.ts";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

function AnimeCard(){
    const [anime, setAnime] = useState<AnimeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const fetchRandomAnime = async () => {
            try {
                const randomAnime = await getRandomAnime();
                if (cancelled) return;
                if (!randomAnime) {
                    setError("No anime data received");
                    return;
                }
                setAnime(randomAnime);
            } catch (err) {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        };
        fetchRandomAnime();
        return () => { cancelled = true; };
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
                <img 
                    src={imageError ? PLACEHOLDER_IMAGE : anime.image} 
                    alt={anime.title} 
                    onError={() => setImageError(true)}
                    style={{ width: '200px', height: '300px' }} 
                />
                <h2>{anime.title}</h2>
                <p>Rating: {anime.rating}</p>
            </div>
        </article>
    );
}

export default AnimeCard;