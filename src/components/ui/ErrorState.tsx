import type { CSSProperties, ReactNode } from 'react';

interface ErrorStateProps {
  title?: ReactNode;
  message?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  messageClassName?: string;
  actionClassName?: string;
  style?: CSSProperties;
}

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(' ');
}

const ErrorState = ({
  title = 'Something went wrong',
  message = 'Please try again.',
  actionLabel,
  onAction,
  icon = '!',
  className,
  iconClassName,
  titleClassName,
  messageClassName,
  actionClassName,
  style,
}: ErrorStateProps) => {
  return (
    <div
      className={joinClassNames('error-state', className)}
      style={style}
      role="alert"
    >
      <span className={joinClassNames('error-state__icon', iconClassName)}>
        {icon}
      </span>
      <div className="error-state__content">
        {title && (
          <span className={joinClassNames('error-state__title', titleClassName)}>
            {title}
          </span>
        )}
        {message && (
          <span className={joinClassNames('error-state__message', messageClassName)}>
            {message}
          </span>
        )}
        {actionLabel && onAction && (
          <button
            type="button"
            className={joinClassNames('error-state__action', actionClassName)}
            onClick={onAction}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
