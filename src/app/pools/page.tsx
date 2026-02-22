import { mockPools } from "@/lib/pools";
import Link from "next/link";
import { AlertTriangle, Skull, Activity } from "lucide-react";
import Header from "@/components/Header";

export default function PoolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <div className="mb-8">
        <h1 className="font-display text-bone text-3xl tracking-[4px] mb-2">{'//'} ALL POOLS</h1>
        <p className="font-editorial text-ghost text-lg italic">Complete directory of monitored liquidity pools.</p>
      </div>

      <div className="bg-carbon border border-wire flex-1 flex flex-col overflow-hidden">
        <div className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 border-b border-wire bg-graphite font-data text-[10px] text-ghost uppercase tracking-[2px]">
          <div>STATUS</div>
          <div>PAIR / DEX</div>
          <div>HEALTH SCORE</div>
          <div className="text-right">PRICE GAP</div>
          <div className="text-right">REAL PROFIT</div>
          <div className="text-right">TVL</div>
          <div className="text-center">CONFIDENCE</div>
          <div></div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {mockPools.map((pool, idx) => (
            <Link 
              href={`/pools/${pool.id}`} 
              key={pool.id}
              className={`grid grid-cols-[60px_2fr_1fr_1fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 border-b border-wire hover:bg-acid/5 transition-all group items-center
                border-l-2 border-l-transparent
                ${pool.status === 'dead' ? 'hover:border-l-blood' : ''}
                ${pool.status === 'dying' ? 'hover:border-l-amber' : ''}
                ${pool.status === 'weak' ? 'hover:border-l-ice' : ''}
              `}
              style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
            >
              <div className="flex items-center justify-center">
                {pool.status === 'dead' && <Skull className="w-5 h-5 text-blood" />}
                {pool.status === 'dying' && <AlertTriangle className="w-5 h-5 text-amber" />}
                {pool.status === 'weak' && <Activity className="w-5 h-5 text-ice" />}
              </div>
              
              <div className="flex flex-col justify-center">
                <span className="font-display text-bone text-lg">{pool.pair}</span>
                <span className="font-data text-ghost text-[10px] uppercase tracking-[1px]">{pool.dex}</span>
              </div>
              
              <div className="flex flex-col justify-center gap-2">
                <div className="flex justify-between font-data text-[10px]">
                  <span className="text-ghost">SCORE</span>
                  <span className={pool.healthScore < 20 ? 'text-blood' : pool.healthScore < 50 ? 'text-amber' : 'text-ice'}>
                    {pool.healthScore}/100
                  </span>
                </div>
                <div className="w-full h-1.5 bg-void rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${pool.healthScore < 20 ? 'bg-blood' : pool.healthScore < 50 ? 'bg-amber' : 'bg-ice'}`}
                    style={{ width: `${pool.healthScore}%` }}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end font-data text-ghost text-sm">
                {pool.priceGapPct.toFixed(1)}%
              </div>
              
              <div className="flex items-center justify-end font-data text-acid text-sm font-bold">
                ${pool.realProfitUsd.toFixed(2)}
              </div>

              <div className="flex items-center justify-end font-data text-bone text-sm">
                ${pool.tvlCurrent.toLocaleString()}
              </div>
              
              <div className="flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4].map(i => (
                  <div 
                    key={i} 
                    className={`w-2 h-2 rounded-full ${i <= pool.confidenceScore ? 'bg-bone' : 'bg-void border border-wire'}`}
                  />
                ))}
              </div>
              
              <div className="flex items-center justify-end">
                <span className="font-data text-acid text-xs opacity-0 group-hover:opacity-100 transition-opacity border border-acid px-3 py-1">
                  AUTOPSY →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
