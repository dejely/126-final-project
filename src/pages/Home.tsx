import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Image from '../components/layout/Image';
import Heading from '../components/layout/Heading';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="homePage">
      
      <Image src='/home_background.png' alt="Home_Background" className="background" />
      <Header />

      <Image src='/aniguess_logo.png' alt="Aniguess_Logo" className="logo" />

      {/* Help and Settings buttons are currently non-functional */}
      <Button className='helpButton' disabled={false}>
        <Image src='/help_button.png' alt="Help_Button" />
      </Button>

      <Button className='settingsButton' disabled={false}>
        <Image src='/settings_button.png' alt="Settings_Button" className='settingsIcon'/>
      </Button>
      
      {/* Leaderboard button redirects to the leaderboard page */}
      <Button className='leaderboardButton' disabled={false}>
        <Link to="/leaderboard">
          <Image src='/leaderboard_button.png' alt="Leaderboard_Button" />
        </Link>
      </Button>


      <Heading className='gamemodeHeading'>
        Gamemodes
      </Heading>

      <Button className='button' disabled={false}>
          Series Rating
      </Button>

      <Button className='button' disabled={false}>
        Series Faves
      </Button>
      
      <Button className='button' disabled={false}>
        Character Faves
      </Button>

      <Footer />
    </div>
  );
}  

export default Home;