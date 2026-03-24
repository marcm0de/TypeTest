"use client";

import { useTypingStore, TimerMode } from "@/lib/store";

const modes: TimerMode[] = [15, 30, 60, 120];

export default function TimerSelector() {
  const { timerMode, setTimerMode, isRunning } = useTypingStore();

  return (
    <div className="flex items-center justify-center gap-2">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => !isRunning && setTimerMode(mode)}
          disabled={isRunning}
          className={`px-4 py-1.5 rounded-lg text-sm font-mono transition-all ${
            timerMode === mode
              ? "bg-yellow-400/20 text-yellow-400 ring-1 ring-yellow-400/30"
              : "opacity-40 hover:opacity-70"
          } ${isRunning ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {mode}s
        </button>
      ))}
    </div>
  );
}
