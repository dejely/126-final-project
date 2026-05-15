import React from 'react';

interface TIProps {
    name?: string;
    score?: number;
    className?: string;
}

const LeaderboardItem: React.FC<TIProps> = ({name, score, className }) => {
  return (
    <tr className={className}>
        <div>
            <h4 id='LBText'>{name} : {score}</h4>
        </div>
    </tr>
  );
}

export default LeaderboardItem;