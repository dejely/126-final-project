import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import AnimeCard from '../features/anime/components/AnimeCard';


function SeriesGame(){
    return(
        <div className = "SeriesGame">
            <Header/>
            <AnimeCard/>
            <Footer/>
        </div>
    );
}

export default SeriesGame;