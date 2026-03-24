"use client";

import { useTypingStore } from "@/lib/store";

export default function Stats() {
  const { wpm, accuracy, timeLeft, isRunning, correctChars, wrongChars } =
    useTypingStore();

  return (
    <div className="flex items-center justify-center gap-8 text-sm font-mono">
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-yellow-400">
          {isRunning ? timeLeft : timeLeft}
        </span>
        <span className="opacity-50 text-xs uppercase tracking-wider">
          seconds
        </span>
      </div>
      <div className="w-px h-10 bg-current opacity-10" />
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{wpm}</span>
        <span className="opacity-50 text-xs uppercase tracking-wider">wpm</span>
      </div>
      <div className="w-px h-10 bg-current opacity-10" />
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold">{accuracy}%</span>
        <span className="opacity-50 text-xs uppercase tracking-wider">
          accuracy
        </span>
      </div>
      <div className="w-px h-10 bg-current opacity-10" />
      <div className="flex flex-col items-center">
        <span className="text-lg">
          <span className="text-green-400">{correctChars}</span>
          {" / "}
          <span className="text-red-400">{wrongChars}</span>
        </span>
        <span className="opacity-50 text-xs uppercase tracking-wider">
          chars
        </span>
      </div>
    </div>
  );
}
