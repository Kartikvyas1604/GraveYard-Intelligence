"use client";

import { useEffect, useState } from "react";

export default function HeroStrip() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: "Dead Pools", value: 1247, color: "text-blood", prefix: "" },
    { label: "Capital Trapped", value: 2.4, color: "text-amber", prefix: "$", suffix: "M" },
    { label: "Est. Arb/24h", value: 89, color: "text-acid", prefix: "$", suffix: "K" },
    { label: "SLEI Index", value: 62.4, color: "text-amber", prefix: "" },
    { label: "Live Opps", value: 34, color: "text-ice", prefix: "" },
  ];

  return (
    <div className="w-full h-[80px] bg-graphite border-b border-wire flex items-center animate-fade-up" style={{ animationDelay: "0.16s" }}>
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`flex-1 flex flex-col items-center justify-center h-full ${index !== stats.length - 1 ? 'border-r border-wire' : ''}`}
        >
          <div className="flex items-baseline gap-1">
            <span className={`font-display text-[32px] ${stat.color}`}>
              {stat.prefix}
              {mounted ? (
                <span 
                  style={{ 
                    // @ts-expect-error Custom CSS property
                    "--num": Math.floor(stat.value) 
                  }} 
                  className="counter-animate"
                >
                  {stat.value % 1 !== 0 ? `.${stat.value.toString().split('.')[1]}` : ''}
                </span>
              ) : "0"}
              {stat.suffix}
            </span>
          </div>
          <span className="font-data text-[9px] text-ghost tracking-[3px] uppercase mt-1">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
