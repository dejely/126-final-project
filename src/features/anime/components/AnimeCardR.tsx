import React from "react";

//reusable image component with basic styling and functionality
interface AnimeCardRProps {
  title: string;
  imgsrc: string;
  alt: string;
  className?: string;
}

const AnimeCardR: React.FC<AnimeCardRProps> = ({ title, imgsrc, alt, className }) => {
  return (
    <article className="animeCard">
            <div>
                <img 
                    src={imgsrc} 
                    alt={alt}
                    style={{ width: '200px', height: '300px' }} 
                />
                <h2>{title}</h2>
                <p>?</p>
            </div>
    </article>
  );
};

export default AnimeCardR;
