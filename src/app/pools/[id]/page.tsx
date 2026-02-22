import { mockPools } from "@/lib/pools";
import { notFound } from "next/navigation";
import PoolAutopsy from "@/components/PoolAutopsy";
import DecayForecast from "@/components/DecayForecast";
import Link from "next/link";
import Header from "@/components/Header";

export default async function PoolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pool = mockPools.find(p => p.id === id);

  if (!pool) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Link href="/pools" className="font-data text-ghost text-xs uppercase tracking-[2px] hover:text-acid transition-colors mb-4 inline-block">
            ← BACK TO RADAR
          </Link>
          <h1 className="font-display text-bone text-4xl tracking-[4px] mb-2 flex items-center gap-4">
            {pool.pair}
            <span className={`text-sm px-3 py-1 border ${pool.status === 'dead' ? 'border-blood text-blood' : pool.status === 'dying' ? 'border-amber text-amber' : 'border-ice text-ice'}`}>
              {pool.status.toUpperCase()}
            </span>
          </h1>
          <p className="font-data text-ghost text-sm uppercase tracking-[2px]">DEX: {pool.dex} | ID: {pool.id}</p>
        </div>
        
        <Link href="/simulate" className="border border-acid text-acid px-6 py-3 font-data text-sm uppercase tracking-[2px] hover:bg-acid/10 transition-colors">
          SIMULATE TRADE →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        <div className="flex flex-col border border-wire bg-carbon">
          <PoolAutopsy pool={pool} />
        </div>
        <div className="flex flex-col border border-wire bg-carbon">
          <DecayForecast pool={pool} />
        </div>
      </div>
    </div>
    </div>
  );
}
