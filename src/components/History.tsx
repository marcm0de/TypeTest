"use client";

import { motion } from "framer-motion";
import { useTypingStore } from "@/lib/store";
import { Clock, Trophy } from "lucide-react";

export default function History() {
  const { history, personalBest } = useTypingStore();

  if (history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="max-w-2xl mx-auto space-y-4"
    >
      {/* Personal Best */}
      <div className="flex items-center justify-center gap-2 text-yellow-400/80">
        <Trophy size={14} />
        <span className="text-sm font-mono">
          Personal Best: {personalBest} WPM
        </span>
      </div>

      {/* History list */}
      <div className="space-y-2">
        <h3 className="text-xs opacity-40 uppercase tracking-wider text-center">
          Recent Tests
        </h3>
        <div className="space-y-1">
          {history.slice(0, 10).map((result, i) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm font-mono"
            >
              <div className="flex items-center gap-3">
                <span className="opacity-30 w-5 text-right">{i + 1}</span>
                <span className="font-bold text-lg">{result.wpm}</span>
                <span className="opacity-40 text-xs">WPM</span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={
                    result.accuracy >= 95
                      ? "text-green-400/80"
                      : result.accuracy >= 85
                      ? "text-yellow-400/80"
                      : "text-red-400/80"
                  }
                >
                  {result.accuracy}%
                </span>
                <span className="opacity-30 text-xs flex items-center gap-1">
                  <Clock size={10} />
                  {result.mode}s
                </span>
                <span className="opacity-20 text-xs">
                  {new Date(result.date).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
