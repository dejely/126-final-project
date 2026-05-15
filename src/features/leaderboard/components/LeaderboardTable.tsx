import React from 'react';

interface TProps {
    children: React.ReactNode;
    className?: string;
}

const LeaderboardTable: React.FC<TProps> = ({children, className }) => {
  return (
    <table className={className}>
        {children}
    </table>
  );
}

export default LeaderboardTable;