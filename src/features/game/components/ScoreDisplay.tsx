import React from "react";

interface ScoreDisplayProps {
    score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
    return (
      <div className="score-display" aria-live="polite">
        <span className="score-display__label">Score</span>
        <span className="score-display__value">{ score }</span>
      </div>
    );
}

export default ScoreDisplay;
