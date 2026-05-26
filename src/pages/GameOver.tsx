import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { getScore, resetScore } from "../features/game/hooks/useGame";

function GameOver() {
    const score = getScore();
    resetScore();

    return (
        <div className="game-over">
            <Header />
            <h1>Game Over</h1>
            <p>Your final score is: {score}</p>
            <Footer />
        </div>
    );
}

export default GameOver;