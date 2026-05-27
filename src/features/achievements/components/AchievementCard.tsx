import AchievementBadge from '../../../components/ui/AchievementBadge';
import type { Achievement } from '../types';

interface AchievementCardProps {
  achievement: Achievement;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const unlocked = achievement.progress >= achievement.target;
  const progressValue = Math.min(achievement.progress, achievement.target);

  return (
    <AchievementBadge
      title={achievement.title}
      description={achievement.description}
      icon={unlocked ? achievement.icon : 'LOCK'}
      unlocked={unlocked}
      progress={progressValue}
      maxProgress={achievement.target}
      progressLabel={`${progressValue} / ${achievement.target}`}
      className="achievement-card"
      ariaLabel={`${achievement.title}: ${unlocked ? 'unlocked' : 'locked'}`}
    />
  );
};

export default AchievementCard;
