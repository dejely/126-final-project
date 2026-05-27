import { useEffect, useRef, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Link, useLocation } from "react-router-dom";
import {
    DEFAULT_GAME_MODE,
    getOrCreateGuestPlayer,
    saveGameResult,
} from "../features/user/api/userStatsApi";
import { unlockAchievementsForResult } from "../features/achievements/api/achievementsApi";

function GameOver() {
    const location = useLocation();
    const hasFinalScore = typeof location.state?.score === "number";
    const hasFinalStreak = typeof location.state?.streak === "number";
    const score = hasFinalScore ? location.state.score : 0;
    const streak = hasFinalStreak ? location.state.streak : 0;
    const [saveStatus, setSaveStatus] = useState("Ready for another run.");
    const [saveError, setSaveError] = useState<string | null>(null);
    const saveStarted = useRef(false);

    useEffect(() => {
        if (!hasFinalScore || saveStarted.current) {
            return;
        }

        saveStarted.current = true;

        const saveFinalScore = async () => {
            setSaveStatus("Saving your result...");
            setSaveError(null);

            try {
                const player = await getOrCreateGuestPlayer();
                const result = {
                    playerId: player.id,
                    gameMode: DEFAULT_GAME_MODE,
                    score,
                    streak,
                };

                await saveGameResult(result);
                await unlockAchievementsForResult(result);
                setSaveStatus("Result saved.");
            } catch (err) {
                setSaveStatus("Result was not saved.");
                setSaveError(err instanceof Error ? err.message : "Could not save result");
            }
        };

        void saveFinalScore();
    }, [hasFinalScore, score, streak]);

    return (
        <div className="game-over">
            <Header />
            <main className="game-over__panel">
                <p className="game-over__eyebrow">Run Complete</p>
                <h1>Game Over</h1>
                <div className="game-over__stats">
                    <div>
                        <span>Final Score</span>
                        <strong>{score}</strong>
                    </div>
                    <div>
                        <span>Final Streak</span>
                        <strong>{streak}</strong>
                    </div>
                </div>
                <p className="game-over__status">{saveStatus}</p>
                {saveError && <p className="game-over__error">{saveError}</p>}
                <div className="game-over__actions">
                    <Link to="/SeriesGame" className="button">Play Again</Link>
                    <Link to="/Leaderboard" className="button button--secondary">Leaderboard</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default GameOver;
