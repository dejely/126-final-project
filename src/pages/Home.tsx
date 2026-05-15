import { Button } from '@/components/ui/button';

function Home() {
  return (
    <main className="homePage">
      <section className="homePreview" aria-labelledby="home-title">
        <p className="homePreview__eyebrow">Anime trivia arena</p>
        <h1 id="home-title">Guess the anime.</h1>
        <p className="homePreview__copy">Pick a mode, climb the ranks, and prove your instincts.</p>
        <div className="homePreview__actions">
          <Button className="button button--primary" size="lg">
            Play Now
          </Button>
          <Button className="button button--secondary" variant="outline" size="lg">
            View Modes
          </Button>
        </div>
      </section>
    </main>
  );
}  

export default Home;
