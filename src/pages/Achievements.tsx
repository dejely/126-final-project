import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import AchievementBadge from '../components/ui/AchievementBadge';
import LoadingState from '../components/ui/LoadingState';
import ErrorState from '../components/ui/ErrorState';
import Heading from '../components/layout/Heading';
import { useAchievements } from '../features/achievements/api/hooks/useAchievements';

function Achievements(){
    const { data, loading, error, refetch } = useAchievements();

    return(
        <div className = "Achievements">
            <Header/>
            <main className="achievements-content">
                <Heading className="achievements-heading">Achievements</Heading>

                {loading && (
                    <LoadingState
                        message="Loading achievements"
                        helperText="Checking saved guest progress."
                    />
                )}

                {error && (
                    <ErrorState
                        title="Could not load achievements"
                        message={error}
                        actionLabel="Try again"
                        onAction={refetch}
                    />
                )}

                {!loading && !error && data.length === 0 && (
                    <p className="achievements-empty">No achievements available.</p>
                )}

                {!loading && !error && data.length > 0 && (
                    <div className="achievements-grid">
                        {data.map((achievement) => (
                            <AchievementBadge
                                key={achievement.id}
                                title={achievement.name}
                                description={achievement.description}
                                unlocked={achievement.unlocked}
                                icon={achievement.unlocked ? '✓' : '?'}
                                ariaLabel={`${achievement.name}: ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                            />
                        ))}
                    </div>
                )}
            </main>
            <Footer/>
        </div>
    );
}

export default Achievements;
