"use client";

import { useEffect, useState } from "react";
import { Pool } from "@/lib/pools";

export default function PoolAutopsy({ pool }: { pool: Pool | null }) {
  const [verdictText, setVerdictText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!pool) return;
    
    setVerdictText("");
    setIsTyping(true);
    
    let i = 0;
    const text = pool.verdict;
    const interval = setInterval(() => {
      setVerdictText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 30); // ~30 chars per second

    return () => clearInterval(interval);
  }, [pool]);

  if (!pool) {
    return (
      <div className="flex-1 flex items-center justify-center bg-carbon border-r border-wire animate-fade-up" style={{ animationDelay: "0.4s" }}>
        <p className="font-data text-ghost text-xs uppercase tracking-[2px]">Select a pool to view autopsy</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-carbon border-r border-wire animate-fade-up" style={{ animationDelay: "0.4s" }}>
      <div className="p-6 border-b border-wire">
        <h2 className="font-display text-bone text-lg tracking-[2px] mb-6">💀 POOL AUTOPSY</h2>
        
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
          <div className="flex flex-col gap-1">
            <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">Last Trade</span>
            <span className="font-data text-bone text-sm">{pool.daysSinceLastTrade} days ago</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">TVL Decay</span>
            <span className="font-data text-blood text-sm">-{((1 - pool.tvlCurrent / pool.tvlPeak) * 100).toFixed(1)}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">Price Deviation</span>
            <span className="font-data text-amber text-sm">{pool.priceGapPct.toFixed(1)}%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">Health Score</span>
            <span className="font-data text-acid text-sm">{pool.healthScore}/100</span>
          </div>
        </div>

        <div className="border border-blood bg-blood/5 p-4 relative">
          <div className="absolute -top-2 left-4 bg-carbon px-2 font-data text-[9px] text-blood uppercase tracking-[2px]">
            Cause of Capital Death
          </div>
          <p className="font-editorial italic text-blood text-[15px] leading-relaxed min-h-[60px]">
            {verdictText}
            {isTyping && <span className="animate-pulse">_</span>}
          </p>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-end">
        <div className="flex justify-between items-end mb-4">
          <div className="flex flex-col gap-1">
            <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">LP Earned (30d)</span>
            <span className="font-data text-acid text-lg">${pool.lpEarned30d.toFixed(2)}</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">Bots Extracted (30d)*</span>
            <span className="font-data text-blood text-lg">${pool.botExtracted30d.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex h-4 rounded-sm overflow-hidden mb-2">
          <div 
            className="bg-acid transition-all duration-1000" 
            style={{ width: `${(pool.lpEarned30d / (pool.lpEarned30d + pool.botExtracted30d)) * 100}%` }}
          ></div>
          <div 
            className="bg-blood transition-all duration-1000" 
            style={{ width: `${(pool.botExtracted30d / (pool.lpEarned30d + pool.botExtracted30d)) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="font-editorial italic text-[10px] text-ghost">*Estimated via cross-pool price convergence analysis</span>
          <div className="flex flex-col items-end">
            <span className="font-data text-[9px] text-ghost uppercase tracking-[1px]">Net Inefficiency</span>
            <span className="font-display text-amber text-xl">
              ${(pool.botExtracted30d - pool.lpEarned30d).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
