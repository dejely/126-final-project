import type { CSSProperties, ReactNode } from 'react';

interface StreakProps {
  count: number | string;
  label?: ReactNode;
  unit?: ReactNode;
  best?: number | string;
  bestLabel?: ReactNode;
  helperText?: ReactNode;
  className?: string;
  labelClassName?: string;
  countClassName?: string;
  bestClassName?: string;
  helperClassName?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

const Streak = ({
  count,
  label = 'Streak',
  unit = 'in a row',
  best,
  bestLabel = 'Best',
  helperText,
  className,
  labelClassName,
  countClassName,
  bestClassName,
  helperClassName,
  style,
  ariaLabel,
}: StreakProps) => {
  const hasBest = best !== undefined && best !== null && best !== '';

  return (
    <div
      className={joinClassNames('streak', className)}
      style={style}
      aria-label={ariaLabel}
    >
      {label && (
        <span className={joinClassNames('streak__label', labelClassName)}>
          {label}
        </span>
      )}
      <div className="streak__main">
        <span className={joinClassNames('streak__count', countClassName)}>
          {count}
        </span>
        {unit && <span className="streak__unit">{unit}</span>}
      </div>
      {hasBest && (
        <span className={joinClassNames('streak__best', bestClassName)}>
          {bestLabel}: {best}
        </span>
      )}
      {helperText && (
        <span className={joinClassNames('streak__helper', helperClassName)}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Streak;
