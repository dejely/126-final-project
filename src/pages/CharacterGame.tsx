import { useState } from 'react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import GameBoard from '../features/game/components/GameBoard_Character';
import ScoreDisplay from '../features/game/components/ScoreDisplay';

function CharacterGame(){
    const [score, setScore] = useState(0);

    return(
        <div className = "CharacterGame">
            <Header/>
            <ScoreDisplay score={score} />
            <GameBoard score={score} onScoreUpdate={setScore}/>
            <Footer/>
        </div>
    );
}

export default CharacterGame;
