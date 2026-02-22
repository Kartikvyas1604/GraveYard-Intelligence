"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroStrip from "@/components/HeroStrip";
import PoolRadar from "@/components/PoolRadar";
import SleiIndex from "@/components/SleiIndex";
import PoolAutopsy from "@/components/PoolAutopsy";
import TradingTutor from "@/components/TradingTutor";
import HeatMap from "@/components/HeatMap";
import DecayForecast from "@/components/DecayForecast";
import { Pool } from "@/lib/pools";

export default function Home() {
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroStrip />
      
      <main className="flex-1 grid grid-cols-[1fr_1fr_380px] h-[calc(100vh-136px)]">
        <PoolRadar onSelectPool={setSelectedPool} />
        
        <div className="flex flex-col h-full border-r border-wire">
          <SleiIndex />
          <PoolAutopsy pool={selectedPool} />
        </div>
        
        <TradingTutor />
      </main>

      <div className="h-[180px] border-t border-wire flex">
        <HeatMap />
        <DecayForecast pool={selectedPool} />
      </div>
    </div>
  );
}
