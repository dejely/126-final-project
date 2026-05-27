import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Heading from '../components/layout/Heading';
import Button from '../components/ui/Button';
import Image from '../components/layout/Image';
import { useNavigate } from 'react-router-dom';

function Help() {
  const navigate = useNavigate();

  return (
    <div className="helpPage">
         <Image src='/home_background.png' alt="Home_Background" className="background" />
      <Header />
      <main className="rules-content">
        <Heading className="rules-heading">Game Rules</Heading>
        <section className="rules-section">
          <h2>How to Play</h2>
          <p>
            Welcome to Aniguess! Your goal is to guess which of two presented anime series or characters has a higher value based on the chosen game mode.
          </p>
          <p>
            Each correct guess increases your score and builds your streak. An incorrect guess will end your current game.
          </p>
        </section>

        <section className="rules-section">
          <h2>Game Modes</h2>
          <h3>Series Rating</h3>
          <p>Choose the anime series with the higher MyAnimeList (MAL) rating.</p>
          <h3>Series Faves</h3>
          <p>Choose the anime series with a greater number of favorites on MyAnimeList.</p>
          <h3>Character Faves</h3>
          <p>Choose the character with a greater number of favorites on MyAnimeList.</p>
        </section>

        <section className="rules-section">
          <h2>Scoring</h2>
          <p>Each correct answer adds to your score. Your streak tracks consecutive correct answers.</p>
        </section>
        <Button className="backButton" onClick={() => navigate('/')}>Back to Home</Button>
      </main>
      <Footer />
    </div>
  );
}

export default Help;
