import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Heading from '../components/layout/Heading';
import GameBoard from '../features/game/components/GameBoard';


function SeriesGame(){
    return(
        <div className = "SeriesGame">
            <Header/>
            <Heading className="questionHeading">Which is higher rated?</Heading>
            <GameBoard/>
            <Footer/>
        </div>
    );
}

export default SeriesGame;