"use client";

import { motion } from "framer-motion";
import { useTypingStore } from "@/lib/store";
import { RotateCcw, Trophy } from "lucide-react";
import KeyboardHeatmap from "./KeyboardHeatmap";
import ShareCard from "./ShareCard";

export default function Results() {
  const { wpm, accuracy, correctChars, wrongChars, timerMode, personalBest, resetTest, isFinished, errorKeys } =
    useTypingStore();

  if (!isFinished) return null;

  const elapsed = timerMode;
  const isNewBest = wpm >= personalBest && wpm > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Main result */}
      <div className="text-center space-y-2">
        {isNewBest && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center justify-center gap-2 text-yellow-400 text-sm"
          >
            <Trophy size={16} />
            <span>New Personal Best!</span>
            <Trophy size={16} />
          </motion.div>
        )}
        <div className="text-7xl font-bold font-mono">{wpm}</div>
        <div className="text-sm opacity-50 uppercase tracking-widest">
          words per minute
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Accuracy", value: `${accuracy}%`, color: accuracy >= 95 ? "text-green-400" : accuracy >= 85 ? "text-yellow-400" : "text-red-400" },
          { label: "Correct", value: correctChars.toString(), color: "text-green-400" },
          { label: "Errors", value: wrongChars.toString(), color: "text-red-400" },
          { label: "Time", value: `${elapsed}s`, color: "text-yellow-400" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center p-4 rounded-xl bg-white/5"
          >
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs opacity-40 uppercase tracking-wider mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Keyboard Heatmap */}
      {Object.keys(errorKeys).length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm opacity-50 uppercase tracking-wider text-center">
            Error Heatmap
          </h3>
          <KeyboardHeatmap errorKeys={errorKeys} />
        </div>
      )}

      {/* Share Card */}
      <ShareCard />

      {/* Restart */}
      <div className="flex justify-center">
        <button
          onClick={resetTest}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 transition-all font-mono text-sm cursor-pointer"
        >
          <RotateCcw size={16} />
          Try Again
        </button>
      </div>
    </motion.div>
  );
}
