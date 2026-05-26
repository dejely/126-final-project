import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useLocation } from "react-router-dom";

function GameOver() {
    const location = useLocation();
    const score = typeof location.state?.score === "number" ? location.state.score : 0;

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
