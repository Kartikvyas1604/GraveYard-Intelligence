"use client";

import Link from "next/link";
import { useState } from "react";
import { Skull, Wallet } from "lucide-react";

export default function Header() {
  const [beginnerMode, setBeginnerMode] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-[56px] bg-carbon border-b border-wire flex items-center justify-between px-6 animate-fade-up" style={{ animationDelay: "0.08s" }}>
      <div className="flex items-center gap-4">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Skull className="absolute text-ghost opacity-20 w-8 h-8 animate-logo-rotate" />
          <span className="relative z-10 font-display text-acid text-lg tracking-[4px]">GYI</span>
        </div>
        <span className="font-display text-bone text-sm tracking-[2px] hidden md:inline-block">
          GRAVEYARD INTELLIGENCE
        </span>
      </div>

      <nav className="flex items-center gap-8">
        <Link href="/" className="font-data text-[11px] uppercase tracking-[2px] text-bone hover:text-acid transition-colors">
          Radar
        </Link>
        <Link href="/simulate" className="font-data text-[11px] uppercase tracking-[2px] text-bone hover:text-acid transition-colors">
          Simulate
        </Link>
        <Link href="/learn" className="font-data text-[11px] uppercase tracking-[2px] text-bone hover:text-acid transition-colors">
          Learn
        </Link>
      </nav>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input 
              type="checkbox" 
              className="sr-only" 
              checked={beginnerMode}
              onChange={() => setBeginnerMode(!beginnerMode)}
            />
            <div className={`block w-8 h-4 rounded-full transition-colors ${beginnerMode ? 'bg-acid' : 'bg-wire'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-void w-2 h-2 rounded-full transition-transform ${beginnerMode ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <span className="font-data text-[10px] text-ghost group-hover:text-bone transition-colors">
            BEGINNER MODE
          </span>
        </label>

        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-ice animate-pulse glow-ice"></div>
          <button className="flex items-center gap-2 px-4 py-1.5 border border-wire hover:border-acid hover:bg-acid/5 transition-all hover-lift rounded-sm">
            <Wallet className="w-3 h-3 text-acid" />
            <span className="font-data text-[11px] text-acid">CONNECT</span>
          </button>
        </div>
      </div>
    </header>
  );
}
