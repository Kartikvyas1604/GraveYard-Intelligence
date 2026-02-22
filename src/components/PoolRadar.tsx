"use client";

import { useState } from "react";
import { Pool, mockPools } from "@/lib/pools";
import { AlertTriangle, Skull, Activity } from "lucide-react";

export default function PoolRadar({ onSelectPool }: { onSelectPool: (pool: Pool) => void }) {
  const [filter, setFilter] = useState<"ALL" | "DEAD" | "DYING" | "HAS PROFIT">("ALL");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredPools = mockPools.filter(pool => {
    if (filter === "DEAD") return pool.status === "dead";
    if (filter === "DYING") return pool.status === "dying";
    if (filter === "HAS PROFIT") return pool.realProfitUsd > 10;
    return true;
  });

  const handleSelect = (pool: Pool) => {
    setSelectedId(pool.id);
    onSelectPool(pool);
  };

  return (
    <div className="flex flex-col h-full border-r border-wire bg-carbon animate-fade-up" style={{ animationDelay: "0.24s" }}>
      <div className="p-4 border-b border-wire flex items-center justify-between">
        <h2 className="font-data text-acid text-sm tracking-[2px]">{'//'} DEAD POOL RADAR</h2>
        <div className="flex gap-2">
          {(["ALL", "DEAD", "DYING", "HAS PROFIT"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-data text-[9px] px-2 py-1 border ${filter === f ? 'border-acid text-acid bg-acid/10' : 'border-wire text-ghost hover:text-bone'} transition-colors`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[40px_1fr_100px_80px_80px_60px_40px] gap-2 px-4 py-2 border-b border-wire bg-graphite font-data text-[9px] text-ghost uppercase tracking-[1px]">
          <div>STS</div>
          <div>PAIR</div>
          <div>HEALTH</div>
          <div className="text-right">GAP %</div>
          <div className="text-right">REAL $</div>
          <div className="text-center">CONF</div>
          <div></div>
        </div>

        {filteredPools.map(pool => (
          <div
            key={pool.id}
            onClick={() => handleSelect(pool)}
            className={`grid grid-cols-[40px_1fr_100px_80px_80px_60px_40px] gap-2 px-4 py-3 border-b border-wire cursor-pointer transition-all group
              ${selectedId === pool.id ? 'bg-acid/5 border-l-2 border-l-acid' : 'hover:bg-acid/2 border-l-2 border-l-transparent'}
              ${pool.status === 'dead' && selectedId !== pool.id ? 'border-l-blood' : ''}
              ${pool.status === 'dying' && selectedId !== pool.id ? 'border-l-amber' : ''}
              ${pool.status === 'weak' && selectedId !== pool.id ? 'border-l-ice' : ''}
            `}
          >
            <div className="flex items-center justify-center">
              {pool.status === 'dead' && <Skull className="w-4 h-4 text-blood" />}
              {pool.status === 'dying' && <AlertTriangle className="w-4 h-4 text-amber" />}
              {pool.status === 'weak' && <Activity className="w-4 h-4 text-ice" />}
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-display text-bone text-sm">{pool.pair}</span>
              <span className="font-data text-ghost text-[9px]">{pool.dex}</span>
            </div>
            <div className="flex items-center">
              <div className="w-full h-1.5 bg-void rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ease-out ${pool.healthScore < 20 ? 'bg-blood' : pool.healthScore < 50 ? 'bg-amber' : 'bg-ice'}`}
                  style={{ width: `${pool.healthScore}%` }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end font-data text-ghost text-xs">
              {pool.priceGapPct.toFixed(1)}%
            </div>
            <div className="flex items-center justify-end font-data text-acid text-xs font-bold">
              ${pool.realProfitUsd.toFixed(2)}
            </div>
            <div className="flex items-center justify-center gap-1">
              {[1, 2, 3, 4].map(i => (
                <div 
                  key={i} 
                  className={`w-1.5 h-1.5 rounded-full ${i <= pool.confidenceScore ? 'bg-bone' : 'bg-void border border-wire'}`}
                />
              ))}
            </div>
            <div className="flex items-center justify-center">
              <span className="font-data text-acid text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
