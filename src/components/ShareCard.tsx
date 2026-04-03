"use client";

import { useRef, useState } from "react";
import { Share2, Download, Copy, Check } from "lucide-react";
import { useTypingStore } from "@/lib/store";

export default function ShareCard() {
  const { wpm, accuracy, correctChars, wrongChars, timerMode, practiceMode } = useTypingStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  const generateCard = (): HTMLCanvasElement | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    canvas.width = 600;
    canvas.height = 340;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 600, 340);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");
    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, 600, 340, 16);
    ctx.fill();

    // Border accent
    ctx.strokeStyle = "#facc15";
    ctx.lineWidth = 2;
    ctx.roundRect(0, 0, 600, 340, 16);
    ctx.stroke();

    // Title
    ctx.fillStyle = "#facc15";
    ctx.font = "bold 20px monospace";
    ctx.fillText("TypeTest Results", 30, 40);

    // Mode badge
    const modeLabels: Record<string, string> = {
      standard: "Common English",
      programming: "Programming",
      numbers: "Numbers",
    };
    ctx.fillStyle = "rgba(250, 204, 21, 0.2)";
    const modeText = `${modeLabels[practiceMode]} · ${timerMode}s`;
    ctx.roundRect(30, 55, ctx.measureText(modeText).width + 20, 24, 6);
    ctx.fill();
    ctx.fillStyle = "#facc15";
    ctx.font = "12px monospace";
    ctx.fillText(modeText, 40, 72);

    // Big WPM
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 80px monospace";
    ctx.fillText(`${wpm}`, 30, 175);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.font = "14px monospace";
    ctx.fillText("WPM", 30, 200);

    // Stats grid
    const stats = [
      { label: "ACCURACY", value: `${accuracy}%`, color: accuracy >= 95 ? "#4ade80" : accuracy >= 85 ? "#fbbf24" : "#f87171" },
      { label: "CORRECT", value: `${correctChars}`, color: "#4ade80" },
      { label: "ERRORS", value: `${wrongChars}`, color: "#f87171" },
      { label: "TIME", value: `${timerMode}s`, color: "#fbbf24" },
    ];

    stats.forEach((stat, i) => {
      const x = 30 + i * 140;
      const y = 230;

      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.roundRect(x, y, 120, 70, 8);
      ctx.fill();

      ctx.fillStyle = stat.color;
      ctx.font = "bold 24px monospace";
      ctx.fillText(stat.value, x + 12, y + 35);

      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.font = "10px monospace";
      ctx.fillText(stat.label, x + 12, y + 55);
    });

    // Footer
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.font = "11px monospace";
    ctx.fillText("typetest · open source typing speed test", 30, 325);

    return canvas;
  };

  const downloadCard = () => {
    const canvas = generateCard();
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `typetest-${wpm}wpm.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const copyCard = async () => {
    const canvas = generateCard();
    if (!canvas) return;
    try {
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/png")
      );
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback to download
      downloadCard();
    }
  };

  const shareText = () => {
    const text = `⌨️ TypeTest Results\n🏎️ ${wpm} WPM | 🎯 ${accuracy}% accuracy\n✅ ${correctChars} correct | ❌ ${wrongChars} errors\n⏱️ ${timerMode}s | Mode: ${practiceMode}\n\nTry it yourself!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <canvas ref={canvasRef} className="hidden" />
      <h3 className="text-sm opacity-50 uppercase tracking-wider text-center">
        Share Results
      </h3>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={downloadCard}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-mono"
        >
          <Download size={14} />
          Download Card
        </button>
        <button
          onClick={copyCard}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-mono"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy Image"}
        </button>
        <button
          onClick={shareText}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-xs font-mono"
        >
          <Share2 size={14} />
          Copy Text
        </button>
      </div>
    </div>
  );
}
