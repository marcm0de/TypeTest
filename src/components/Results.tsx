"use client";

import { motion } from "framer-motion";
import { useTypingStore } from "@/lib/store";
import { RotateCcw, Trophy } from "lucide-react";
import KeyboardHeatmap from "./KeyboardHeatmap";
import ShareCard from "./ShareCard";
import Leaderboard from "./Leaderboard";
import { useEffect, useState } from "react";

function AnimatedNumber({ value, duration = 1.2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [value, duration]);

  return <>{display}{suffix}</>;
}

const statVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.12,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function Results() {
  const { wpm, accuracy, correctChars, wrongChars, timerMode, personalBest, resetTest, isFinished, errorKeys } =
    useTypingStore();

  if (!isFinished) return null;

  const elapsed = timerMode;
  const isNewBest = wpm >= personalBest && wpm > 0;

  const stats = [
    { label: "Accuracy", value: accuracy, suffix: "%", color: accuracy >= 95 ? "text-green-400" : accuracy >= 85 ? "text-yellow-400" : "text-red-400", bg: accuracy >= 95 ? "from-green-500/10 to-green-500/5" : accuracy >= 85 ? "from-yellow-500/10 to-yellow-500/5" : "from-red-500/10 to-red-500/5", ring: accuracy >= 95 ? "ring-green-500/20" : accuracy >= 85 ? "ring-yellow-500/20" : "ring-red-500/20" },
    { label: "Correct", value: correctChars, suffix: "", color: "text-green-400", bg: "from-green-500/10 to-green-500/5", ring: "ring-green-500/20" },
    { label: "Errors", value: wrongChars, suffix: "", color: "text-red-400", bg: "from-red-500/10 to-red-500/5", ring: "ring-red-500/20" },
    { label: "Time", value: elapsed, suffix: "s", color: "text-yellow-400", bg: "from-yellow-500/10 to-yellow-500/5", ring: "ring-yellow-500/20" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Main WPM result */}
      <div className="text-center space-y-3">
        {isNewBest && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
            className="inline-flex items-center gap-2 text-yellow-400 text-sm bg-yellow-400/10 px-4 py-1.5 rounded-full ring-1 ring-yellow-400/20"
          >
            <Trophy size={14} />
            <span className="font-medium">New Personal Best!</span>
            <Trophy size={14} />
          </motion.div>
        )}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-8xl font-bold font-mono tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            <AnimatedNumber value={wpm} duration={1.5} />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-sm uppercase tracking-[0.2em] font-medium"
        >
          words per minute
        </motion.div>
      </div>

      {/* Stats grid with staggered reveal */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={statVariants}
            initial="hidden"
            animate="visible"
            className={`text-center p-4 rounded-xl bg-gradient-to-b ${stat.bg} ring-1 ${stat.ring} backdrop-blur-sm`}
          >
            <div className={`text-2xl font-bold font-mono ${stat.color}`}>
              <AnimatedNumber value={stat.value} duration={1.0} suffix={stat.suffix} />
            </div>
            <div className="text-[11px] opacity-40 uppercase tracking-wider mt-1.5 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Keyboard Heatmap */}
      {Object.keys(errorKeys).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="space-y-3"
        >
          <h3 className="text-sm opacity-50 uppercase tracking-wider text-center">
            Error Heatmap
          </h3>
          <KeyboardHeatmap errorKeys={errorKeys} />
        </motion.div>
      )}

      {/* Share Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
      >
        <ShareCard />
      </motion.div>

      {/* Leaderboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        <Leaderboard userWpm={wpm} />
      </motion.div>

      {/* Restart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.4 }}
        className="flex justify-center pb-4"
      >
        <button
          onClick={resetTest}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 hover:scale-105 active:scale-95 transition-all duration-200 font-mono text-sm cursor-pointer ring-1 ring-yellow-400/20"
        >
          <RotateCcw size={16} />
          Try Again
        </button>
      </motion.div>
    </motion.div>
  );
}
