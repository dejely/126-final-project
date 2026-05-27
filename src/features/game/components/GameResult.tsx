interface GameResultProps {
    correct: boolean;

}

function GameResult({ correct }: GameResultProps) {
  return (
    <div className={correct ? "game-result game-result--correct" : "game-result game-result--incorrect"}>
        <p>{correct ? "Correct!" : "Incorrect!"}</p>
    </div>
  );
}

export default GameResult;
