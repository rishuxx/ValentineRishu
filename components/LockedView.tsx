import React from "react";
import { DayConfig } from "../types";
import { PeachSVG } from "../constants";

interface LockedViewProps {
  day: DayConfig;
  onBack: () => void;
}

const LockedView: React.FC<LockedViewProps> = ({ day, onBack }) => {
  const lockMessages = [
    `ayushi, you little sneaky peach! 🍑 Wait until Feb ${day.date}!`,
    `Nuh-uh! This peach hasn't ripened yet! 🍑⏰`,
    `Patience, my love! Even peaches need time to grow! 💕`,
    `Caught you peeking! 👀 Come back on Feb ${day.date}, cutie!`,
    `These peaches are saying 'not yet!' 🍑❌`,
  ];

  const randomMessage = lockMessages[day.date % lockMessages.length];

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center animate-in zoom-in duration-300">
      <div className="relative">
        <PeachSVG mood="sleepy" className="scale-[2] animate-pulse" />
        <div className="absolute -top-4 -right-4 bg-white p-2 rounded-full shadow-lg text-2xl">
          💤
        </div>
      </div>

      <div className="glass p-8 rounded-3xl max-w-md shadow-2xl border-4 border-[#FFCCB6]">
        <h2 className="text-3xl font-pacifico text-[#E91E63] mb-4">
          Slow Down, Cutie!
        </h2>
        <p className="text-xl font-medium text-[#8D6E63] leading-relaxed">
          {randomMessage}
        </p>
      </div>

      <button
        onClick={onBack}
        className="px-8 py-3 bg-[#FF92A9] text-white rounded-full font-bold shadow-lg hover:bg-[#E91E63] transition-colors bubbly-button"
      >
        Go Back Home 🏠
      </button>

      <div className="flex space-x-4">
        <span
          className="text-3xl animate-bounce"
          style={{ animationDelay: "0s" }}
        >
          🍑
        </span>
        <span
          className="text-3xl animate-bounce"
          style={{ animationDelay: "0.2s" }}
        >
          🔒
        </span>
        <span
          className="text-3xl animate-bounce"
          style={{ animationDelay: "0.4s" }}
        >
          🍑
        </span>
      </div>
    </div>
  );
};

export default LockedView;
