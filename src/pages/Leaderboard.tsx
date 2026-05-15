import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Image from '../components/layout/Image';
import Heading from '../components/layout/Heading';
import LeaderboardItem from '../features/leaderboard/components/LeaderboardItem';
import LeaderboardTable from '../features/leaderboard/components/LeaderboardTable';

function Leaderboard(){
    return(
        <div className = "leaderboardPage">
            <Header/>

            <Image src='/aniguess_logo.png' alt="Aniguess_Logo" className="lb_logo" />
            <Heading className='thisWeekLBHeading'>This Week</Heading>
            <Heading className='allTimeLBHeading'>All Time</Heading>

            <LeaderboardTable className='allTimeLB'>
                <LeaderboardItem name='Juan Dela Cruz' score={99} className='LBItem' />
            </LeaderboardTable>
            <Footer/>
        </div>
    );
}

export default Leaderboard;