import { create } from "zustand";
import { generateText, PracticeMode } from "./words";

export type TimerMode = 15 | 30 | 60 | 120;

export interface TestResult {
  id: string;
  wpm: number;
  accuracy: number;
  correctChars: number;
  wrongChars: number;
  totalChars: number;
  time: number;
  mode: TimerMode;
  date: string;
  errorKeys: Record<string, number>;
}

interface TypingState {
  // Test state
  text: string;
  typed: string;
  isRunning: boolean;
  isFinished: boolean;
  timerMode: TimerMode;
  timeLeft: number;
  startTime: number | null;

  // Stats
  correctChars: number;
  wrongChars: number;
  wpm: number;
  accuracy: number;
  errorKeys: Record<string, number>;

  // History
  history: TestResult[];
  personalBest: number;

  // Practice mode
  practiceMode: PracticeMode;

  // Sound effects
  soundEnabled: boolean;

  // Theme
  darkMode: boolean;

  // Actions
  setPracticeMode: (mode: PracticeMode) => void;
  toggleSound: () => void;
  setTimerMode: (mode: TimerMode) => void;
  startTest: () => void;
  handleKeyPress: (char: string) => void;
  handleBackspace: () => void;
  finishTest: () => void;
  resetTest: () => void;
  tick: () => void;
  loadHistory: () => void;
  toggleDarkMode: () => void;
}

function getWordCount(mode: TimerMode): number {
  switch (mode) {
    case 15: return 30;
    case 30: return 50;
    case 60: return 80;
    case 120: return 140;
  }
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch { /* ignore */ }
}

