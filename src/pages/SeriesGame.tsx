import { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import GameBoard from '../features/game/components/GameBoard';
import ScoreDisplay from '../features/game/components/ScoreDisplay';

function SeriesGame(){
    const [score, setScore] = useState(0);

    return(
        <div className = "SeriesGame">
            <Header/>
            <ScoreDisplay score={score} />
            <GameBoard score={score} onScoreUpdate={setScore}/>
            <Footer/>
        </div>
    );
}

export default SeriesGame;
