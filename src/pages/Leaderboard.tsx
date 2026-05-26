import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Image from '../components/layout/Image';
import Heading from '../components/layout/Heading';
import LeaderboardItem from '../features/leaderboard/components/LeaderboardItem';
import LeaderboardTable from '../features/leaderboard/components/LeaderboardTable';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import { useLeaderboard } from '../features/leaderboard/hooks/useLeaderboard';

function Leaderboard(){
    const { data, loading, error, refetch } = useLeaderboard();

    return(
        <div className = "leaderboardPage">
            <Header/>

            <Image src='/aniguess_logo.png' alt="Aniguess_Logo" className="lb_logo" />
            <Heading className='allTimeLBHeading'>Leaderboard</Heading>

            {loading && (
                <LoadingState
                    className="leaderboard-state"
                    message="Loading leaderboard"
                    helperText="Fetching saved guest scores."
                />
            )}

            {error && (
                <ErrorState
                    className="leaderboard-state"
                    title="Could not load leaderboard"
                    message={error}
                    actionLabel="Try again"
                    onAction={refetch}
                />
            )}

            {!loading && !error && data.length === 0 && (
                <p className="leaderboard-empty">No saved scores yet.</p>
            )}

            {!loading && !error && data.length > 0 && (
                <LeaderboardTable className='allTimeLB'>
                    {data.map((entry) => (
                        <LeaderboardItem
                            key={entry.id}
                            rank={entry.rank}
                            name={entry.username}
                            score={entry.score}
                            streak={entry.streak}
                            className='LBItem'
                        />
                    ))}
                </LeaderboardTable>
            )}
            <Footer/>
        </div>
    );
}

export default Leaderboard;
