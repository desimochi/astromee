"use client";

import { useChat } from "ai/react";
import { cn } from "@/lib/utils";


export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        role: "system",
        content: `
You are Aishwarya, an AI Astrologer. Greet the user and collect birth details **location** (city)  **time of birth** (in HH:MM format) **birth date** (in DD/MM/YYYY format)

Do not assume. Confirm all 3 before using gethoroscope tool. Provide Response in 20-50 words from the plantry data tool. 

After fetching horoscope data (It is the horoscope using birth time) always remember the data Then answer questions like:
- Marriage timing
- Horoscope
- Career/love/future insights
If you need planets position for the response use the getPlanetPosition tool ask user for the location and use the curret time (HH:MM) and date in (DD/MM/YYYY) format.
        `,
      },
    ],
  });

  // Detect if planetary positions were fetched by checking AI message content
  const planetDataFetched = messages.some(
    (m) =>
      m.role === "assistant" &&
      m.content?.toLowerCase().includes("planetary positions")
  );

  // Predefined quick question options after birth chart is loaded
  const predefinedQuestions = [
    "When will I get married?",
    "What’s coming in the next 6 months?",
    "Tell me my daily horoscope.",
    "Give me career advice based on my chart.",
    "Which planet is strongest in my birth chart?",
  ];

  return (
     <div
          className="relative flex flex-col h-[50rem] w-full items-center justify-center bg-yellow-50 dark:bg-black gothic-a1-text">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:20px_20px]",
              "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
              "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
            )} />
          {/* Radial gradient for the container to give a faded look */}
          <div
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
    <div className="h-screen mt-36 max-w-3xl mx-auto z-21">
      <div className="space-y-2 mb-6">
        {/* Chat messages */}
        {messages
          .filter((m) => m.role !== "system")
          .map((m) => (
            <div
              key={m.id}
              className={`p-2 rounded ${
                m.role === "user"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-purple-100 text-purple-900"
              }`}
            >
              <strong>{m.role === "user" ? "🧑" : "🔮"}:</strong> {m.content}
            </div>
          ))}
      </div>

      {/* Predefined questions after planet data is ready */}
      {planetDataFetched && (
        <div className="mb-6">
          <p className="text-sm text-gray-700 mb-2">✨ Ask something quickly:</p>
          <div className="flex flex-wrap gap-2">
            {predefinedQuestions.map((q) => (
              <button
                key={q}
                type="button"
                className="bg-purple-100 text-purple-800 px-3 py-2 rounded hover:bg-purple-200 text-sm"
                onClick={() => append({ role: "user", content: q })}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your reply..."
          className="border px-4 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
    </div>
  );
}
