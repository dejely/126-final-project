import type { CSSProperties, ReactNode } from 'react';

interface AchievementBadgeProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  unlocked?: boolean;
  progress?: number;
  maxProgress?: number;
  progressLabel?: ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  progressClassName?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(' ');
}

const AchievementBadge = ({
  title,
  description,
  icon,
  unlocked = false,
  progress,
  maxProgress,
  progressLabel,
  className,
  iconClassName,
  titleClassName,
  descriptionClassName,
  progressClassName,
  style,
  ariaLabel,
}: AchievementBadgeProps) => {
  const hasProgress = progress !== undefined && maxProgress !== undefined;
  const progressValue = hasProgress
    ? Math.min(Math.max(progress, 0), maxProgress)
    : 0;
  const progressPercent = hasProgress && maxProgress > 0
    ? (progressValue / maxProgress) * 100
    : 0;

  return (
    <div
      className={joinClassNames(
        'achievement-badge',
        unlocked ? 'achievement-badge--unlocked' : 'achievement-badge--locked',
        className,
      )}
      style={style}
      aria-label={ariaLabel}
      aria-disabled={!unlocked}
    >
      <div className={joinClassNames('achievement-badge__icon', iconClassName)}>
        {icon ?? '?'}
      </div>
      <div className="achievement-badge__content">
        <span className={joinClassNames('achievement-badge__title', titleClassName)}>
          {title}
        </span>
        {description && (
          <span
            className={joinClassNames(
              'achievement-badge__description',
              descriptionClassName,
            )}
          >
            {description}
          </span>
        )}
        {hasProgress && (
          <div className={joinClassNames('achievement-badge__progress', progressClassName)}>
            <div className="achievement-badge__progress-track">
              <span
                className="achievement-badge__progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="achievement-badge__progress-text">
              {progressLabel ?? `${progressValue} / ${maxProgress}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementBadge;
