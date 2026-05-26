import { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import GameBoard from '../features/game/components/GameBoard';
import ScoreDisplay from '../features/game/components/ScoreDisplay';
import { getScore } from '../features/game/hooks/useGame';

function SeriesGame(){
    const [score, setScore] = useState(getScore());
    const handleScoreUpdate = () => setScore(getScore());

    return(
        <div className = "SeriesGame">
            <Header/>
            <ScoreDisplay score={score} />
            <GameBoard onScoreUpdate={handleScoreUpdate}/>
            <Footer/>
        </div>
    );
}

export default SeriesGame;
