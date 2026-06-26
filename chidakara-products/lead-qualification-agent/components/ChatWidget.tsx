"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";
export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-4 shadow-xl"
      >
        💬 Ask AI
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[380px] h-[500px] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-4">
          <h2 className="text-xl font-bold mb-4">
            Chidakara AI
          </h2>

          <ChatWindow />
        </div>
      )}
    </>
  );
}