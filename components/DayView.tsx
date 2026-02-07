import React, { useState, useEffect, useCallback, useMemo } from "react";
import { DayConfig, ValentineDay, SecretReply, QuizQuestion } from "../types";
import {
  PeachSVG,
  VALENTINE_WEEK,
  PeachCoupleSVG,
  DAILY_QUIZZES,
} from "../constants";
import ScratchReveal from "./ScratchReveal";

// Fixed path to the user-provided image asset
const COUPLE_PHOTO = "./assets/img2.jpeg";

interface DayViewProps {
  day: DayConfig;
  onBack: () => void;
}

const DayView: React.FC<DayViewProps> = ({ day, onBack }) => {
  const [viewStage, setViewStage] = useState<
    "game" | "quiz" | "success" | "flash"
  >("game");
  const [gameState, setGameState] = useState<"playing" | "lost">("playing");
  const [gameData, setGameData] = useState<any>(null);
  const [lives, setLives] = useState(8);
  const [timer, setTimer] = useState(0);
  const [retryCount, setRetryCount] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [ayushiReply, setayushiReply] = useState("");
  const [hasSentReply, setHasSentReply] = useState(false);
  const [photoRevealed, setPhotoRevealed] = useState(false);

  const quizQuestions = DAILY_QUIZZES[day.id] || [];

  const handleSuccessAction = useCallback(() => {
    if (typeof window.spawnConfetti === "function") {
      window.spawnConfetti();
    }
  }, []);

  const winGame = () => {
    handleSuccessAction();
    setViewStage("quiz");
  };

  const loseLife = () => {
    setLives((prev) => {
      const next = prev - 1;
      if (next <= 0) {
        setGameState("lost");
        return 0;
      }
      return next;
    });
  };

  const retryGame = () => {
    setGameState("playing");
    setGameData(null);
    setLives(8);
    setTimer(0);
    setRetryCount((prev) => prev + 1);
  };

  const handleQuizAnswer = (idx: number) => {
    if (idx === quizQuestions[currentQuizIndex].correctAnswer) {
      handleSuccessAction();
      if (currentQuizIndex < quizQuestions.length - 1) {
        setCurrentQuizIndex((prev) => prev + 1);
      } else {
        setViewStage("success");
      }
    } else {
      alert("Aww, ayushi! That's not quite right. Think like a lovebird! 💕");
    }
  };

  useEffect(() => {
    setViewStage("game");
    setGameState("playing");
    setGameData(null);
    setLives(8);
    setTimer(0);
    setHasSentReply(false);
    setayushiReply("");
    setCurrentQuizIndex(0);
    setPhotoRevealed(false);
  }, [day.id]);

  const chocolateGrid = useMemo(() => {
    const treats = ["🍫", "🍬", "🍩", "🍪", "🍨", "🧁"];
    return [...treats, ...treats].sort(() => Math.random() - 0.5);
  }, [day.id, retryCount]);

  const saveReply = () => {
    if (!ayushiReply.trim()) return;
    const existing: SecretReply[] = JSON.parse(
      localStorage.getItem("ayushi_replies") || "[]",
    );
    const newReply: SecretReply = {
      dayId: day.id,
      dayTitle: day.title,
      message: ayushiReply,
      timestamp: Date.now(),
    };
    localStorage.setItem(
      "ayushi_replies",
      JSON.stringify([...existing, newReply]),
    );
    setHasSentReply(true);
  };

  const shareViaWhatsApp = () => {
    const text = `Hey Rishu! I just finished the ${day.title} Love Quiz! 🍑❤️\n\nMy heart's reply to you: "${ayushiReply}"`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    saveReply();
  };

  const renderGame = () => {
    if (gameState === "lost") {
      return (
        <div className="flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-300">
          <PeachSVG mood="sleepy" className="scale-150 grayscale" />
          <h3 className="text-3xl font-cherry text-rose-500 uppercase">
            Aww, ayushi!
          </h3>
          <p className="text-gray-500 font-bold italic text-xl">
            The peaches are a bit tired. Give it another try? 🍑
          </p>
          <button
            onClick={retryGame}
            className="px-12 py-4 bg-rose-500 text-white rounded-2xl font-black shadow-xl bubbly-button border-b-4 border-rose-700 active:scale-95 transition-transform"
          >
            RETRY MISSION 🔄
          </button>
        </div>
      );
    }

    switch (day.id) {
      case ValentineDay.ROSE:
        return (
          <div className="space-y-8 text-center animate-slide-up">
            <h3 className="text-3xl font-cherry text-rose-600 uppercase tracking-widest">
              Rose Bloom Puzzle
            </h3>
            <p className="text-gray-500 font-bold text-lg">
              Click the numbers in order (1 to 5) to surprise Rishu! 🌹
            </p>
            <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto p-4">
              {[3, 1, 5, 2, 4].map((num) => {
                const isClicked = (gameData || []).includes(num);
                return (
                  <button
                    key={num}
                    onClick={() => {
                      const current = gameData || [];
                      const nextExpected = current.length + 1;
                      if (num === nextExpected) {
                        const next = [...current, num];
                        setGameData(next);
                        if (next.length === 5) winGame();
                      } else if (!isClicked) {
                        loseLife();
                      }
                    }}
                    className={`aspect-square rounded-[2rem] text-4xl font-black shadow-2xl transition-all border-b-[10px] active:scale-90 ${isClicked ? "bg-rose-500 text-white border-rose-700 scale-90 opacity-80" : "bg-white text-rose-300 border-rose-100 hover:scale-105"}`}
                  >
                    {isClicked ? "🌹" : num}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case ValentineDay.PROPOSE:
        return (
          <div className="space-y-10 flex flex-col items-center animate-slide-up py-4">
            <PeachCoupleSVG action="hands" className="scale-[2.0] mb-12" />
            {!gameData ? (
              <div className="glass p-12 rounded-[5rem] w-full max-w-lg text-center space-y-10 bg-white/60">
                <h3 className="text-3xl font-cherry text-rose-500 uppercase">
                  The Big Question
                </h3>
                <p className="font-bold text-gray-600 text-2xl">
                  How long will I love you, ayushi?
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <button
                    onClick={loseLife}
                    className="p-6 bg-white rounded-3xl border-4 border-pink-50 shadow-md font-bold text-gray-400 hover:text-rose-300 transition-all text-xl active:scale-95"
                  >
                    365 Days
                  </button>
                  <button
                    onClick={() => {
                      setGameData("solved");
                      handleSuccessAction();
                    }}
                    className="p-6 bg-rose-500 text-white rounded-3xl border-b-8 border-rose-700 shadow-xl font-black text-2xl hover:scale-105 transition-all active:scale-95"
                  >
                    Forever & Ever
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in zoom-in duration-500 text-center bg-white/80 p-16 rounded-[6rem] border-[10px] border-pink-50 shadow-2xl">
                <h2 className="text-6xl font-pacifico text-rose-600 mb-10 leading-tight">
                  "Will you be mine forever?"
                </h2>
                <button
                  onClick={winGame}
                  className="px-20 py-10 bg-rose-500 text-white rounded-full font-black shadow-2xl bubbly-button text-4xl active:scale-95"
                >
                  YES! 🤩❤️
                </button>
              </div>
            )}
          </div>
        );

      case ValentineDay.CHOCOLATE:
        const currentFlipped = gameData?.flipped || [];
        const currentSolved = gameData?.solved || [];
        return (
          <div className="space-y-8 text-center animate-slide-up">
            <h3 className="text-3xl font-cherry text-amber-800 uppercase tracking-widest">
              Chocolate Memory
            </h3>
            <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto p-4">
              {chocolateGrid.map((item: string, i: number) => {
                const isFlipped =
                  currentFlipped.includes(i) || currentSolved.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (currentFlipped.length >= 2 || isFlipped) return;
                      const nextFlipped = [...currentFlipped, i];
                      setGameData({
                        ...gameData,
                        flipped: nextFlipped,
                        solved: currentSolved,
                      });
                      if (nextFlipped.length === 2) {
                        const [first, second] = nextFlipped;
                        if (chocolateGrid[first] === chocolateGrid[second]) {
                          const newSolved = [...currentSolved, first, second];
                          setGameData({ flipped: [], solved: newSolved });
                          if (newSolved.length === 12) setTimeout(winGame, 600);
                        } else {
                          setTimeout(() => {
                            setGameData({ flipped: [], solved: currentSolved });
                            loseLife();
                          }, 800);
                        }
                      }
                    }}
                    className={`aspect-square glass rounded-[2rem] text-5xl flex items-center justify-center transition-all shadow-2xl active:scale-95 ${isFlipped ? "bg-amber-50" : "bg-white rotate-6 hover:rotate-0"}`}
                  >
                    {isFlipped ? item : "🎁"}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case ValentineDay.TEDDY:
        return (
          <div className="flex flex-col items-center space-y-12 animate-slide-up py-4">
            <div className="text-[180px] drop-shadow-2xl animate-wobble">
              🧸
            </div>
            <div className="glass p-12 rounded-[5rem] w-full max-w-lg text-center space-y-10 bg-white/60">
              <h3 className="text-3xl font-cherry text-orange-600 uppercase">
                Cuddle Quiz
              </h3>
              <p className="font-bold text-gray-500 text-2xl">
                12 (Months) + Teddy Day Date (10) = ?
              </p>
              <input
                type="number"
                placeholder="..."
                className="p-8 rounded-[3rem] border-8 border-orange-50 bg-white text-center font-black text-5xl text-orange-600 w-full outline-none focus:border-orange-200"
                onChange={(e) => {
                  if (e.target.value === "22") winGame();
                }}
              />
            </div>
          </div>
        );

      case ValentineDay.PROMISE:
        return (
          <div className="space-y-10 animate-slide-up py-10 flex flex-col items-center">
            <div className="text-[140px] animate-bounce">🤝</div>
            <div className="glass p-14 rounded-[5rem] text-center space-y-12 w-full max-w-xl bg-white/70 shadow-2xl border-4 border-blue-100">
              <h3 className="text-3xl font-cherry text-blue-500 uppercase tracking-widest leading-none">
                Unscramble our Vow
              </h3>
              <div className="flex justify-center flex-wrap gap-4">
                {["R", "O", "E", "F", "V", "E", "R"].sort().map((l, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 flex items-center justify-center bg-blue-50 rounded-2xl font-black text-blue-400 text-3xl shadow-sm border border-blue-100"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="..."
                className="w-full p-8 rounded-[3.5rem] border-8 border-blue-50 text-center font-black text-blue-600 uppercase text-4xl outline-none focus:border-blue-100"
                onChange={(e) => {
                  if (e.target.value.toUpperCase() === "FOREVER") winGame();
                }}
              />
            </div>
          </div>
        );

      case ValentineDay.HUG:
        return (
          <div className="flex flex-col items-center space-y-12 py-10 animate-slide-up">
            <div className="text-[180px] animate-pulse">🤗</div>
            <div className="glass p-14 rounded-[6rem] text-center w-full max-w-2xl bg-white/60 border-4 border-rose-50 shadow-2xl">
              <p className="font-pacifico text-rose-500 text-4xl mb-14">
                Hold me for 4-6 seconds!
              </p>
              <button
                onPointerDown={() => {
                  setTimer(Date.now());
                }}
                onPointerUp={() => {
                  if (timer === 0) return;
                  const duration = (Date.now() - timer) / 1000;
                  setTimer(0);
                  if (duration >= 3.8 && duration <= 6.2) {
                    winGame();
                  } else {
                    alert(
                      `That was ${duration.toFixed(1)}s! Try to get exactly 5s!`,
                    );
                    loseLife();
                  }
                }}
                className="w-72 h-72 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full text-white text-5xl font-black shadow-2xl bubbly-button border-[12px] border-white/50 flex items-center justify-center select-none outline-none active:scale-95 transition-transform"
              >
                {timer ? "HUGGING!" : "HUG ME!"}
              </button>
            </div>
          </div>
        );

      case ValentineDay.KISS:
        return (
          <div className="flex flex-col items-center space-y-12 animate-slide-up py-10">
            <h3 className="text-4xl font-cherry text-rose-500 uppercase">
              Catch My Kisses!
            </h3>
            <div className="relative w-full h-[500px] bg-pink-100/40 rounded-[5rem] border-[12px] border-white overflow-hidden shadow-inner cursor-crosshair">
              <button
                onClick={() => {
                  const count = (gameData || 0) + 1;
                  setGameData(count);
                  handleSuccessAction();
                  if (count >= 5) winGame();
                }}
                className="absolute text-[100px] transition-all transform hover:scale-125 active:scale-90 select-none drop-shadow-xl"
                style={{
                  left: `${Math.random() * 60 + 20}%`,
                  top: `${Math.random() * 60 + 20}%`,
                }}
              >
                💋
              </button>
            </div>
          </div>
        );

      case ValentineDay.VALENTINE:
        return (
          <div className="space-y-12 text-center pb-20 animate-slide-up">
            <div className="space-y-12 p-20 glass rounded-[6rem] border-[12px] border-pink-50 shadow-3xl">
              <PeachCoupleSVG action="blush" className="scale-[3.0] mb-20" />
              <h2 className="text-6xl font-cherry text-rose-600 uppercase">
                Final Key
              </h2>
              <p className="text-3xl font-black text-gray-500 italic px-8 leading-relaxed">
                What is the result of:
                <br />
                <span className="text-rose-400 text-5xl font-cherry mt-4 block">
                  (2 + 2) * 2 - (4) = ?
                </span>
              </p>
              <input
                type="number"
                placeholder="?"
                className="w-full max-w-sm p-10 rounded-[3.5rem] border-8 border-pink-100 text-center font-black text-6xl text-rose-600 outline-none focus:border-rose-200"
                onChange={(e) => {
                  if (e.target.value === "4") winGame();
                }}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderQuiz = () => {
    const q = quizQuestions[currentQuizIndex];
    return (
      <div className="flex flex-col items-center justify-center space-y-10 animate-in fade-in zoom-in duration-500 py-10">
        <div className="bg-white p-6 rounded-full shadow-2xl border-4 border-pink-100 animate-bounce">
          <span className="text-6xl">💖</span>
        </div>
        <div className="space-y-4 text-center">
          <p className="text-rose-400 font-black uppercase tracking-widest text-sm">
            Question {currentQuizIndex + 1} of 5
          </p>
          <h3 className="text-4xl lg:text-5xl font-cherry text-rose-600 leading-tight max-w-2xl px-4">
            {q.question}
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl px-6">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleQuizAnswer(i)}
              className="p-8 bg-white/80 rounded-[2.5rem] glass border-2 border-pink-100 font-bold text-2xl text-[#5D4037] hover:bg-rose-50 hover:text-rose-500 hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSuccess = () => {
    const messages = {
      [ValentineDay.ROSE]:
        "Roses are red, violets are blue, I'm the luckiest guy because I have you! 🌹",
      [ValentineDay.PROPOSE]:
        "You said YES! 🎉 I'm doing a happy dance Rishu-style! I love you! 💍💖",
      [ValentineDay.CHOCOLATE]:
        "Sweetness overload! You're officially sweeter than a mountain of KitKats, ayushi! 🍫",
      [ValentineDay.TEDDY]:
        "Mission: Cuddle. Status: Required. 🧸 Get ready for a lifetime supply of warm Rishu-squeezes!",
      [ValentineDay.PROMISE]:
        "I promise to always be your safe place. You're stuck with me forever! 🤝💞",
      [ValentineDay.HUG]:
        "That hug was 10/10. My heart feels like a toasted marshmallow in your arms! 🤗🔥",
      [ValentineDay.KISS]:
        "Mwah! 💋 Every kiss we share is pure magic. Sending you a million more! ✨",
      [ValentineDay.VALENTINE]:
        "ayushi! You've unlocked my whole heart. Happy Valentine's Day, my world! 💝🌍",
    };

    return (
      <div className="flex flex-col items-center justify-center space-y-8 text-center animate-in zoom-in duration-700 px-6">
        {/* Scratch to Reveal Photo Integration */}
        <div className="relative group mb-4">
          <div className="absolute inset-0 bg-pink-200 blur-2xl opacity-30 -rotate-6 scale-110"></div>
          <div className="bg-white p-4 pb-12 rounded-lg shadow-2xl rotate-3 transform group-hover:rotate-0 transition-transform border border-pink-50 flex flex-col items-center">
            <ScratchReveal
              imageUrl={COUPLE_PHOTO}
              width={280}
              height={280}
              onComplete={() => setPhotoRevealed(true)}
            />
            <div className="mt-4 text-rose-400 font-pacifico text-2xl">
              Rishu & ayushi ❤️
            </div>
          </div>
          {photoRevealed && (
            <>
              <div className="absolute -top-6 -right-6 text-5xl animate-bounce">
                💖
              </div>
              <div className="absolute -bottom-4 -left-6 text-4xl animate-pulse">
                🍑
              </div>
            </>
          )}
        </div>

        <div className="max-w-3xl bg-white/60 p-12 rounded-[5rem] glass border-2 border-pink-100 shadow-2xl space-y-8">
          <h3 className="text-5xl font-pacifico text-rose-600">
            Pure Love! ✨
          </h3>
          <p className="text-3xl text-[#5D4037] font-bold italic font-quicksand leading-relaxed">
            "{messages[day.id]}"
          </p>
        </div>

        {/* Only show reply and finish button after scratch is complete */}
        {photoRevealed && (
          <div className="animate-in fade-in slide-in-from-bottom duration-700 w-full flex flex-col items-center space-y-8">
            <div className="w-full max-w-xl bg-pink-50/80 p-10 rounded-[4rem] border-2 border-dashed border-pink-300 space-y-6 shadow-inner">
              <h4 className="font-cherry text-rose-500 text-2xl uppercase">
                A Heart Reply for Rishu? 💌
              </h4>
              {!hasSentReply ? (
                <>
                  <textarea
                    value={ayushiReply}
                    onChange={(e) => setayushiReply(e.target.value)}
                    placeholder="Write your sweet reply to me here, ayushi..."
                    className="w-full p-6 rounded-3xl border-2 border-pink-100 focus:border-pink-400 focus:outline-none font-bold text-rose-700 h-32 bg-white/50 text-xl resize-none"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={saveReply}
                      className="flex-1 py-5 bg-white text-rose-500 rounded-2xl font-black text-xl shadow-lg hover:bg-pink-50 active:scale-95 transition-all border-b-4 border-pink-100"
                    >
                      SAVE 🔒
                    </button>
                    <button
                      onClick={shareViaWhatsApp}
                      className="flex-1 py-5 bg-[#25D366] text-white rounded-2xl font-black text-xl shadow-lg hover:scale-105 active:scale-95 transition-all border-b-4 border-[#128C7E]"
                    >
                      SEND 📲
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-6 text-3xl text-rose-600 font-black animate-bounce">
                  Saved! Thank you my love! 😍✨
                </div>
              )}
            </div>
            <button
              onClick={() => setViewStage("flash")}
              className="px-24 py-10 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-full font-black shadow-3xl bubbly-button text-4xl border-t-4 border-white/20 active:translate-y-2 transition-transform"
            >
              FINISH DAY 🎉
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderFlash = () => {
    return (
      <div className="flex flex-col items-center justify-center space-y-12 text-center animate-in zoom-in duration-1000 px-6 h-full min-h-[800px]">
        {/* Final Flash Screen Memory */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-rose-400 blur-3xl opacity-20 animate-pulse rounded-full"></div>
          <div className="bg-white p-6 pb-20 rounded-xl shadow-[0_50px_100px_rgba(255,146,169,0.5)] -rotate-3 hover:rotate-0 transition-transform scale-125 border-4 border-white">
            <img
              src={COUPLE_PHOTO}
              alt="Our Memory"
              className="w-80 h-80 object-cover rounded-sm border-2 border-pink-50"
            />
            <div className="absolute bottom-6 left-0 right-0 text-rose-500 font-cherry text-3xl uppercase tracking-tighter">
              My Forever Person
            </div>
          </div>
          <div className="absolute -top-10 -left-10 text-8xl animate-float">
            💖
          </div>
          <div className="absolute -bottom-10 -right-10 text-8xl animate-float-slow">
            ✨
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <h2 className="text-8xl md:text-[9rem] font-cherry text-rose-600 leading-none drop-shadow-2xl">
            {day.title}
          </h2>
          <p className="text-3xl font-pacifico text-rose-400">
            Chapter Complete, ayushi!
          </p>
        </div>
        <div className="bg-white/40 p-10 rounded-[4rem] glass border-2 border-white shadow-2xl relative z-10 max-w-2xl">
          <p className="text-2xl font-bold text-[#5D4037] leading-relaxed">
            You've completed this chapter of our Wonderland perfectly. I'm so
            proud of you, my favorite peach! See you in the next one! 🍑✨
          </p>
        </div>
        <button
          onClick={onBack}
          className="px-24 py-10 bg-white text-rose-500 rounded-full font-black shadow-[0_30px_60px_rgba(255,255,255,0.4)] bubbly-button text-5xl border-b-8 border-pink-100 relative z-10 active:scale-90 transition-transform"
        >
          CLOSE & HOME 🏠
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-12 pb-32 max-w-7xl mx-auto px-6 relative z-10">
      <header
        className={`flex flex-col lg:flex-row items-center justify-between gap-10 ${viewStage === "flash" ? "hidden" : ""}`}
      >
        <button
          onClick={onBack}
          className="p-8 bg-white rounded-[3rem] shadow-3xl hover:bg-pink-50 group border-b-[10px] border-pink-100 min-w-[250px] active:translate-y-2 transition-all"
        >
          <span className="text-5xl group-hover:-translate-x-3 transition-transform inline-block">
            ⬅️
          </span>
          <span className="font-black text-[#5D4037] uppercase text-3xl font-cherry ml-4">
            BACK
          </span>
        </button>
        <div className="text-center lg:text-right">
          <h2 className="text-7xl lg:text-9xl font-cherry text-rose-600 uppercase drop-shadow-lg leading-none">
            {day.title}
          </h2>
          <div className="bg-white/90 px-12 py-5 rounded-full inline-flex items-center space-x-6 shadow-2xl mt-10 border border-pink-50">
            <span className="text-rose-400 font-black uppercase text-xl italic tracking-widest">
              CHAPTER {VALENTINE_WEEK.findIndex((d) => d.id === day.id) + 1}
            </span>
            <span className="w-6 h-6 rounded-full bg-pink-300 animate-pulse"></span>
            <span className="font-black text-rose-600 text-xl">
              {viewStage.toUpperCase()} STAGE
            </span>
          </div>
        </div>
      </header>

      <div
        className={`rainbow-border shadow-[0_100px_200px_rgba(255,146,169,0.4)] bg-white/40 p-4 rounded-[7rem] overflow-hidden ${viewStage === "flash" ? "mt-10" : ""}`}
      >
        <div className="inner-content p-12 lg:p-24 min-h-[950px] flex flex-col justify-center rounded-[6.8rem] bg-white/95 relative shadow-inner overflow-hidden">
          {viewStage === "game" && renderGame()}
          {viewStage === "quiz" && renderQuiz()}
          {viewStage === "success" && renderSuccess()}
          {viewStage === "flash" && renderFlash()}
        </div>
      </div>

      {/* Lives display for games */}
      {viewStage === "game" && gameState !== "lost" && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-white/90 px-10 py-5 rounded-full shadow-2xl border-4 border-rose-100 z-[100] animate-bounce">
          <span className="text-2xl font-black text-rose-500">
            ayushi'S LIVES: {Array(lives).fill("❤️").join(" ")}
          </span>
        </div>
      )}
    </div>
  );
};

export default DayView;
