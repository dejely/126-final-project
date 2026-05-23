import { useEffect, useState } from "react";
import { getRandomAnime } from "../hooks/getRandomAnime.ts";
import type { AnimeData } from "../types.ts";
import Heading from "../../../components/layout/Heading.tsx";

function AnimeCard(){
    const [anime, setAnime] = useState<AnimeData | null>(null);
    const [error, setError] = useState<string | null>(null);

useEffect(() => {
      let cancelled = false;               // flag to guard state updates
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
      return () => { cancelled = true; };  // cleanup
  }, []);
        const fetchRandomAnime = async () => {
            try {
                console.log("Fetching random anime...");
                const randomAnime = await getRandomAnime();
                console.log("Anime fetched:", randomAnime);
                if (!randomAnime) {
                    setError("No anime data received");
                    return;
                }
                setAnime(randomAnime);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Unknown error";
                console.error("Error fetching anime:", errorMessage);
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