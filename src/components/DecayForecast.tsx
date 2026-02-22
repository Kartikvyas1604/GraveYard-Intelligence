"use client";

import { useEffect, useState } from "react";
import { Pool } from "@/lib/pools";

export default function DecayForecast({ pool }: { pool: Pool | null }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!pool) {
    return (
      <div className="flex-1 flex items-center justify-center bg-carbon animate-fade-up" style={{ animationDelay: "0.64s" }}>
        <p className="font-data text-ghost text-xs uppercase tracking-[2px]">Select a pool to view forecast</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-carbon animate-fade-up" style={{ animationDelay: "0.64s" }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-data text-bone text-xs tracking-[2px] uppercase">5-Day Decay Forecast</h2>
        <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">Confidence: High</span>
      </div>

      <div className="flex items-center gap-8">
        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="var(--wire)"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="var(--blood)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={mounted ? 251.2 - (251.2 * pool.abandonProbability5d) / 100 : 251.2}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="font-display text-blood text-xl">{pool.abandonProbability5d}%</span>
            <span className="font-data text-[8px] text-ghost uppercase tracking-[1px]">Abandon</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3">
          {[
            { label: "TVL Exit", value: 85, color: "bg-amber" },
            { label: "Volume Drop", value: 92, color: "bg-blood" },
            { label: "LP Withdrawal", value: 45, color: "bg-acid" },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex justify-between font-data text-[9px] text-ghost uppercase tracking-[1px]">
                <span>{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="h-1.5 bg-void rounded-full overflow-hidden">
                <div 
                  className={`h-full ${bar.color} transition-all duration-1000 ease-out`}
                  style={{ width: mounted ? `${bar.value}%` : "0%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
