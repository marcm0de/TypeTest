"use client";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

const SPECIAL_KEYS = [" "];

function getHeatColor(count: number, max: number): string {
  if (count === 0) return "bg-white/5";
  const intensity = count / max;
  if (intensity > 0.7) return "bg-red-500/60";
  if (intensity > 0.4) return "bg-orange-500/40";
  if (intensity > 0.2) return "bg-yellow-500/30";
  return "bg-yellow-500/15";
}

export default function KeyboardHeatmap({
  errorKeys,
}: {
  errorKeys: Record<string, number>;
}) {
  const max = Math.max(...Object.values(errorKeys), 1);

  return (
    <div className="flex flex-col items-center gap-1.5">
      {ROWS.map((row, ri) => (
        <div
          key={ri}
          className="flex gap-1.5"
          style={{ paddingLeft: `${ri * 16}px` }}
        >
          {row.map((key) => {
            const count = errorKeys[key] || 0;
            return (
              <div
                key={key}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-mono transition-colors ${getHeatColor(
                  count,
                  max
                )}`}
                title={count > 0 ? `${key}: ${count} errors` : key}
              >
                <span className={count > 0 ? "opacity-90" : "opacity-30"}>
                  {key}
                </span>
                {count > 0 && (
                  <span className="text-[10px] ml-0.5 text-red-300">
                    {count}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
      {/* Space bar */}
      {(errorKeys[" "] || 0) > 0 && (
        <div className="flex gap-1.5 mt-1">
          <div
            className={`w-48 h-10 rounded-lg flex items-center justify-center text-xs font-mono ${getHeatColor(
              errorKeys[" "] || 0,
              max
            )}`}
          >
            <span className="opacity-60">space</span>
            <span className="text-[10px] ml-1 text-red-300">
              {errorKeys[" "]}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
