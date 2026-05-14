import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Image from '../components/layout/Image';
import Heading from '../components/layout/Heading';

function Home() {
  return (
    <div className="homePage">
      
      <Image src='/home_background.png' alt="Home_Background" className="background" />
      <Header />

      <Image src='/aniguess_logo.png' alt="Aniguess_Logo" className="logo" />
      <Image src='/help_button.png' alt="Help_Button" className="helpButton" />
      <Image src='/settings_button.png' alt="Settings_Button" className="settingsButton" />
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