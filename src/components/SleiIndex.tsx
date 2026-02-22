"use client";

import { useEffect, useState } from "react";

export default function SleiIndex() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="p-6 border-b border-wire bg-carbon animate-fade-up" style={{ animationDelay: "0.32s" }}>
      <div className="flex justify-between items-start mb-6">
        <h2 className="font-display text-bone text-lg tracking-[2px]">SLEI INDEX</h2>
        <div className="text-right">
          <span className="font-display text-[72px] text-amber leading-none">
            {mounted ? "62.4" : "0.0"}
          </span>
        </div>
      </div>

      <div className="relative h-2 bg-void rounded-full mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-acid via-amber to-blood opacity-80"></div>
        <div 
          className="absolute top-0 bottom-0 w-1 bg-bone shadow-[0_0_8px_#E8DCC8] transition-all duration-1000 ease-out"
          style={{ left: mounted ? "62.4%" : "0%" }}
        ></div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {[
          { label: "Trade Recency", value: 85, color: "bg-acid" },
          { label: "Volume Decay", value: 42, color: "bg-amber" },
          { label: "TVL Velocity", value: 18, color: "bg-blood" },
          { label: "Price Divergence", value: 76, color: "bg-acid" },
        ].map((sub, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between font-data text-[10px] text-ghost uppercase tracking-[1px]">
              <span>{sub.label}</span>
              <span>{sub.value}</span>
            </div>
            <div className="h-[3px] bg-void rounded-full overflow-hidden">
              <div 
                className={`h-full ${sub.color} transition-all duration-1000 ease-out`}
                style={{ width: mounted ? `${sub.value}%` : "0%" }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <p className="font-editorial italic text-[11px] text-ghost leading-relaxed">
        Composite index weighted across four z-scored signals. Lower score indicates higher probability of permanent capital abandonment.
      </p>
    </div>
  );
}
