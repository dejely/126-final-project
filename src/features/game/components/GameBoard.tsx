import { useEffect, useState } from "react";
import {getTwoUniqueAnime } from "../../anime/hooks/getRandomAnime.ts";
import type { AnimeData } from "../../anime/types.ts";
import AnimeCardR from "../../anime/components/AnimeCardR.tsx";
import Heading from "../../../components/layout/Heading.tsx";
import ChoiceButton from "./ChoiceButton.tsx";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

function GameBoard(){
    const [anime1, setAnime1] = useState<AnimeData | null>(null);
    const [anime2, setAnime2] = useState<AnimeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        let cancelled = false;
        const fetchRandomAnime = async () => {
            try {
                const animePair = await getTwoUniqueAnime();
                
                if (cancelled) return;
                if (!animePair) {
                    setError("No anime data received");
                    return;
                }
                setAnime1(animePair[0]);
                setAnime2(animePair[1]);
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

    if (!anime1 || !anime2) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-board">
            <ChoiceButton choice={1} className="choice-button left">
                <AnimeCardR
                title={anime1.title}
                imgsrc={imageError ? PLACEHOLDER_IMAGE : anime1.image}
                alt={anime1.title}
                className="anime-card1"/>
            </ChoiceButton>

            <ChoiceButton choice={2} className="choice-button right">
            <Heading className="questionHeading">Which is higher rated?</Heading>
            <AnimeCardR
                title={anime2.title}
                imgsrc={imageError ? PLACEHOLDER_IMAGE : anime2.image}
                alt={anime2.title}
                className="anime-card2"
            />
            </ChoiceButton>
        </div>
    );
}

export default GameBoard;