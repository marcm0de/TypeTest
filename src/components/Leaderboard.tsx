"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Crown } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  wpm: number;
  accuracy: number;
  mode: number;
}

// Mock leaderboard data — in production, connect to a backend
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "speedster_dev", wpm: 142, accuracy: 98, mode: 60 },
  { rank: 2, name: "keyboard_ninja", wpm: 135, accuracy: 97, mode: 60 },
  { rank: 3, name: "type_master42", wpm: 128, accuracy: 99, mode: 60 },
  { rank: 4, name: "code_fingers", wpm: 121, accuracy: 96, mode: 60 },
  { rank: 5, name: "swift_keys", wpm: 118, accuracy: 95, mode: 60 },
  { rank: 6, name: "turbo_typer", wpm: 112, accuracy: 97, mode: 60 },
  { rank: 7, name: "quick_fox", wpm: 108, accuracy: 94, mode: 60 },
  { rank: 8, name: "blazewriter", wpm: 105, accuracy: 96, mode: 60 },
  { rank: 9, name: "keysmash_pro", wpm: 101, accuracy: 93, mode: 60 },
  { rank: 10, name: "type_it_out", wpm: 98, accuracy: 95, mode: 60 },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown size={14} className="text-yellow-400" />;
  if (rank === 2) return <Medal size={14} className="text-gray-300" />;
  if (rank === 3) return <Medal size={14} className="text-amber-600" />;
  return null;
}

export default function Leaderboard({ userWpm }: { userWpm: number }) {
  // Insert user into leaderboard
  const userRank = MOCK_LEADERBOARD.filter((e) => e.wpm > userWpm).length + 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="max-w-2xl mx-auto space-y-4"
    >
      <div className="flex items-center justify-center gap-2">
        <Trophy size={16} className="text-yellow-400/60" />
        <h3 className="text-xs opacity-50 uppercase tracking-wider">
          Leaderboard (Mock)
        </h3>
      </div>

      {/* User rank */}
      {userWpm > 0 && (
        <div className="text-center">
          <span className="text-sm font-mono opacity-60">
            Your rank: <span className="text-yellow-400 font-bold">#{userRank}</span> of {MOCK_LEADERBOARD.length + 1}
          </span>
        </div>
      )}

      <div className="space-y-1">
        {MOCK_LEADERBOARD.map((entry, i) => {
          const isAboveUser = entry.wpm > userWpm;
          const isUserSlot = i === userRank - 1 && userWpm > 0;

          return (
            <div key={entry.rank}>
              {/* Insert user row */}
              {isUserSlot && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-yellow-400/10 ring-1 ring-yellow-400/20 text-sm font-mono mb-1"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 w-5 text-right font-bold">
                      {userRank}
                    </span>
                    <span className="font-bold text-lg text-yellow-400">
                      {userWpm}
                    </span>
                    <span className="opacity-40 text-xs">WPM</span>
                    <span className="opacity-30 text-xs ml-2">← You</span>
                  </div>
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center justify-between px-4 py-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-sm font-mono"
              >
                <div className="flex items-center gap-3">
                  <span className="opacity-30 w-5 text-right">
                    {getRankIcon(entry.rank) || entry.rank}
                  </span>
                  <span className="font-bold text-lg">{entry.wpm}</span>
                  <span className="opacity-40 text-xs">WPM</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="opacity-60 text-xs">{entry.name}</span>
                  <span
                    className={
                      entry.accuracy >= 95
                        ? "text-green-400/70"
                        : "text-yellow-400/70"
                    }
                  >
                    {entry.accuracy}%
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <p className="text-center text-[10px] opacity-20 font-mono">
        Mock data — connect a backend for real leaderboards
      </p>
    </motion.div>
  );
}
