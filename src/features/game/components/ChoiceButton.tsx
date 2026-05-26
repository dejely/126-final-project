import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const ChoiceButton: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
}) => {
  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};

export default ChoiceButton;
