import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { Link } from 'react-router-dom';

function CharacterGame(){
    return(
        <div className = "CharacterGame">
            <Header/>
            <main className="placeholder-page">
                <p className="placeholder-page__eyebrow">Coming Soon</p>
                <h1>Character Faves</h1>
                <p>Character matchups are being prepared. Try Series Rating for the current playable mode.</p>
                <Link to="/SeriesGame" className="button">Play Series Rating</Link>
            </main>
            <Footer/>
        </div>
    );
}

export default CharacterGame;
