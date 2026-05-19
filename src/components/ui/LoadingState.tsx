import type { CSSProperties, ReactNode } from 'react';

interface LoadingStateProps {
  message?: ReactNode;
  helperText?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  spinnerClassName?: string;
  messageClassName?: string;
  helperClassName?: string;
  style?: CSSProperties;
}

function joinClassNames(...classNames: Array<string | undefined | false>) {
  return classNames.filter(Boolean).join(' ');
}

const LoadingState = ({
  message = 'Loading',
  helperText,
  size = 'medium',
  className,
  spinnerClassName,
  messageClassName,
  helperClassName,
  style,
}: LoadingStateProps) => {
  return (
    <div
      className={joinClassNames('loading-state', `loading-state--${size}`, className)}
      style={style}
      role="status"
      aria-live="polite"
    >
      <span
        className={joinClassNames('loading-state__spinner', spinnerClassName)}
        aria-hidden="true"
      />
      {message && (
        <span className={joinClassNames('loading-state__message', messageClassName)}>
          {message}
        </span>
      )}
      {helperText && (
        <span className={joinClassNames('loading-state__helper', helperClassName)}>
          {helperText}
        </span>
      )}
    </div>
  );
};

export default LoadingState;
