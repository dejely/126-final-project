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
      <div className="animeCard__surface">
        <img
          className="animeCard__poster"
          src={imageError ? PLACEHOLDER_IMAGE : imgsrc}
          alt={alt}
          onError={() => setImageError(true)}
        />
        <div className="animeCard__content">
          <h2 className="animeCard__title">{title}</h2>
          <p className="animeCard__rating" aria-label={`Rating ${displayRating}`}>
            {displayRating}
          </p>
        </div>
      </div>
    </article>
  );
};

export default AnimeCardR;
