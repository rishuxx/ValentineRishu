import React, { useState, useEffect } from "react";
import { VALENTINE_WEEK } from "./constants";
import { DayConfig } from "./types";
import FloatingHearts from "./components/FloatingHearts";
import DayView from "./components/DayView";
import LockedView from "./components/LockedView";
import HomeView from "./components/HomeView";
import PasswordModal from "./components/PasswordModal";
import { MusicPlayer } from "./components/InteractiveTools";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<"home" | "day">("home");
  const [selectedDay, setSelectedDay] = useState<DayConfig | null>(null);
  const [currentDate] = useState(new Date());

  const [unlockedPasswords, setUnlockedPasswords] = useState<string[]>(() => {
    const saved = localStorage.getItem("ayushi_unlocked_days");
    return saved ? JSON.parse(saved) : [];
  });

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "ayushi_unlocked_days",
      JSON.stringify(unlockedPasswords),
    );
  }, [unlockedPasswords]);

  const isDateUnlocked = (day: DayConfig) => {
    const now = currentDate;
    const year = now.getFullYear();
    const month = now.getMonth();
    const d = now.getDate();
    if (year > 2025) return true;
    if (year === 2025 && month > 1) return true;
    if (year === 2025 && month === 1 && d >= day.date) return true;
    return false;
  };

  const handleSelectDay = (day: DayConfig) => {
    setSelectedDay(day);
    if (!isDateUnlocked(day)) {
      setCurrentView("day");
    } else if (unlockedPasswords.includes(day.id)) {
      setCurrentView("day");
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordSuccess = () => {
    if (selectedDay) {
      setUnlockedPasswords((prev) => [...new Set([...prev, selectedDay.id])]);
      setIsPasswordModalOpen(false);
      setCurrentView("day");
    }
  };

  const goHome = () => {
    setCurrentView("home");
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#FFF5E1] via-[#FFD1DC] to-[#FFCCB6] overflow-x-hidden flex flex-col">
      <FloatingHearts />

      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-8 flex-grow w-full">
        {currentView === "home" ? (
          <HomeView onSelectDay={handleSelectDay} isUnlocked={isDateUnlocked} />
        ) : (
          <div className="animate-in fade-in zoom-in duration-500">
            {selectedDay &&
              (!isDateUnlocked(selectedDay) ? (
                <LockedView day={selectedDay} onBack={goHome} />
              ) : (
                <DayView day={selectedDay} onBack={goHome} />
              ))}
          </div>
        )}
      </main>

      {/* Footer Addition */}
      <footer className="relative z-20 py-10 text-center">
        <div className="glass inline-block px-8 py-3 rounded-full border border-white shadow-lg">
          <p className="font-pacifico text-rose-500 text-xl">
            Made with <span className="animate-pulse inline-block">❤️</span> by
            Rishu
          </p>
        </div>
      </footer>

      {isPasswordModalOpen && selectedDay && (
        <PasswordModal
          day={selectedDay}
          onSuccess={handlePasswordSuccess}
          onCancel={() => setIsPasswordModalOpen(false)}
        />
      )}

      {/* Persistent Controls Widget */}
      <div className="fixed bottom-6 right-6 z-[60] w-64 md:w-72 hidden md:block">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default App;
