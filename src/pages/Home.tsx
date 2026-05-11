import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';

function Home() {
  return (
    <div className="homePage">
      <Header />

      <Button className='button' disabled={false}>
        Generic Button Object
      </Button>

      <Footer />
    </div>
  );
}  

export default Home;