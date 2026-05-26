import React from "react";
import { setUserChoice } from "../hooks/useGame.ts";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  choice?: number;
}

const ChoiceButton: React.FC<ButtonProps> = ({
  choice = 0,
  children,
  className,
}) => {
  return (
    <div onClick={() => setUserChoice(choice)} className={className}>
      {children}
    </div>
  );
};

export default ChoiceButton;
