"use client";

import Header from "@/components/Header";
import { ArrowRight } from "lucide-react";

export default function LearnPage() {
  const lessons = [
    {
      id: "01",
      title: "What is a Liquidity Pool?",
      content: "Think of a liquidity pool like a currency exchange shop at an airport. Instead of a person behind the counter, it's a smart contract holding two types of tokens. When you trade, you put one token in and take the other out.",
    },
    {
      id: "02",
      title: "Why Do Pools Die?",
      content: "Imagine an abandoned shop. The owners left, but the money is still inside. When a project fails or developers leave, the liquidity pool remains on the blockchain. The prices inside become disconnected from the real world.",
    },
    {
      id: "03",
      title: "What is Price Slippage?",
      content: "If you try to scoop water from a small bucket with a giant cup, you'll spill a lot. Slippage happens when your trade is too big for the pool. The price changes against you while your trade is happening.",
    },
    {
      id: "04",
      title: "How Bots Make Money",
      content: "Bots are like fast runners who see you walking to the exchange shop. They run ahead, buy the cheap tokens, and sell them back to you at a higher price. This is called MEV (Maximal Extractable Value).",
    },
    {
      id: "05",
      title: "Reading the Health Score",
      content: "Our SLEI index is a traffic light. Green means the pool is active and safe. Yellow means it's dying—proceed with caution. Red means it's dead, and only experienced traders should attempt to extract value.",
    },
    {
      id: "06",
      title: "Your First Trade — Step by Step",
      content: "Start small. Find a 'weak' pool (green/yellow), use the profit simulator to check slippage, and set your slippage tolerance low. If the trade fails, you only lose the network fee, not your capital.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 p-8 md:p-16 max-w-7xl mx-auto w-full animate-fade-up">
        <div className="mb-16">
          <h1 className="font-display text-bone text-4xl tracking-[4px] mb-4">LEARN CENTER</h1>
          <p className="font-editorial text-ghost text-xl italic max-w-2xl leading-relaxed">
            Master the mechanics of dead pool arbitrage. Understand the risks, read the signals, and learn how to extract trapped capital safely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <div 
              key={lesson.id} 
              className="bg-carbon border border-wire p-8 flex flex-col hover:border-acid transition-colors group relative overflow-hidden"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="absolute -top-4 -right-4 font-display text-[120px] text-void opacity-50 group-hover:text-acid/10 transition-colors select-none pointer-events-none">
                {lesson.id}
              </div>
              
              <span className="font-display text-acid text-4xl mb-6 relative z-10">{lesson.id}</span>
              <h2 className="font-display text-bone text-lg tracking-[2px] mb-4 relative z-10">{lesson.title}</h2>
              <p className="font-editorial text-bone text-[15px] leading-[1.8] mb-8 flex-1 relative z-10">
                {lesson.content}
              </p>
              
              <button className="flex items-center gap-2 font-data text-xs text-acid uppercase tracking-[2px] group-hover:translate-x-2 transition-transform w-fit relative z-10">
                Start Lesson <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
