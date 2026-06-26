import ChatWidget from "../components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        Chidakara Lead Qualification Agent
      </h1>

      <p className="text-gray-400 text-lg">
        AI-powered lead qualification for modern businesses.
      </p>

      <ChatWidget />
    </main>
  );
}