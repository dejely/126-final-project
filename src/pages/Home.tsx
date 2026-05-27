import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Image from '../components/layout/Image';
import Heading from '../components/layout/Heading';
import { Link } from 'react-router-dom';
import Score from '../components/ui/Score';
import Streak from '../components/ui/Streak';
import { useUserStats } from '../features/user/hooks/useUserStats';

type HomeActionIconType = 'help' | 'settings' | 'leaderboard';

interface HomeActionIconProps {
  type: HomeActionIconType;
}

function HomeActionIcon({ type }: HomeActionIconProps) {
  if (type === 'help') {
    return (
      <svg className="home-action-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
        <path d="M9.8 9.2a2.3 2.3 0 0 1 4.4.9c0 1.7-2.2 1.9-2.2 3.6" />
        <path d="M12 17h.01" />
      </svg>
    );
  }

  if (type === 'settings') {
    return (
      <svg className="home-action-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z" />
        <path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.2 2.2-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.7v.2h-5v-.2a1.8 1.8 0 0 0-1.1-1.7 1.8 1.8 0 0 0-2 .4l-.1.1-2.2-2.2.1-.1a1.8 1.8 0 0 0 .4-2 1.8 1.8 0 0 0-1.7-1.1h-.2v-3.8h.2A1.8 1.8 0 0 0 4.6 9a1.8 1.8 0 0 0-.4-2l-.1-.1 2.2-2.2.1.1a1.8 1.8 0 0 0 2 .4 1.8 1.8 0 0 0 1.1-1.7v-.2h5v.2a1.8 1.8 0 0 0 1.1 1.7 1.8 1.8 0 0 0 2-.4l.1-.1 2.2 2.2-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.7 1.1h.2v3.8h-.2a1.8 1.8 0 0 0-1.7 1.1Z" />
      </svg>
    );
  }

  return (
    <svg className="home-action-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 20V10" />
      <path d="M12 20V4" />
      <path d="M17 20v-7" />
      <path d="M4 20h16" />
    </svg>
  );
}

function Home() {
  const { data: stats, loading: statsLoading, error: statsError } = useUserStats();
  const bestScore = statsLoading ? '...' : stats?.bestScore ?? 0;
  const bestStreak = statsLoading ? '...' : stats?.bestStreak ?? 0;

  return (
    <div className="homePage">
      
      <Image src='/home_background.png' alt="Home_Background" className="background" />
      <Header />

      <Image src='/aniguess_logo.png' alt="Aniguess_Logo" className="logo" />

      <div className="home-stats">
        <Score value={bestScore} label="Best Score" />
        <Streak count={bestStreak} label="Best Streak" />
      </div>
      {statsError && <p className="home-stats-error">{statsError}</p>}

      {/* Help and Settings buttons are currently non-functional */}
      <Button className='helpButton' disabled={false}>
        <HomeActionIcon type="help" />
        <span className="sr-only">Help</span>
      </Button>

      <Button className='settingsButton' disabled={false}>
        <HomeActionIcon type="settings" />
        <span className="sr-only">Settings</span>
      </Button>
      
      {/* Leaderboard button redirects to the leaderboard page */}
      <Link to="/leaderboard" className="leaderboardButton" aria-label="Open leaderboard">
        <HomeActionIcon type="leaderboard" />
      </Link>


      <Heading className='gamemodeHeading'>
        Gamemodes
      </Heading>

      <div className="home-actions" aria-label="Game modes">
        <Link to="/SeriesGame" className="button">
            Series Rating
        </Link>

        <Button className='button' disabled={false}>
          Series Faves
        </Button>
        
        <Link to="/CharacterGame" className="button">
          Character Faves
        </Link>
      </div>

      <Footer />
    </div>
  );
}  

export default Home;
