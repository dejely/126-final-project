import React from "react";

//reusable image component with basic styling and functionality
interface CharacterCardProps {
  name: string;
  imgsrc: string;
  alt: string;
  className?: string;
  statsValue?: number;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ name, imgsrc, alt, className, statsValue }) => {

  return (
    <article className={className ? `animeCard ${className}` : "animeCard"}>
            <div>
                <img 
                    src={imgsrc} 
                    alt={alt}
                    style={{ width: '200px', height: '300px' }} 
                />
                <h2>{name}</h2>
                <p>{statsValue !== undefined && statsValue > 0 ? statsValue.toLocaleString() : '?'}</p>
            </div>
    </article>
  );
};

export default CharacterCard;
