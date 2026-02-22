"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Send, Bot, User } from "lucide-react";

export default function TradingTutor() {
  const { messages, input, handleInputChange, handleSubmit, append } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content: "Welcome to GraveYard Intelligence. I'm your trading tutor. This platform finds forgotten Solana pools where capital is trapped. Let me explain how to use it...",
      },
    ],
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickActions = [
    "What is a dead pool?",
    "How do I make profit?",
    "Explain the SLEI index",
    "Is this safe for beginners?",
    "What does the health score mean?",
  ];

  return (
    <div className="flex flex-col h-full bg-carbon animate-fade-up" style={{ animationDelay: "0.48s" }}>
      <div className="p-4 border-b border-wire flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-ice animate-pulse glow-ice"></div>
        <h2 className="font-data text-ice text-sm tracking-[2px]">// TRADING TUTOR</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 max-w-[85%] animate-chat-message ${
              m.role === "user" ? "ml-auto flex-row-reverse" : ""
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              m.role === "user" ? "bg-wire text-bone" : "bg-bone text-void"
            }`}>
              {m.role === "user" ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
            </div>
            <div
              className={`p-3 rounded-sm ${
                m.role === "user"
                  ? "bg-wire text-bone font-data text-xs"
                  : "bg-bone text-void font-editorial text-[15px] leading-relaxed"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-wire bg-graphite">
        <div className="flex flex-wrap gap-2 mb-4">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => append({ role: "user", content: action })}
              className="font-data text-[9px] text-acid border border-acid rounded-full px-3 py-1 hover-lift transition-all hover:bg-acid/10"
            >
              {action}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
            className="w-full bg-void border border-wire text-bone font-data text-xs p-3 pr-10 focus:outline-none focus:border-acid focus:glow-acid transition-all rounded-sm"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-ghost hover:text-acid transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
