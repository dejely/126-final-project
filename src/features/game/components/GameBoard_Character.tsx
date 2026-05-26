import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTwoUniqueCharacters } from "../../character/hooks/getRandomCharacter.ts";
import type { CharacterData } from "../../character/types.ts";
import CharacterCard from "../../character/components/CharacterCard.tsx";
import ChoiceButton from "./ChoiceButton.tsx";
import { getNextScore, isCorrectChoice } from "../hooks/useGame.ts";
import GameResult from "./GameResult.tsx";
import Heading from "../../../components/layout/Heading.tsx";
import LoadingState from "../../../components/ui/LoadingState.tsx";
import ErrorState from "../../../components/ui/ErrorState.tsx";

type ChoiceSide = "left" | "right";

function useRandomCharacter() {
    const [character1, setCharacter1] = useState<CharacterData | null>(null);
    const [character2, setCharacter2] = useState<CharacterData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [trigger, setTrigger] = useState(0);

    const refresh = () => {
        setCharacter1(null);
        setCharacter2(null);
        setError(null);
        setTrigger(prev => prev + 1);
    };

    useEffect(() => {
        let cancelled = false;
        const fetchRandomCharacter = async () => {
            try {
                const characterPair = await getTwoUniqueCharacters();
                if (cancelled) return;
                if (!characterPair) {
                    setError("No character data received");
                    return;
                }
                setCharacter1(characterPair[0]);
                setCharacter2(characterPair[1]);
            } catch (err) {
                if (cancelled) return;
                setError(err instanceof Error ? err.message : "Unknown error");
            }
        };
        fetchRandomCharacter();
        return () => { cancelled = true; };
    }, [trigger]);

    return { character1, character2, error, refresh };
}
        
interface GameBoardProps {
    score: number;
    onScoreUpdate: (score: number) => void;
}

function GameBoard({ score, onScoreUpdate }: GameBoardProps){
    const { character1, character2, error, refresh } = useRandomCharacter();
    const [showFavorites, setShowFavorites] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const navigate = useNavigate();
    const [selectedSide, setSelectedSide] = useState<ChoiceSide | null>(null);

    const handleChoice = (choice: number, other: number, side: ChoiceSide) => {
        // Prevent multiple clicks while showing results
        if (showResult) return;

        const correct = isCorrectChoice(choice, other);
        const nextScore = getNextScore(score, choice, other);
        onScoreUpdate(nextScore);
        setIsCorrect(correct);
        setSelectedSide(side);
        setShowResult(true);
        setShowFavorites(true);

        // Show the result component for 2 seconds before moving to the next round
        setTimeout(() => {
            if (correct) {
                setShowResult(false);
                setShowFavorites(false);
                refresh();
            } else {
                // Redirect to the GameOver page on failure
                navigate("/GameOver", { state: { score: nextScore } });
            }
        }, 2000);
    };
        
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

    if (!character1 || !character2) {
        return (
            <div className="game-board game-board--status">
                <LoadingState
                    size="large"
                    message="Loading characters"
                    helperText="Preparing a fresh favorite matchup."
                />
            </div>
        );
    }

    return (
        <div className="game-board">
            <div className="game-board__header">
                <Heading className="questionHeading">Which has more favorites?</Heading>
                <p className="game-board__subheading">Pick the character with the more favorite count.</p>
            </div>

            <div className="game-board__arena">
            <ChoiceButton
                onClick={() => handleChoice(character1.favorites, character2.favorites, "left")}
                disabled={showResult}
                ariaLabel={`Choose ${character1.name}`}
                className={`choice-button left ${selectedSide === "left" ? "choice-button--selected" : ""} ${showResult && selectedSide !== "left" ? "choice-button--dimmed" : ""}`}
            >
                <CharacterCard
                name={character1.name}
                imgsrc={character1.image}
                alt={character1.name}
                className="character-card1"
                statsValue={showFavorites ? character1.favorites : undefined}
                />
            </ChoiceButton>

            <div className="game-board__middle">
                {showResult && <GameResult correct={isCorrect} />}
                <Heading className="vsHeading">VS</Heading>
            </div>

            <ChoiceButton
                onClick={() => handleChoice(character2.favorites, character1.favorites, "right")}
                disabled={showResult}
                ariaLabel={`Choose ${character2.name}`}
                className={`choice-button right ${selectedSide === "right" ? "choice-button--selected" : ""} ${showResult && selectedSide !== "right" ? "choice-button--dimmed" : ""}`}
            >
            <CharacterCard
                name={character2.name}
                imgsrc={character2.image}
                alt={character2.name}
                className="character-card2"
                statsValue={showFavorites ? character2.favorites : undefined}
            />
            </ChoiceButton>
            </div>
        </div>
    );
}

export default GameBoard;
