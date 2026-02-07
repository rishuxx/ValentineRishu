import React, { useState, useEffect, useRef } from "react";
import { PeachSVG } from "../constants";
import ayushiMusic from "../assests/music/music1.m4a";

const globalAudio = new Audio(ayushiMusic);
globalAudio.loop = true;

declare global {
  interface Window {
    spawnConfetti: () => void;
  }
}

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(0.4);

  const togglePlay = () => {
    if (globalAudio.paused) {
      globalAudio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Autoplay blocked: Click required", err);
        });
    } else {
      globalAudio.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    globalAudio.volume = volume;
  }, [volume]);

  return (
    <div className="glass p-5 rounded-[2.5rem] border-2 border-white shadow-xl space-y-3 w-full animate-slide-up">
      <div className="flex items-center space-x-3">
        <div
          className={`w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center music-spin shadow-inner ${isPlaying ? "" : "pause-animation"}`}
        >
          <span className="text-2xl drop-shadow-sm">🎵</span>
        </div>
        <div className="flex-1 overflow-hidden text-left">
          <p className="font-bold text-pink-600 truncate text-sm leading-tight">
            ayushi's Lofi Paradise
          </p>
          <p className="text-[10px] text-pink-400 font-black uppercase tracking-widest">
            Romantic Chill Beats
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-1">
        <button
          onClick={togglePlay}
          className="w-10 h-10 flex items-center justify-center bg-white/50 rounded-full text-2xl text-rose-500 hover:scale-110 active:scale-90 transition-all shadow-sm outline-none"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <div className="flex-1 mx-3 flex items-center space-x-2">
          <span className="text-[10px] text-pink-300">🔈</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-full accent-pink-400 h-1 bg-pink-100 rounded-lg cursor-pointer appearance-none"
          />
          <span className="text-[10px] text-pink-300">🔊</span>
        </div>
      </div>
    </div>
  );
};

export const LoveCalculator: React.FC = () => {
  const [calc, setCalc] = useState(false);
  const [res, setRes] = useState<number | null>(null);

  const run = () => {
    if (calc) return;
    setCalc(true);
    setRes(null);
    setTimeout(() => {
      setCalc(false);
      setRes(100);
      window.spawnConfetti();
    }, 1500);
  };

  return (
    <div className="glass p-5 rounded-[2.5rem] text-center border-t-4 border-white shadow-xl flex flex-col justify-between h-full min-h-[160px] group">
      <h3 className="font-cherry text-pink-500 text-xs tracking-[0.2em] uppercase mb-2">
        LOVE SCANNER
      </h3>
      <div className="flex justify-center items-center space-x-2 mb-3">
        <span className="font-bold text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
          ayushi
        </span>
        <span className="text-xl animate-pulse">❤️</span>
        <span className="font-bold text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded-full shadow-sm">
          Rishu
        </span>
      </div>
      <button
        onClick={run}
        disabled={calc}
        className="w-full py-2.5 bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-xl font-black shadow-md hover:shadow-lg bubbly-button text-xs disabled:opacity-50 active:scale-95 transition-transform outline-none"
      >
        {calc ? "SCANNING..." : "CALCULATE ✨"}
      </button>
      {res !== null && (
        <div className="animate-slide-up mt-2">
          <p className="text-2xl font-black text-rose-600 leading-none">
            {res}%
          </p>
          <p className="text-[9px] text-pink-400 font-black uppercase tracking-widest mt-1">
            SOULMATES! 🍑
          </p>
        </div>
      )}
    </div>
  );
};

export const MoodMeter: React.FC = () => {
  const moods = ["happy", "blushing", "wink", "in-love", "giggling"];
  const [idx, setIdx] = useState(0);

  return (
    <div className="glass p-5 rounded-[2.5rem] text-center border-t-4 border-white shadow-xl flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="font-cherry text-orange-500 text-xs tracking-[0.2em] uppercase mb-2">
        ayushi MOOD
      </h3>
      <div className="flex justify-center mb-3">
        <PeachSVG mood={moods[idx]} className="w-14 h-14 animate-wobble" />
      </div>
      <div className="flex justify-center space-x-2.5">
        {moods.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-4 h-4 rounded-full transition-all border-2 border-white shadow-sm active:scale-75 ${idx === i ? "bg-orange-400 scale-125" : "bg-orange-100 hover:bg-orange-200"}`}
            title={moods[i]}
          />
        ))}
      </div>
    </div>
  );
};

export const FortuneCookie: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const fortunes = [
    "99 kisses from Rishu today!",
    "A giant surprise awaits ayushi!",
    "Your smile lightens Rishu's world.",
    "Perfect day for a long Rishu-hug.",
    "You are Rishu's favorite peach.",
    "You'll get an unexpected treat!",
  ];

  const crack = () => {
    if (!open) {
      setMsg(fortunes[Math.floor(Math.random() * fortunes.length)]);
      setOpen(true);
      window.spawnConfetti();
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="glass p-5 rounded-[2.5rem] text-center border-t-4 border-white shadow-xl flex flex-col justify-between h-full min-h-[160px]">
      <h3 className="font-cherry text-amber-500 text-xs tracking-[0.2em] uppercase mb-2">
        PEACH COOKIE
      </h3>
      <div
        onClick={crack}
        className="text-4xl cursor-pointer hover:scale-110 active:rotate-12 active:scale-95 transition-transform mb-2 select-none h-12 flex items-center justify-center"
      >
        {open ? "🥠" : "🍪"}
      </div>
      {open ? (
        <p className="text-[10px] font-black text-amber-800 italic animate-slide-up leading-snug px-1">
          "{msg}"
        </p>
      ) : (
        <p className="text-[9px] text-amber-400 font-black uppercase tracking-widest">
          TAP ME!
        </p>
      )}
    </div>
  );
};
