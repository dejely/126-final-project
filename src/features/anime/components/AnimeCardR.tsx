//reusable image component with basic styling and functionality
interface AnimeCardRProps {
  title: string;
  imgsrc: string;
  alt: string;
  className?: string;
  statsValue?: number;
}

const AnimeCardR: React.FC<AnimeCardRProps> = ({ title, imgsrc, alt, className, statsValue }) => {

  return (
    <article className={className ? `animeCard ${className}` : "animeCard"}>
            <div>
                <img 
                    src={imgsrc} 
                    alt={alt}
                    style={{ width: '200px', height: '300px' }} 
                />
                <h2>{title}</h2>
                <p>{statsValue !== undefined && statsValue > 0 ? statsValue.toLocaleString() : '?'}</p>
            </div>
    </article>
  );
};

export default AnimeCardR;
