"use client";

import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { BotMessageSquareIcon, User2Icon } from "lucide-react";
import { useState } from "react";

export default function Chat() {
  const mes = "Hi I am Aishwarya! Your Astrology Expert Kindly Enter Your Name"
  const [show , setShow] = useState(true)
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
You are Aishwarya, an AI Astrologer. user will provide you birth details **location** (city)  **time of birth** (in HH:MM format) **birth date** (in DD/MM/YYYY format)

Do not assume. Confirm all 3 before using gethoroscope tool. Provide Response in 20-50 words from the plantry data tool. 

After fetching horoscope data (It is the horoscope using birth time) tell user that they can ask question always remember the data Then answer questions like:
- Marriage timing
- Horoscope
- Career/love/future insights
If you need planets position for the response use the getPlanetPosition tool ask user for the location and use the curret time (HH:MM) and date in (DD/MM/YYYY) format.
        `,
      },
    ],
  });

  const planetDataFetched = messages.some(
    (m) =>
      m.role === "assistant" &&
      m.content?.toLowerCase().includes("thank")
  );

  const predefinedQuestions = [
    "When will I get married?",
    "What’s coming in the next 6 months?",
    "Tell me my daily horoscope.",
    "Give me career advice based on my chart.",
    "Which planet is strongest in my birth chart?",
  ];

  return (
    <div className="relative flex flex-col h-screen w-full items-center bg-yellow-50 dark:bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col h-full">
        {/* Header */}
        <div className="bg-yellow-100 p-4 px-8 rounded-t-md mt-20 gothic-a1-text">
          <div className="flex gap-3">
            <div className="bg-yellow-700 flex items-center p-3 rounded-full shadow-2xl">
              <BotMessageSquareIcon className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
<h2 className="bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-2xl font-bold text-transparent">Aishwarya</h2>
          <p className="text-gray-700 text-sm">Your Personalised AI Astrologer to answer all your questions</p>
            </div>
          </div>
          
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 border dark:bg-black text-sm gothic-a1-text">
          {show && <div className="flex w-full justify-start ">
            <div className="max-w-[75%] px-4 py-2 rounded shadow bg-white text-gray-800 rounded-br-none">
              <strong className="block mb-1 text-sm">
              <span className="flex gap-2">
              <BotMessageSquareIcon className="h-5 w-5" /> Aishwarya
            </span>
            </strong>
            {mes}
            </div>
            </div>}
       {messages
  .filter((m) => m.role !== "system")
  .map((m) => (
    <div
      key={m.id}
      className={cn(
        "flex w-full", // Full width flex container
        m.role === "user" ? "justify-end" : "justify-start" // Align user to left, assistant to right
      )}
    >
      <div
        className={cn(
          "max-w-[75%] px-4 py-2 rounded shadow mb-3",
          m.role === "user"
            ? "bg-white text-gray-800 rounded-br-none"
            : "bg-white text-gray-900 rounded-lr-none"
        )}
      >
        <strong className="block mb-1 text-sm">
          {m.role === "user" ? (
            <span className="flex gap-2">
              <User2Icon className="h-5 w-5" /> You
            </span>
          ) : (
            <span className="flex gap-2">
              <BotMessageSquareIcon className="h-5 w-5" /> Aishwarya
            </span>
          )}
        </strong>
        {m.content}
      </div>
    </div>
))}

        </div>

        {/* Quick questions */}
        {planetDataFetched && (
          <div className="bg-white dark:bg-black px-4 py-2 border-t">
            <p className="text-sm text-gray-700 mb-2 dark:text-gray-300">
              ✨ Ask something quickly:
            </p>
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

        {/* Input box */}
        <form
          onSubmit={handleSubmit}
          className="sticky bottom-0 w-full bg-white dark:bg-black border-t flex gap-2 py-3"
        >
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1 border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="bg-yellow-700 text-white px-12 py-2 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
