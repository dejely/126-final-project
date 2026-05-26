import React from "react";

//reusable image component with basic styling and functionality
interface AnimeCardRProps {
  title: string;
  imgsrc: string;
  alt: string;
  className?: string;
  rating?: number;
}

const AnimeCardR: React.FC<AnimeCardRProps> = ({ title, imgsrc, alt, className, rating }) => {
  return (
    <article className={className ? `animeCard ${className}` : "animeCard"}>
            <div>
                <img 
                    src={imgsrc} 
                    alt={alt}
                    style={{ width: '200px', height: '300px' }} 
                />
                <h2>{title}</h2>
                <p>{rating !== undefined && rating > 0 ? rating : '?'}</p>
            </div>
    </article>
  );
};

export default AnimeCardR;
