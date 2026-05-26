import { useEffect, useState, useRef } from "react"; // Consolidated import
import { useNavigate } from "react-router-dom";
import {getTwoUniqueAnime } from "../../anime/hooks/getRandomAnime.ts";
import type { AnimeData } from "../../anime/types.ts";
import AnimeCardR from "../../anime/components/AnimeCardR.tsx";
import ChoiceButton from "./ChoiceButton.tsx";
import { getNextScore, isCorrectChoice } from "../hooks/useGame.ts";
import GameResult from "./GameResult.tsx";
import Heading from "../../../components/layout/Heading.tsx";
import LoadingState from "../../../components/ui/LoadingState.tsx";
import ErrorState from "../../../components/ui/ErrorState.tsx";

type ChoiceSide = "left" | "right";

function useRandomAnime() {
    const [anime1, setAnime1] = useState<AnimeData | null>(null);
    const [anime2, setAnime2] = useState<AnimeData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    const refresh = () => {
        setAnime1(null);
        setAnime2(null);
        setError(null);
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

interface GameBoardProps {
    score: number;
    onScoreUpdate: (score: number) => void;
}

function GameBoard({ score, onScoreUpdate }: GameBoardProps){
    const { anime1, anime2, error, refresh } = useRandomAnime();
    const [showRatings, setShowRatings] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const navigate = useNavigate();
    const [selectedSide, setSelectedSide] = useState<ChoiceSide | null>(null);
    // Ref to store the timeout ID
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Effect to clear the timeout on component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleChoice = (choice: number, other: number, side: ChoiceSide) => {
        // Prevent multiple clicks while showing results
        if (showResult) return;

        const correct = isCorrectChoice(choice, other);
        const nextScore = getNextScore(score, choice, other);
        onScoreUpdate(nextScore);
        setIsCorrect(correct);
        setSelectedSide(side);
        setShowResult(true);
        setShowRatings(true);

        // Show the result component for 2 seconds before moving to the next round
        // Store the timeout ID in the ref to allow cleanup on unmount
        timeoutRef.current = setTimeout(() => {
            if (correct) {
                setShowResult(false);
                setShowRatings(false);
                refresh();
            } else {
                // Redirect to the GameOver page on failure
                navigate("/GameOver", { state: { score: nextScore } });
            }
            timeoutRef.current = null; // Clear the ref after execution
        }, 2000);
    }; // Closing brace for handleChoice
        
    if (error) {
        return (
            <div className="game-board game-board--status">
                <ErrorState
                    className="game-board__error"
                    title="Could not load anime"
                    message={error}
                    actionLabel="Try again"
                    onAction={refresh}
                />
            </div>
        );
    }

    if (!anime1 || !anime2) {
        return (
            <div className="game-board game-board--status">
                <LoadingState
                    size="large"
                    message="Loading anime"
                    helperText="Preparing a fresh rating matchup."
                />
            </div>
        );
    }

    return (
        <div className="game-board">
            <div className="game-board__header">
                <Heading className="questionHeading">Which is higher rated?</Heading>
                <p className="game-board__subheading">Pick the series with the stronger MAL score.</p>
            </div>

            <div className="game-board__arena">
            <ChoiceButton
                onClick={() => handleChoice(anime1.rating, anime2.rating, "left")}
                disabled={showResult}
                ariaLabel={`Choose ${anime1.title}`}
                className={`choice-button left ${selectedSide === "left" ? "choice-button--selected" : ""} ${showResult && selectedSide !== "left" ? "choice-button--dimmed" : ""}`}
            >
                <AnimeCardR
                title={anime1.title}
                imgsrc={anime1.image}
                alt={anime1.title}
                className="anime-card1"
                statsValue={showRatings ? anime1.rating : undefined}
                />
            </ChoiceButton>

            <div className="game-board__middle">
                {showResult && <GameResult correct={isCorrect} />}
                <Heading className="vsHeading">VS</Heading>
            </div>

            <ChoiceButton
                onClick={() => handleChoice(anime2.rating, anime1.rating, "right")}
                disabled={showResult}
                ariaLabel={`Choose ${anime2.title}`}
                className={`choice-button right ${selectedSide === "right" ? "choice-button--selected" : ""} ${showResult && selectedSide !== "right" ? "choice-button--dimmed" : ""}`}
            >
            <AnimeCardR
                title={anime2.title}
                imgsrc={anime2.image}
                alt={anime2.title}
                className="anime-card2"
                statsValue={showRatings ? anime2.rating : undefined}
            />
            </ChoiceButton>
            </div>
        </div>
    );
}

export default GameBoard;
