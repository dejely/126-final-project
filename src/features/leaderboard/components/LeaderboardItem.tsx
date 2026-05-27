import React from 'react';

interface TIProps {
    rank: number;
    name: string;
    score: number;
    streak: number;
    className?: string;
}

const LeaderboardItem: React.FC<TIProps> = ({ rank, name, score, streak, className }) => {
  return (
    <tr className={className}>
        <td>#{rank}</td>
        <td>{name}</td>
        <td>{score}</td>
        <td>{streak}</td>
    </tr>
  );
}

export default LeaderboardItem;
