'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchHistory = ["What is GPT?", "Explain quantum computing", "Next.js vs Remix"];

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
  
    try {
      const res = await fetch('http://127.0.0.1:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }), // ✅ correct field
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.detail || 'Server Error');
      }
  
      const assistantMessage = { 
        role: 'assistant', 
        content: data.response, 
        type: 'success' // ✅ new type for coloring
      };
      setMessages((prev) => [...prev, assistantMessage]);
  
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages((prev) => [...prev, { 
        role: 'assistant', 
        content: err.message || "Something went wrong.", 
        type: 'error' // ✅ new type for coloring
      }]);
    } finally {
      setLoading(false);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen font-[family-name:var(--font-geist-sans)]">
      
      {/* HEADER */}
      <header className="w-full px-6 py-4 bg-black text-white flex justify-between items-center shadow-md">
        <h2 className="text-lg font-semibold">LLM QA</h2>
        <div className="text-sm font-medium text-gray-300">gpt-3.5-turbo</div>
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

      <div className="flex flex-col justify-between items-center w-full p-8 sm:p-20">
  
  {/* MAIN CONTENT */}
  <div className="flex-1 flex flex-col items-center justify-center w-full gap-8">
    {started ? (
      <>
        {/* CHAT MESSAGES */}
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-250px)] w-full">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`
                max-w-[80%] px-4 py-2 rounded-lg text-sm
                ${msg.role === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : msg.type === 'error'
                    ? 'bg-red-500 text-white self-start'
                    : 'bg-gray-700 text-white self-start'}
              `}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="text-gray-400 text-sm self-start animate-pulse">
              Assistant is typing...
            </div>
          )}
        </div>

        {/* INPUT AREA */}
        <div style={{ height: '10vh' }} className="flex items-center gap-2 bg-[#2b2b2b] text-white rounded-full px-4 py-2 w-full">
          <input
            type="text"
            placeholder="Ask anything"
            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-700"
            onClick={handleSend}
            disabled={loading}
          >
            ➤
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-700">+</button>
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
      </>
    ) : (
      <main className="flex flex-col gap-8 items-center justify-center text-center">
        <h1 className="text-[32px] sm:text-[48px] font-bold">
          Welcome to <span className="text-[var(--geist-foreground)]">LLM Powered QA System</span>
        </h1>
        <button
          onClick={() => setStarted(true)}
          className="cursor-pointer px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </main>
    )}
  </div>

  {/* FOOTER */}
  {!started && (
    <footer className="flex gap-6 flex-wrap items-center justify-center mt-8">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://ngecu.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
      >
        By Robinson Ngecu
      </a>
    </footer>
  )}
</div>

    </div>
  );
}
