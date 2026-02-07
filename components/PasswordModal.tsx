
import React, { useState } from 'react';
import { DayConfig } from '../types';
import { PeachCoupleSVG, PeachSVG } from '../constants';

interface PasswordModalProps {
  day: DayConfig;
  onSuccess: () => void;
  onCancel: () => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ day, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);

  const errorMessages = [
    "Oopsie! That peach doesn't match! 🍑❌",
    "Nope! Try again, my love! 💕",
    "Wrong password, cutie! 😘",
    "Almost there! The peaches believe in you! 🍑✨",
    "Aww, not quite! Think about us... 💭💕"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = password.toLowerCase().trim();
    if (day.passwords.includes(normalized)) {
      window.spawnConfetti();
      onSuccess();
    } else {
      setAttempts(prev => prev + 1);
      setError(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      setIsWobbling(true);
      setTimeout(() => setIsWobbling(false), 500);
      if (attempts >= 4) setShowHint(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`glass max-w-md w-full p-8 rounded-[3.5rem] border-t-8 border-white shadow-3xl text-center relative ${isWobbling ? 'animate-bounce' : ''}`}>
        <button onClick={onCancel} className="absolute top-6 right-8 text-pink-300 hover:text-pink-500 text-2xl">✕</button>
        
        <PeachCoupleSVG action="blush" className="mb-6 scale-110" />
        
        <h2 className="font-cherry text-rose-600 text-3xl uppercase tracking-tighter mb-2">Secret Chapter Locked</h2>
        <p className="text-gray-500 font-bold mb-8 italic">Enter the magic word to open {day.title}!</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Magic Password..."
              className="w-full px-6 py-4 rounded-2xl bg-pink-50 border-2 border-pink-200 focus:border-pink-400 focus:outline-none font-black text-rose-600 placeholder-pink-200 shadow-inner text-center text-xl"
              autoFocus
            />
          </div>

          {error && (
            <div className="animate-slide-up">
              <p className="text-rose-500 font-black text-sm">{error}</p>
              <p className="text-pink-300 text-[10px] mt-1 uppercase tracking-widest">Attempt {attempts}/∞</p>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-pink-400 to-rose-600 text-white rounded-2xl font-black shadow-xl bubbly-button text-xl tracking-widest"
          >
            UNLOCK MY SURPRISE! 🔒✨
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-pink-100 flex flex-col items-center">
          <button 
            onClick={() => setShowHint(!showHint)}
            className="flex items-center space-x-2 text-pink-400 font-black hover:text-pink-600 transition-colors uppercase text-xs tracking-widest"
          >
            <span>Need a hint?</span>
            <span className="animate-bounce">🍑</span>
          </button>
          
          {showHint && (
            <div className="mt-4 bg-white/60 p-4 rounded-2xl border-2 border-dashed border-pink-200 animate-slide-up">
              <p className="text-pink-700 font-bold italic">"{day.hint}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
