"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Bot, AlertTriangle } from "lucide-react";

export default function SimulatePage() {
  const [amount, setAmount] = useState(1000);
  const [expertMode, setExpertMode] = useState(false);

  // Mock calculations
  const grossProfit = amount * 0.045; // 4.5% gap
  const slippage = amount * 0.012; // 1.2% slippage
  const poolFees = amount * 0.003; // 0.3% fee
  const priorityFee = 0.5; // $0.50 fixed
  const netProfit = grossProfit - slippage - poolFees - priorityFee;
  const isProfitable = netProfit > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-2xl bg-carbon border border-wire p-8 animate-fade-up">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-display text-bone text-2xl tracking-[2px]">PROFIT SIMULATOR</h1>
            <label className="flex items-center gap-2 cursor-pointer group">
              <span className="font-data text-[10px] text-ghost group-hover:text-bone transition-colors">
                EXPERT MODE
              </span>
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={expertMode}
                  onChange={() => setExpertMode(!expertMode)}
                />
                <div className={`block w-8 h-4 rounded-full transition-colors ${expertMode ? 'bg-acid' : 'bg-wire'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-void w-2 h-2 rounded-full transition-transform ${expertMode ? 'transform translate-x-4' : ''}`}></div>
              </div>
            </label>
          </div>

          <div className="mb-8 p-4 border border-amber bg-amber/5 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <p className="font-data text-amber text-xs leading-relaxed">
              Remember: This is a simulation. Real trading involves real risk. The profit shown is an estimate, not a guarantee. Bots may execute faster than you.
            </p>
          </div>

          <div className="mb-12">
            <label className="block font-data text-bone text-sm mb-4">
              How much do you want to trade? <span className="text-acid">${amount.toLocaleString()}</span>
            </label>
            <input 
              type="range" 
              min="100" 
              max="10000" 
              step="100"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-void rounded-full appearance-none cursor-pointer accent-acid"
            />
            <div className="flex justify-between mt-2 font-data text-[10px] text-ghost">
              <span>$100</span>
              <span>$10,000</span>
            </div>
          </div>

          {!expertMode ? (
            <div className="flex flex-col gap-6">
              <div className={`p-6 border ${isProfitable ? 'border-acid bg-acid/5' : 'border-blood bg-blood/5'}`}>
                <p className="font-editorial text-lg leading-relaxed">
                  If you trade <span className="font-data font-bold">${amount.toLocaleString()}</span> on this pool, you could make <span className={`font-data font-bold ${isProfitable ? 'text-acid' : 'text-blood'}`}>${netProfit.toFixed(2)}</span> after all fees. But there&apos;s a 40% chance bots beat you.
                </p>
              </div>
              
              <div className="flex gap-3 items-start p-4 bg-graphite border border-wire">
                <div className="w-8 h-8 rounded-full bg-bone text-void flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <p className="font-editorial text-[15px] text-bone leading-relaxed">
                  &quot;Think of slippage like spilling water while running with a bucket. The more money you trade (the bigger the bucket), the more you might spill before reaching the other side. Try lowering your trade size to see how it affects your profit!&quot;
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 font-data text-sm">
              <div className="flex justify-between py-2 border-b border-wire">
                <span className="text-ghost">Gross Arbitrage Gap (4.5%)</span>
                <span className="text-bone">${grossProfit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-wire">
                <span className="text-ghost">Estimated Slippage (1.2%)</span>
                <span className="text-blood">-${slippage.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-wire">
                <span className="text-ghost">Pool Swap Fees (0.3%)</span>
                <span className="text-blood">-${poolFees.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-wire">
                <span className="text-ghost">Priority Network Fee</span>
                <span className="text-blood">-${priorityFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-4 mt-2">
                <span className="text-bone font-bold">Net Estimated Profit</span>
                <span className={`font-display text-xl ${isProfitable ? 'text-acid' : 'text-blood'}`}>
                  ${netProfit.toFixed(2)}
                </span>
              </div>
              
              <div className="mt-8 p-4 border border-wire bg-graphite">
                <h3 className="text-acid text-xs tracking-[2px] mb-4 uppercase">Slippage Curve</h3>
                <div className="h-32 w-full relative">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <path 
                      d="M0,100 Q50,90 100,0" 
                      fill="none" 
                      stroke="var(--blood)" 
                      strokeWidth="2"
                    />
                    <line x1="0" y1="100" x2="100" y2="100" stroke="var(--wire)" strokeWidth="1" />
                    <line x1="0" y1="0" x2="0" y2="100" stroke="var(--wire)" strokeWidth="1" />
                  </svg>
                  <div className="absolute bottom-0 left-0 w-full flex justify-between text-[9px] text-ghost mt-2">
                    <span>Trade Size</span>
                    <span>Slippage %</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
