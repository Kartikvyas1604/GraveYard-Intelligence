"use client";

import { useEffect, useState } from "react";

export default function HeatMap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateCells = () => {
    const cells = [];
    for (let i = 0; i < 120; i++) {
      const intensity = Math.random();
      let colorClass = "bg-void border-wire";
      if (intensity > 0.9) colorClass = "bg-blood border-blood";
      else if (intensity > 0.7) colorClass = "bg-amber border-amber";
      else if (intensity > 0.4) colorClass = "bg-acid border-acid";
      else if (intensity > 0.2) colorClass = "bg-ice border-ice";

      cells.push(
        <div
          key={i}
          className={`w-full h-full border ${colorClass} transition-all duration-300 hover:scale-150 hover:z-10 hover:shadow-[0_0_12px_currentColor] cursor-crosshair`}
          title={`MEV Activity: ${(intensity * 100).toFixed(1)}%`}
        />
      );
    }
    return cells;
  };

  return (
    <div className="flex-1 p-6 border-r border-wire bg-carbon animate-fade-up" style={{ animationDelay: "0.56s" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-data text-bone text-xs tracking-[2px] uppercase">MEV Heatmap</h2>
        <div className="flex gap-2 items-center">
          <span className="font-data text-[9px] text-ghost uppercase">Low</span>
          <div className="w-2 h-2 bg-void border border-wire"></div>
          <div className="w-2 h-2 bg-ice"></div>
          <div className="w-2 h-2 bg-acid"></div>
          <div className="w-2 h-2 bg-amber"></div>
          <div className="w-2 h-2 bg-blood"></div>
          <span className="font-data text-[9px] text-ghost uppercase">High</span>
        </div>
      </div>
      <div className="grid grid-cols-20 grid-rows-6 gap-1 h-[120px]">
        {mounted ? generateCells() : null}
      </div>
    </div>
  );
}
