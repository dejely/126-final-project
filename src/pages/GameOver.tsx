import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

function GameOver({ score }: { score: number }) {
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