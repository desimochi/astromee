"use client";

import { useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { BotMessageSquareIcon, User2Icon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import LocationSearch from "@/componenet/GeoLocation/LocationSearch";

export default function Chat() {
  const [formData, setFormData] = useState({
  name: "",
  dob: "",
  tob: "",
  location: "",
});
const [formSubmitted, setFormSubmitted] = useState(false);

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};
const messagesContainerRef = useRef(null);

  const mes = "Hi I am Aishwarya! Your Astrology Expert Kindly Enter Your Name"
  const [show , setShow] = useState(true)
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        role: "system",
        content: `
You are Aishwarya, an expert Astrologer. user will provide you birth details **location**  **time of birth** (in HH:MM format) **birth date** (in DD/MM/YYYY format)

Do not assume. Confirm all 3 before using gethoroscope tool. Provide Response in 20-50 words from the plantry data tool. 

After fetching horoscope data (It is the horoscope using birth time) Thank user that they can ask question always remember the data Then answer questions like:
- Marriage timing Note: Never Say
- Horoscope
- Career/love/future insights
Give the result in an astrologer way use the astrology terms so you look more authentic 
If you need planets position for the response use the getPlanetPosition tool with the birth details **location**  **time of birth** (in HH:MM format) **birth date** (in DD/MM/YYYY format) provided by user earlier  dont ask them again.
Always use the information provided to you for generating result never tell that you need to consult professional astrolgoer or someone else as you are one guiding them based on therir horoscope and planet position.
Never answer Anything out of astrology is someone ask reject them in witty way.
Note Skip this suggestion from horscope - **Two marriages may be indicated** Never give result based on this
Somehow you fail to call tool or fetch data from tool try one more time and if fail again say user there has been some technical issues please try later

        `,
      },
    ],
  });
const handleFormSubmit = (e) => {
  e.preventDefault();
  const [yyyy, mm, dd] = formData.dob.split("-");
  const formattedDob = `${dd}/${mm}/${yyyy}`;
  const message = `Here are my details: Name - ${formData.name}, Date of Birth - ${formattedDob}, Birth Time - ${formData.tob}, Location - ${formData.location}`;
  append({ role: "user", content: message });
  setFormSubmitted(true);
  setShow(false);
};
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
  const handleLocationSelect = (selectedLocation) => {
  setFormData((prev) => ({
    ...prev,
    location: selectedLocation.label,
  }));
};
useEffect(() => {
  const container = messagesContainerRef.current;
  if (container) {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 0); // or 50ms if needed
  }
}, [messages]);
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
      
        <div className="bg-white p-4 border px-8 rounded-t-md mt-20 gothic-a1-text">
          <div className="flex gap-3">
            <div className="bg-yellow-700 flex items-center p-3 rounded-full shadow-2xl">
              <BotMessageSquareIcon className="h-8 w-8 text-yellow-100" />
            </div>
            <div>
              
<h2 className="bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-2xl font-bold text-transparent">Aishwarya</h2>
          <p className="text-gray-700 text-sm">Your Personalised AI Astrologer to answer all your questions</p>
            </div>
          </div>
          {planetDataFetched && (
          <div className="bg-white dark:bg-black px-4 py-4 mt-4 border-t w-full text-xs translate transform ">
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
        </div>
        
<div className="relative flex-1 h-80 overflow-y-auto p-4 flex flex-col gap-3 border dark:bg-black text-sm gothic-a1-text">
        {/* Chat messages */}
        <div ref={messagesContainerRef}
 className=" flex-1 overflow-y-scroll p-4 flex flex-col gap-3 dark:bg-black text-sm gothic-a1-text bottom-0">
          {show && !formSubmitted && (
  <div className="flex w-full justify-start">
    <div className="max-w-[75%] px-4 py-2 rounded shadow bg-white text-gray-800 rounded-br-none">
      <strong className="block mb-1 text-sm">
        <span className="flex gap-2">
          <BotMessageSquareIcon className="h-5 w-5" /> Aishwarya
        </span>
      </strong>
      Hi I am Aishwarya! Your Astrology Expert. Kindly enter your birth details below:
      <form onSubmit={handleFormSubmit} className="mt-3 space-y-2">
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleFormChange}
          className="w-full border px-3 py-2 rounded text-sm"
          required
        />
        <input
          name="dob"
          type="date"
          placeholder="Date of Birth (DD/MM/YYYY)"
          value={formData.dob}
          onChange={handleFormChange}
          className="w-full border px-3 py-2 rounded text-sm"
          
        />
        <input
          name="tob"
          type="time"
          placeholder="Time of Birth (HH:MM)"
          value={formData.tob}
          onChange={handleFormChange}
          className="w-full border px-3 py-2 rounded text-sm"
          required
        />
       <LocationSearch onSelect={handleLocationSelect}/>
        <button
          type="submit"
          className="bg-yellow-700 text-white px-4 py-2 rounded text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
)}

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
            isLoading ? <div className="flex w-full justify-start">
    <div className=" px-4 py-2 rounded text-gray-800">
      <strong className="block mb-1 text-sm">
        <span className="flex gap-2">
          <BotMessageSquareIcon className="h-5 w-5 animate-pulse" /> Aishwarya
        </span>
      </strong>
      <span className="typing-dots">Typing<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></span>
    </div>
  </div> :
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
        
</div>
        {/* Quick questions */}
        

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
          // disabled={!formSubmitted}
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
