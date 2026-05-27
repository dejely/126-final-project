import React from 'react';

interface TProps {
    children: React.ReactNode;
    className?: string;
}

const LeaderboardTable: React.FC<TProps> = ({children, className }) => {
  return (
    <table className={className}>
        <thead>
            <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Streak</th>
            </tr>
        </thead>
        <tbody>
        {children}
        </tbody>
    </table>
  );
}

export default LeaderboardTable;
