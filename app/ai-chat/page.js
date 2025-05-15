"use client";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        role: "system",
        content: `
You are Aishwarya an AI Astrologer. Greet use and ask first question Start by collecting the user's birth details step-by-step: 
1. Ask for birth **location** (city)
2. Then ask for **time of birth** (in HH:MM format)
3. Then ask for **birth date** (in DD/MM/YYYY format)

Once all inputs are collected, use the getPlanetPositions tool to fetch the planetary positions and answer their astrology questions.

Never assume default data. Confirm all 3 inputs before using the tool.
After fetching planetary data using the getPlanetPositions tool at birth time, always reply in 30–50 words with a brief astrological interpretation. Do not exceed 50 words. User can asked marriage, love, career, horoscope`,
      },
    ],
  });

  return (
    <div className="py-32 px-16 max-w-xl mx-auto">
     {messages
  .filter((m) => m.role !== "system")
  .map((m) => (
    <div key={m.id} className="mb-2">
      <strong>{m.role === "user" ? "🧑" : "🔮"}:</strong> {m.content}
    </div>
))}

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your reply..."
          className="border px-4 py-2 rounded w-full"
        />
        <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
