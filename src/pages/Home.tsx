import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Image from '../components/layout/Image';

function Home() {
  return (
    <div className="homePage">
      <Header />

      <Image src='../public/aniguess_logo.png' alt="Aniguess_Logo" className="logo" />

      <Button className='button' disabled={false}>
        Generic Button Object
      </Button>

      <Footer />
    </div>
  );
}  

export default Home;