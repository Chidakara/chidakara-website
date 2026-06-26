"use client";

import { useState } from "react";
import { questions } from "../lib/questions";

export default function ChatWindow() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  const handleNext = () => {
    if (!answer.trim()) return;

    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Lead qualification complete.");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <p className="text-white text-lg">
          {questions[currentQuestion].question}
        </p>
      </div>

      <div className="mt-auto">
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer..."
          className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
        />

        <button
          onClick={handleNext}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}