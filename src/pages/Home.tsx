import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Image from '../components/layout/Image';
import Heading from '../components/layout/Heading';
import { useNavigate } from 'react-router-dom';
import Score from '../components/ui/Score';
import Streak from '../components/ui/Streak';
import { useUserStats } from '../features/user/hooks/useUserStats';

function Home() {
  const { data: stats, loading: statsLoading, error: statsError } = useUserStats();
  const navigate = useNavigate();
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

      <Button className='helpButton' onClick={() => navigate('/Help')}>
        <Image src='/help_button.png' alt="Help_Button" />
      </Button>

      <Button className='settingsButton' onClick={() => navigate('/Settings')}>
        <Image src='/settings_button.png' alt="Settings_Button" className='settingsIcon'/>
      </Button>
      
      {/* Leaderboard button redirects to the leaderboard page */}
      <Button 
        className='leaderboardButton' 
        onClick={() => navigate('/Leaderboard')}
      >
        <Image src='/leaderboard_button.png' alt="Leaderboard_Button" />
      </Button>

      <Heading className='gamemodeHeading'>
        Gamemodes
      </Heading>

      <div className="gamemode-list">
        <Button className='button' onClick={() => navigate('/SeriesGame')}>
          Series Rating
        </Button>

        <Button className='button' onClick={() => navigate('/PopularityGame')}>
          Series Faves
        </Button>
        
        <Button className='button' onClick={() => navigate('/CharacterGame')}>
          Character Faves
        </Button>
      </div>

      <Footer />
    </div>
  );
}  

export default Home;
