"use client";

import { useState } from "react";

export default function AIChat() {

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to Chidakara Intelligence Systems. How can we assist your business today?",
    },
  ]);

  const [input, setInput] = useState("");

const sendMessage = async () => {

  if (!input.trim()) return;

  const userMessage = {
    role: "user",
    content: input,
  };

  const updatedMessages = [
    ...messages,
    userMessage,
  ];

  setMessages(updatedMessages);

  setInput("");

  try {

    const response = await fetch("/api/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        messages: updatedMessages,
      }),

    });

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.message,
      },
    ]);

  } catch (error) {

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "AI systems are temporarily unavailable.",
      },
    ]);

  }

};


  return (

    <>

      {/* FLOATING BUTTON */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[100] flex h-16 w-16 items-center justify-center rounded-full border border-blue-500/30 bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-110"
      >

        <span className="text-2xl text-white">
          ✦
        </span>

      </button>

      {/* CHAT WINDOW */}

      {open && (

        <div className="fixed bottom-28 right-6 z-[100] flex h-[600px] w-[380px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-black/90 backdrop-blur-2xl">

          {/* HEADER */}

          <div className="border-b border-white/10 px-6 py-5">

            <h3 className="text-lg font-semibold text-white">
              Chidakara AI
            </h3>

            <p className="mt-1 text-sm text-gray-400">
              Enterprise Intelligence Assistant
            </p>

          </div>

          {/* MESSAGES */}

          <div className="flex-1 space-y-4 overflow-y-auto px-4 py-5">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "assistant"
                    ? "bg-white/5 text-gray-200"
                    : "ml-auto bg-blue-600 text-white"
                }`}
              >

                {msg.content}

              </div>

            ))}

          </div>

          {/* INPUT */}

          <div className="border-t border-white/10 p-4">

            <div className="flex gap-3">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about AI systems..."
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                onClick={sendMessage}
                className="rounded-full bg-blue-600 px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-blue-500"
              >

                Send

              </button>

            </div>

          </div>

        </div>

      )}

    </>

  );
}