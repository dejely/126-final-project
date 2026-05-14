import React from 'react';

//reusable heading component with basic styling and functionality
interface HProps{
    children: React.ReactNode;
    className?: string;
}

const Heading: React.FC<HProps> = ({children, className }) => {
    return (
        <h1 className={className}>
            {children}
        </h1>
    );
}

export default Heading;