import type { CSSProperties, ReactNode } from 'react';

interface ScoreProps {
  value: number | string;
  label?: ReactNode;
  max?: number | string;
  prefix?: string;
  suffix?: string;
  helperText?: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
  helperClassName?: string;
  style?: CSSProperties;
  ariaLabel?: string;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

const Score = ({
  value,
  label = 'Score',
  max,
  prefix = '',
  suffix = '',
  helperText,
  className,
  labelClassName,
  valueClassName,
  helperClassName,
  style,
  ariaLabel,
}: ScoreProps) => {
  const hasMax = max !== undefined && max !== null && max !== '';
  const displayedValue = `${prefix}${value}${suffix}`;
  const displayedMax = hasMax ? ` / ${prefix}${max}${suffix}` : '';

  return (
    <div
      className={joinClassNames('score', className)}
      style={style}
      aria-label={ariaLabel}
    >
      {label && (
        <span className={joinClassNames('score__label', labelClassName)}>
          {label}
        </span>
      )}
      <span className={joinClassNames('score__value', valueClassName)}>
        {displayedValue}
        {displayedMax}
      </span>
      {helperText && (
        <span className={joinClassNames('score__helper', helperClassName)}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Score;
