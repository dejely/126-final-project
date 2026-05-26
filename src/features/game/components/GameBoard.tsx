import { useEffect, useState } from "react";
import {getTwoUniqueAnime } from "../../anime/hooks/getRandomAnime.ts";
import type { AnimeData } from "../../anime/types.ts";
import AnimeCardR from "../../anime/components/AnimeCardR.tsx";
import ChoiceButton from "./ChoiceButton.tsx";
import { setUserChoice, setOtherChoice, getResultMessage } from "../hooks/useGame.ts";
import Heading from "../../../components/layout/Heading.tsx";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

function useRandomAnime() {
    const [anime1, setAnime1] = useState<AnimeData | null>(null);
    const [anime2, setAnime2] = useState<AnimeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    const refresh = () => {
        setAnime1(null);
        setAnime2(null);
        setTrigger(prev => prev + 1);
    };

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
    }, [trigger]);

    return { anime1, anime2, error, refresh };
}

function GameBoard(){
    const { anime1, anime2, error, refresh } = useRandomAnime();
    const [imageError, setImageError] = useState(false);
    const [showRatings, setShowRatings] = useState(false);

    const handleChoice = (choice: number, other: number) => {
        setUserChoice(choice);
        setOtherChoice(other);
        setShowRatings(true);

        // Using setTimeout to allow the UI to render the revealed ratings 
        // before the blocking alert window appears.
        setTimeout(() => {
            alert(getResultMessage());
            setImageError(false);
            setShowRatings(false);
            refresh();
        }, 10);
    };
        
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!anime1 || !anime2) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-board">
            <Heading className="questionHeading">Which is higher rated?</Heading>   
            <ChoiceButton onClick={() => handleChoice(anime1.rating, anime2.rating)} className="choice-button left">
                <AnimeCardR
                title={anime1.title}
                imgsrc={imageError ? PLACEHOLDER_IMAGE : anime1.image}
                alt={anime1.title}
                className="anime-card1"
                rating={showRatings ? anime1.rating : undefined}
                />
            </ChoiceButton>

            <Heading className="vsHeading">VS</Heading>

            <ChoiceButton onClick={() => handleChoice(anime2.rating, anime1.rating)} className="choice-button right">
            <AnimeCardR
                title={anime2.title}
                imgsrc={imageError ? PLACEHOLDER_IMAGE : anime2.image}
                alt={anime2.title}
                className="anime-card2"
                rating={showRatings ? anime2.rating : undefined}
            />
            </ChoiceButton>
        </div>
    );
}

export default GameBoard;