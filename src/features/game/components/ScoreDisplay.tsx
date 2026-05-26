import React from "react";

interface ScoreDisplayProps {
    score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
    return (
      <div>
        <h2>Score: { score }</h2>
      </div>
    );
}

export default ScoreDisplay;