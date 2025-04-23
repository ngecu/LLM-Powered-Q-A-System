'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [started, setStarted] = useState(false); // <--- new
  const searchHistory = ["What is GPT?", "Explain quantum computing", "Next.js vs Remix"];

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      
      {/* HEADER */}
      <header className="w-full px-6 py-4 bg-black text-white flex justify-between items-center shadow-md">
        {/* LEFT */}
        <h2 className="text-lg font-semibold">LLM QA</h2>

        {/* CENTER */}
        <div className="text-sm font-medium text-gray-300">
          SHOW (gpt-3.5-turbo)
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-500">
            <Image
              src="/profile.jpg"
              alt="Profile"
              width={32}
              height={32}
            />
          </div>
          <button className="text-2xl hover:text-gray-400">⋮</button>
        </div>
      </header>

      <div className="grid grid-cols-[auto_1fr] h-full">
        
        {/* SIDEBAR */}
        <aside className={`bg-[#1e1e1e] text-white px-4 py-6 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}>
          <h3 className="text-sm font-medium mb-4">Search History</h3>
          <ul className="space-y-2 text-xs">
            {searchHistory.map((item, idx) => (
              <li key={idx} className="truncate hover:underline cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </aside>

        {/* MAIN CONTENT AREA */}
        <div className="p-8 sm:p-20 grid grid-rows-[auto_1fr_auto] gap-16">
          
          {/* CONDITIONAL: Search Bar or Welcome Section */}
          {started ? (
            // SEARCH BAR
            <div className="flex items-center gap-2 bg-[#2b2b2b] text-white rounded-full px-4 py-2 w-full max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Ask anything"
                className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
              />
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-700">+</button>
                <button className="flex items-center gap-1 text-xs border border-gray-600 rounded-full px-3 py-1 hover:bg-gray-700">🌐 Search</button>
                <button className="flex items-center gap-1 text-xs border border-gray-600 rounded-full px-3 py-1 hover:bg-gray-700">📍 Reason</button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-700">⋯</button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-700">🎤</button>
                <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
                  <div className="flex flex-col items-center justify-center gap-[2px]">
                    <div className="w-2 h-0.5 bg-black"></div>
                    <div className="w-2 h-0.5 bg-black"></div>
                    <div className="w-2 h-0.5 bg-black"></div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            // WELCOME SECTION
            <main className="flex flex-col gap-8 row-start-2 items-center justify-center text-center">
              <h1 className="text-[32px] sm:text-[48px] font-bold">
                Welcome to <span className="text-[var(--geist-foreground)]">LLM Powered QA System</span>
              </h1>

              <button
                onClick={() => setStarted(true)}
                className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
              >
                Get Started
              </button>
            </main>
          )}

          {/* FOOTER */}
          {!started && (
            <footer className="flex gap-[24px] flex-wrap items-center justify-center">
              <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                By Robinson Ngecu
              </a>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
