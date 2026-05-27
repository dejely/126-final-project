import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import Heading from '../components/layout/Heading';
import Image from '../components/layout/Image';
import Score from '../components/ui/Score';
import Streak from '../components/ui/Streak';
import AchievementCard from '../features/achievements/components/AchievementCard';
import type { Achievement } from '../features/achievements/types';

const currentScore = 20;
const currentStreak = 3;

const achievements: Achievement[] = [
    {
        id: 'score-10',
        title: 'Score 10',
        description: 'Reach a score of 10 in any game mode.',
        icon: '10',
        progress: currentScore,
        target: 10,
    },
    {
        id: 'score-20',
        title: 'Score 20',
        description: 'Reach a score of 20 in any game mode.',
        icon: '20',
        progress: currentScore,
        target: 20,
    },
    {
        id: 'score-30',
        title: 'Score 30',
        description: 'Reach a score of 30 in any game mode.',
        icon: '30',
        progress: currentScore,
        target: 30,
    },
    {
        id: 'streak-3',
        title: 'Streak',
        description: 'Answer 3 questions correctly in a row.',
        icon: '3X',
        progress: currentStreak,
        target: 3,
    },
];

function Achievements(){
    return(
        <div className = "achievementsPage">
            <Header/>
            <main className="achievementsPage__content">
                <Image src='/aniguess_logo.png' alt="Aniguess_Logo" className="achievementsPage__logo" />

                <section className="achievementsPage__summary" aria-label="Achievement progress summary">
                    <Score value={currentScore} label="Current Score" helperText="Sample progress" />
                    <Streak count={currentStreak} label="Current Streak" best={currentStreak} />
                </section>

                <section className="achievementsPage__list" aria-labelledby="achievements-heading">
                    <Heading className="achievementsPage__heading">
                        Achievements
                    </Heading>

                    <div className="achievementsPage__grid">
                        {achievements.map((achievement) => (
                            <AchievementCard key={achievement.id} achievement={achievement} />
                        ))}
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default Achievements;