export const useTypingStore = create<TypingState>((set, get) => ({
  text: generateText(50),
  typed: "",
  isRunning: false,
  isFinished: false,
  timerMode: 30,
  timeLeft: 30,
  startTime: null,
  correctChars: 0,
  wrongChars: 0,
  wpm: 0,
  accuracy: 100,
  errorKeys: {},
  history: [],
  personalBest: 0,
  practiceMode: "standard",
  soundEnabled: false,
  darkMode: true,

  setPracticeMode: (mode) => {
    const { timerMode } = get();
    set({
      practiceMode: mode,
      text: generateText(getWordCount(timerMode), mode),
      typed: "",
      isRunning: false,
      isFinished: false,
      startTime: null,
      correctChars: 0,
      wrongChars: 0,
      wpm: 0,
      accuracy: 100,
      errorKeys: {},
    });
  },

  toggleSound: () => {
    const newVal = !get().soundEnabled;
    saveToStorage("typetest-sound", newVal);
    set({ soundEnabled: newVal });
  },

  setTimerMode: (mode) => {
    const { practiceMode } = get();
    set({
      timerMode: mode,
      timeLeft: mode,
      text: generateText(getWordCount(mode), practiceMode),
      typed: "",
      isRunning: false,
      isFinished: false,
      startTime: null,
      correctChars: 0,
      wrongChars: 0,
      wpm: 0,
      accuracy: 100,
      errorKeys: {},
    });
  },

  startTest: () => {
    const { timerMode, practiceMode } = get();
    set({
      isRunning: true,
      startTime: Date.now(),
      timeLeft: timerMode,
      typed: "",
      correctChars: 0,
      wrongChars: 0,
      wpm: 0,
      accuracy: 100,
      errorKeys: {},
      isFinished: false,
      text: generateText(getWordCount(timerMode), practiceMode),
    });
  },

  handleKeyPress: (char) => {
    const state = get();
    if (state.isFinished) return;
    if (!state.isRunning) {
      // Auto-start on first keypress
      set({ isRunning: true, startTime: Date.now(), timeLeft: state.timerMode });
    }

    const { text, typed, errorKeys } = get();
    const pos = typed.length;
    if (pos >= text.length) return;

    const expected = text[pos];
    const isCorrect = char === expected;
    const newTyped = typed + char;

    const correct = get().correctChars + (isCorrect ? 1 : 0);
    const wrong = get().wrongChars + (isCorrect ? 0 : 1);
    const total = correct + wrong;

    // Track error keys
    const newErrorKeys = { ...errorKeys };
    if (!isCorrect) {
      newErrorKeys[expected] = (newErrorKeys[expected] || 0) + 1;
    }

    // Calculate WPM
    const startTime = get().startTime;
    const elapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0;
    const wpm = elapsed > 0 ? Math.round((correct / 5) / elapsed) : 0;
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;

    set({
      typed: newTyped,
      correctChars: correct,
      wrongChars: wrong,
      wpm,
      accuracy,
      errorKeys: newErrorKeys,
    });

    // Check if text is complete
    if (newTyped.length >= text.length) {
      get().finishTest();
    }
  },

  handleBackspace: () => {
    const { typed, isFinished } = get();
    if (isFinished || typed.length === 0) return;
    // We don't adjust correctChars/wrongChars on backspace for simplicity
    set({ typed: typed.slice(0, -1) });
  },

  finishTest: () => {
    const state = get();
    if (state.isFinished) return;

    const elapsed = state.startTime ? (Date.now() - state.startTime) / 1000 : state.timerMode;
    const elapsedMin = elapsed / 60;
    const finalWpm = elapsedMin > 0 ? Math.round((state.correctChars / 5) / elapsedMin) : 0;
    const total = state.correctChars + state.wrongChars;
    const finalAccuracy = total > 0 ? Math.round((state.correctChars / total) * 100) : 100;

    const result: TestResult = {
      id: Date.now().toString(),
      wpm: finalWpm,
      accuracy: finalAccuracy,
      correctChars: state.correctChars,
      wrongChars: state.wrongChars,
      totalChars: total,
      time: Math.round(elapsed),
      mode: state.timerMode,
      date: new Date().toISOString(),
      errorKeys: state.errorKeys,
    };

    const newHistory = [result, ...state.history].slice(0, 20);
    const newBest = Math.max(state.personalBest, finalWpm);

    saveToStorage("typetest-history", newHistory);
    saveToStorage("typetest-best", newBest);

    set({
      isFinished: true,
      isRunning: false,
      wpm: finalWpm,
      accuracy: finalAccuracy,
      history: newHistory,
      personalBest: newBest,
    });
  },

  resetTest: () => {
    const { timerMode, practiceMode } = get();
    set({
      text: generateText(getWordCount(timerMode), practiceMode),
      typed: "",
      isRunning: false,
      isFinished: false,
      timeLeft: timerMode,
      startTime: null,
      correctChars: 0,
      wrongChars: 0,
      wpm: 0,
      accuracy: 100,
      errorKeys: {},
    });
  },

  tick: () => {
    const state = get();
    if (!state.isRunning || state.isFinished) return;
    const newTime = state.timeLeft - 1;
    if (newTime <= 0) {
      set({ timeLeft: 0 });
      get().finishTest();
    } else {
      // Update WPM on tick too
      const elapsed = state.startTime ? (Date.now() - state.startTime) / 1000 / 60 : 0;
      const wpm = elapsed > 0 ? Math.round((state.correctChars / 5) / elapsed) : 0;
      set({ timeLeft: newTime, wpm });
    }
  },

  loadHistory: () => {
    const history = loadFromStorage<TestResult[]>("typetest-history", []);
    const personalBest = loadFromStorage<number>("typetest-best", 0);
    const darkMode = loadFromStorage<boolean>("typetest-darkmode", true);
    const soundEnabled = loadFromStorage<boolean>("typetest-sound", false);
    set({ history, personalBest, darkMode, soundEnabled });
  },

  toggleDarkMode: () => {
    const newMode = !get().darkMode;
    saveToStorage("typetest-darkmode", newMode);
    set({ darkMode: newMode });
  },
}));
