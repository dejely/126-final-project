import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const ChoiceButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  disabled = false,
  ariaLabel,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled || !onClick) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      onClick={disabled ? undefined : onClick}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {children}
    </div>
  );
};

export default ChoiceButton;
