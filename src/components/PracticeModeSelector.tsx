"use client";

import { useTypingStore } from "@/lib/store";
import type { PracticeMode } from "@/lib/words";

const modes: { id: PracticeMode; label: string; icon: string }[] = [
  { id: "standard", label: "Common English", icon: "📝" },
  { id: "programming", label: "Programming", icon: "💻" },
  { id: "numbers", label: "Numbers", icon: "🔢" },
];

export default function PracticeModeSelector() {
  const { practiceMode, setPracticeMode, isRunning } = useTypingStore();

  return (
    <div className="flex items-center justify-center gap-2">
      <span className="text-xs opacity-40 uppercase tracking-wider mr-1">Mode</span>
      {modes.map((mode) => (
        <button
          key={mode.id}
          onClick={() => !isRunning && setPracticeMode(mode.id)}
          disabled={isRunning}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
            practiceMode === mode.id
              ? "bg-yellow-400/20 text-yellow-400"
              : "bg-white/5 opacity-40 hover:opacity-70"
          } ${isRunning ? "cursor-default" : "cursor-pointer"}`}
        >
          <span>{mode.icon}</span>
          {mode.label}
        </button>
      ))}
    </div>
  );
}
