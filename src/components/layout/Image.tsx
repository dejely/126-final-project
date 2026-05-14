import React from 'react';

//reusable image component with basic styling and functionality
interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  return (
    <img 
    src = {src}
    alt = {alt}
    className = {className}
    />
  );
}

export default Image;