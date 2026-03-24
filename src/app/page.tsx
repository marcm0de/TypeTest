"use client";

import { useEffect } from "react";
import { useTypingStore } from "@/lib/store";
import Header from "@/components/Header";
import TimerSelector from "@/components/TimerSelector";
import Stats from "@/components/Stats";
import TypingArea from "@/components/TypingArea";
import Results from "@/components/Results";
import History from "@/components/History";
import PracticeModeSelector from "@/components/PracticeModeSelector";

export default function Home() {
  const {
    isRunning,
    isFinished,
    tick,
    loadHistory,
    darkMode,
  } = useTypingStore();

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Timer tick
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "theme-dark" : "theme-light"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6">
        <Header />

        {!isFinished ? (
          <div className="space-y-8 pt-8">
            <PracticeModeSelector />
            <TimerSelector />
            <Stats />
            <TypingArea />
          </div>
        ) : (
          <div className="space-y-8 pt-8">
            <Results />
            <History />
          </div>
        )}

        <footer className="text-center py-12 opacity-20 text-xs font-mono">
          TypeTest — open source typing speed test
        </footer>
      </div>
    </div>
  );
}
