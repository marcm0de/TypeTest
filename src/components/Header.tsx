"use client";

import { useTypingStore } from "@/lib/store";
import { Sun, Moon, RotateCcw, Volume2, VolumeX } from "lucide-react";

export default function Header() {
  const { darkMode, toggleDarkMode, resetTest, isRunning, soundEnabled, toggleSound } = useTypingStore();

  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold font-mono tracking-tight">
          <span className="text-yellow-400">Type</span>Test
        </h1>
      </div>
      <div className="flex items-center gap-2">
        {isRunning && (
          <button
            onClick={resetTest}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors opacity-40 hover:opacity-80 cursor-pointer"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
        )}
        <button
          onClick={toggleSound}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors opacity-40 hover:opacity-80 cursor-pointer"
          title={soundEnabled ? "Mute key sounds" : "Enable key sounds"}
        >
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors opacity-40 hover:opacity-80 cursor-pointer"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
