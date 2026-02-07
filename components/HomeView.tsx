
import React, { useState, useEffect } from 'react';
import { VALENTINE_WEEK, PeachCoupleSVG } from '../constants';
import { DayConfig, SecretReply } from '../types';
import { LoveCalculator, FortuneCookie, MoodMeter, MusicPlayer } from './InteractiveTools';

interface HomeViewProps {
  onSelectDay: (day: DayConfig) => void;
  isUnlocked: (day: DayConfig) => boolean;
}

const HomeView: React.FC<HomeViewProps> = ({ onSelectDay, isUnlocked }) => {
  const [replies, setReplies] = useState<SecretReply[]>([]);
  const [showMailbox, setShowMailbox] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ayushi_replies');
    if (saved) setReplies(JSON.parse(saved));
  }, []);

  const clearReplies = () => {
    if (window.confirm("Are you sure you want to clear the mailbox?")) {
      localStorage.removeItem('ayushi_replies');
      setReplies([]);
    }
  };

  return (
    <div className="text-center space-y-16 pb-32 animate-slide-up">
      <header className="space-y-6 pt-10 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 opacity-30 blur-2xl w-64 h-64 bg-pink-200 rounded-full"></div>
        <PeachCoupleSVG action="blush" className="animate-float scale-150 mb-10" />
        <div className="space-y-2">
          <h1 className="text-7xl md:text-[10rem] font-pacifico text-[#E91E63] drop-shadow-2xl leading-none">
            Ayushi's
          </h1>
          <h1 className="text-4xl md:text-6xl font-cherry text-[#FF92A9] tracking-tighter uppercase drop-shadow-sm mt-[-20px]">
            Valentine Wonderland
          </h1>
        </div>
        <p className="text-2xl text-[#8D6E63] font-black max-w-2xl mx-auto leading-relaxed px-6">
          A premium magical journey crafted just for you, my favorite person! 🍑💕✨
        </p>
      </header>

      {/* Guide Card */}
      <div className="glass p-10 rounded-[4rem] max-w-3xl mx-auto border-2 border-pink-100 shadow-2xl">
        <h4 className="font-cherry text-rose-500 text-2xl mb-8 uppercase">Your Journey Guide 💖</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm font-black text-gray-500">
          <div className="space-y-4">
            <span className="text-5xl block animate-wobble">🎮</span>
            <p>1. Play the daily peach mission!</p>
          </div>
          <div className="space-y-4">
            <span className="text-5xl block animate-bounce">💖</span>
            <p>2. Ace the 5 Love Questions!</p>
          </div>
          <div className="space-y-4">
            <span className="text-5xl block animate-pulse">💌</span>
            <p>3. Write your heart out to me!</p>
          </div>
        </div>
      </div>

      {/* Secret Mailbox */}
      {replies.length > 0 && (
        <button 
          onClick={() => setShowMailbox(!showMailbox)}
          className="bg-white px-10 py-6 rounded-full shadow-2xl border-2 border-rose-100 font-black text-rose-600 flex items-center space-x-4 mx-auto hover:scale-105 active:scale-95 transition-all text-xl"
        >
          <span>📫 SECRET MAILBOX ({replies.length})</span>
          <span className="animate-bounce">✨</span>
        </button>
      )}

      {showMailbox && (
        <div className="animate-in slide-in-from-bottom duration-500 space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-between items-center px-4">
            <h3 className="font-cherry text-rose-600 text-3xl">AYUSHI'S HEART REPLIES</h3>
            <button onClick={clearReplies} className="text-xs font-black text-gray-400 underline uppercase tracking-widest">Clear All</button>
          </div>
          <div className="space-y-6">
            {replies.map((reply, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] text-left border-l-[12px] border-rose-400 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-black text-rose-500 uppercase tracking-[0.3em]">{reply.dayTitle}</span>
                  <span className="text-xs text-gray-400 font-bold">{new Date(reply.timestamp).toLocaleString()}</span>
                </div>
                <p className="text-2xl font-bold text-gray-700 italic font-quicksand">"{reply.message}"</p>
              </div>
            )).reverse()}
          </div>
        </div>
      )}

      {/* Interactive Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        <LoveCalculator />
        <MoodMeter />
        <FortuneCookie />
        <MusicPlayer />
      </div>

      {/* Chapter Selection */}
      <div className="space-y-16">
        <div className="flex flex-col items-center space-y-4">
            <h2 className="text-5xl font-cherry text-rose-600 uppercase tracking-[0.3em] px-4">Secret Chapters</h2>
            <div className="w-32 h-2 bg-gradient-to-r from-pink-300 via-rose-500 to-pink-300 rounded-full animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-6">
          {VALENTINE_WEEK.map((day) => {
            const unlocked = isUnlocked(day);
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(day)}
                className={`
                  group relative glass rounded-[4rem] p-10 flex flex-col items-center justify-center 
                  transition-all duration-500 hover:scale-110 active:scale-90 shadow-2xl border-t-[10px] border-white/60
                  ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
                `}
                style={{ borderBottom: `16px solid ${day.color}` }}
              >
                {!unlocked && (
                  <div className="absolute -top-5 -right-5 text-3xl bg-white p-4 rounded-3xl shadow-2xl z-20 border-2 border-pink-50 animate-bounce">🔒</div>
                )}
                <div className={`text-8xl mb-8 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${!unlocked ? 'grayscale blur-[2px] opacity-40' : 'animate-wobble'}`}>
                  {day.icon}
                </div>
                <h3 className="font-black text-[#5D4037] text-2xl tracking-tighter uppercase mb-4">{day.title}</h3>
                <div className="bg-white/50 px-6 py-2 rounded-full border border-white">
                    <p className="text-sm font-black text-rose-400 uppercase tracking-widest leading-none">FEB {day.date}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeView;
