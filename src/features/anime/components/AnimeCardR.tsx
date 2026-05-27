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
            <div className="animeCard__surface">
                <img 
                    src={imgsrc} 
                    alt={alt}
                    className="animeCard__poster"
                />
                <div className="animeCard__content">
                    <h2 className="animeCard__title">{title}</h2>
                    <p className="animeCard__rating">{rating !== undefined && rating > 0 ? rating : '?'}</p>
                </div>
            </div>
    </article>
  );
};

export default AnimeCardR;
