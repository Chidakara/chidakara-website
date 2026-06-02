"use client";

import { useState } from "react";

const demoResponses = [
  "Analyzing enterprise workflow architecture...",
  "AI automation pipeline generated successfully.",
  "Predictive analytics report initialized.",
  "Workflow optimization recommendation ready.",
  "Enterprise intelligence system connected.",
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Chidakara AI Infrastructure Assistant. How can I help your business today?",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const aiMessage = {
      role: "assistant",
      content:
        demoResponses[
          Math.floor(Math.random() * demoResponses.length)
        ],
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);

    setInput("");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-black px-6 py-24 text-white">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      {/* HEADER */}

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.4em] text-blue-500">
          AI ENTERPRISE ASSISTANT
        </p>

        <h1 className="mt-6 text-5xl font-bold md:text-7xl">
          Intelligent AI
          <span className="text-blue-500"> Interaction</span>
        </h1>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-400">
          Experience enterprise-grade conversational AI designed for
          automation, infrastructure intelligence, predictive systems,
          and operational workflows.
        </p>

      </div>

      {/* CHAT CONTAINER */}

      <div className="relative z-10 mx-auto mt-20 max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

        {/* CHAT HEADER */}

        <div className="flex items-center justify-between border-b border-white/10 pb-6">

          <div>

            <h2 className="text-2xl font-semibold">
              Chidakara AI Core
            </h2>

            <p className="mt-2 text-sm text-gray-400">
              Enterprise Intelligence System
            </p>

          </div>

          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-500" />

            <p className="text-sm text-green-400">
              System Active
            </p>

          </div>

        </div>

        {/* CHAT MESSAGES */}

        <div className="mt-8 h-[500px] space-y-6 overflow-y-auto pr-2">

          {messages.map((message, index) => (

            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[80%] rounded-3xl px-6 py-4 text-sm leading-7 ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "border border-white/10 bg-white/[0.05] text-gray-300"
                }`}
              >

                {message.content}

              </div>

            </div>

          ))}

        </div>

        {/* INPUT */}

        <div className="mt-8 flex gap-4">

          <input
            type="text"
            placeholder="Ask about AI systems..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-white outline-none placeholder:text-gray-500"
          />

          <button
            onClick={handleSend}
            className="rounded-2xl bg-blue-600 px-8 py-4 font-medium transition-all duration-300 hover:bg-blue-500"
          >

            Send

          </button>

        </div>

      </div>

    </main>
  );
}