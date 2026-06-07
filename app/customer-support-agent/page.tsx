"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function CustomerSupportAgentPage() {
  const [messages, setMessages] = useState([
    {
      sender: "agent",
      text: "Hello, I'm the Chidakara Customer Support Agent. How can I assist you today?",
    },
  ]);
  
  const handleQuestion = (question: string) => {
    let response = "";

    switch (question) {
      case "Where is my order?":
        response =
          "I can help locate your order. Please provide your Order ID and Email Address.";
        break;

      case "What services do you offer?":
        response =
          "Chidakara provides AI Assistants, Workflow Automation, AI Dashboards, Custom AI Systems, and Business Intelligence Solutions.";
        break;

      case "Pricing Information":
        response =
          "Pricing depends on project scope, integrations, complexity, and deployment requirements. Contact us for a consultation.";
        break;

      case "Technical Support":
        response =
          "Please describe the issue. If required, a support ticket can be created and escalated.";
        break;

      case "Create Support Ticket":
        response =
          "Ticket Created Successfully.\n\nTicket ID: CHI-2026-001\nPriority: Medium\nStatus: Open";
        break;
      case "Schedule Consultation":
  response =
    "Consultation request generated. Continue through the contact portal.";
  break;
      default:
        response = "How can I help you today?";
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "agent", text: response },
    ]);
  };

 const actions = [
  "Where is my order?",
  "What services do you offer?",
  "Pricing Information",
  "Technical Support",
  "Create Support Ticket",
  "Schedule Consultation",
];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-black px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="mb-16 text-center">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-cyan-400">
              AI AGENT DEMONSTRATION
            </p>

            <h1 className="text-5xl font-semibold md:text-7xl">
              Customer Support Agent
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-400">
              AI-powered support assistant for handling customer inquiries,
              FAQs, and ticket management.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr_320px]">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="mb-6 text-xl font-semibold">
                Quick Actions
              </h3>

              <div className="space-y-3">
                {actions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuestion(action)}
                    className="w-full rounded-2xl border border-white/10 p-4 text-left transition hover:border-blue-500"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="space-y-4">

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`max-w-[80%] rounded-2xl p-4 whitespace-pre-line ${
                      message.sender === "user"
                        ? "ml-auto bg-blue-600"
                        : "bg-white/5"
                    }`}
                  >
                    {message.text}
                  </div>
                ))}

              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

  <h3 className="mb-6 text-xl font-semibold">
    AI Support Analytics
  </h3>

  <div className="space-y-6">

    <div>
      <p className="text-sm text-gray-500">Resolution Rate</p>
      <p className="mt-2 text-3xl font-bold text-green-400">96%</p>
    </div>

    <div>
      <p className="text-sm text-gray-500">Avg Response Time</p>
      <p className="mt-2 text-3xl font-bold text-cyan-400">12 Sec</p>
    </div>

    <div>
      <p className="text-sm text-gray-500">Tickets Processed</p>
      <p className="mt-2 text-3xl font-bold text-blue-400">4,812</p>
    </div>

    <div>
      <p className="text-sm text-gray-500">AI Confidence</p>
      <p className="mt-2 text-3xl font-bold text-purple-400">98.7%</p>
    </div>

  </div>

</div>

          </div>
        </div>
      </main>
    </>
  );
}