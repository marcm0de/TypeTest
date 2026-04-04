"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTypingStore } from "@/lib/store";

export default function TypingArea() {
  const {
    text,
    typed,
    isRunning,
    isFinished,
    handleKeyPress,
    handleBackspace,
  } = useTypingStore();

  const containerRef = useRef<HTMLDivElement>(null);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isFinished) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleKeyPress(e.key);
      }
    },
    [isFinished, handleKeyPress, handleBackspace]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  // Auto-scroll to keep current character visible
  useEffect(() => {
    if (containerRef.current) {
      const cursor = containerRef.current.querySelector("[data-cursor]");
      if (cursor) {
        cursor.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [typed]);

  return (
    <div
      ref={containerRef}
      className="relative max-w-3xl mx-auto p-8 rounded-2xl font-mono text-2xl leading-[1.8] select-none focus:outline-none bg-white/[0.02] ring-1 ring-white/[0.06]"
      style={{ letterSpacing: "0.08em", fontFeatureSettings: "'liga' 1, 'calt' 1" }}
      tabIndex={0}
    >
      {!isRunning && !isFinished && typed.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <span className="text-base opacity-40 font-sans">
            Start typing to begin...
          </span>
        </div>
      )}
      <div className="flex flex-wrap">
        {text.split("").map((char, i) => {
          const isTyped = i < typed.length;
          const isCurrent = i === typed.length;
          const isCorrect = isTyped && typed[i] === char;
          const isWrong = isTyped && typed[i] !== char;

          let colorClass = "opacity-40"; // pending
          if (isCorrect) colorClass = "text-green-400";
          if (isWrong) colorClass = "text-red-400 underline decoration-red-500/50";

          return (
            <span
              key={i}
              className={`relative transition-colors duration-75 ${colorClass}`}
              data-cursor={isCurrent ? "" : undefined}
            >
              {isCurrent && (
                <span className="absolute -left-[1px] top-[2px] bottom-[2px] w-[2.5px] bg-yellow-400 rounded-full animate-cursor shadow-[0_0_8px_rgba(250,204,21,0.4)]" />
              )}
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
