interface GameResultProps {
    correct: boolean;

}

function GameResult({ correct }: GameResultProps) {
  return (
    <div className="game-result" style={{ backgroundColor: correct ? "#77FF94" : "#B3001B" }}>
        <p>{correct ? "Correct!" : "Incorrect!"}</p>
    </div>
  );
}

export default GameResult;