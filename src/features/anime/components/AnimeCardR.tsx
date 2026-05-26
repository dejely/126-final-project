import React, { useState } from "react";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

//reusable image component with basic styling and functionality
interface AnimeCardRProps {
  title: string;
  imgsrc: string;
  alt: string;
  className?: string;
  rating?: number;
}

const AnimeCardR: React.FC<AnimeCardRProps> = ({ title, imgsrc, alt, className, rating }) => {
  const [imageError, setImageError] = useState(false);
  const displayRating = rating !== undefined && rating > 0 ? rating.toFixed(2) : "?";

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
