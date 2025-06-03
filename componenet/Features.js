import { cn } from "@/lib/utils";
import { BinaryIcon, BotMessageSquareIcon, CalendarRangeIcon, FlameIcon, HandIcon, HeartHandshakeIcon, MessageSquare, PaintBucket, PaletteIcon, ScanHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function DotBackgroundDemo() {
  const features = [
    { icon: <BotMessageSquareIcon className="h-18 w-18 hover:scale-110 hover:rotate-12 transition-transform" strokeWidth={1.5}/>, title: "Chat With AI Astrologer", link:"/ai-chat" },
    { icon: <BinaryIcon className="h-18 w-18 hover:scale-110 hover:rotate-12 transition-transform" strokeWidth={1.5}/>, title: "Numerology", link:"/numerology" },
    { icon: <CalendarRangeIcon className="h-18 w-18 hover:scale-110 hover:rotate-12 transition-transform" strokeWidth={1.5}/>, title: "Daily Horoscope", link:"/horoscope/daily-horoscope" },
    { icon: <FlameIcon className="h-18 w-18 hover:scale-110 hover:rotate-12 transition-transform" strokeWidth={1.5}/>, title: "Flame Calculator", link:"/flame-calculator" },
    { icon: <PaletteIcon className="h-18 w-18 hover:scale-110 hover:rotate-12 transition-transform" strokeWidth={1.5}/>, title: "Lucky Color Finder", link:"/lucky-color" },   
    { icon: <Image src={"/birth-charts.png"} height={70} width={70} alt="birth chart" className="hover:rotate-12 transition-transform" />, title: "Birth Chart", link:"/birth-chart" },
    { icon: <ScanHeart className="h-18 w-18 hover:scale-110 hover:rotate-12 transition-transform" strokeWidth={1.5}/>, title: "Match Checker", link:"/match-checker" },
    { icon: <HandIcon className="h-18 w-18 hover:scale-110 hover:rotate-12 transition-transform" strokeWidth={1.5}/>, title: "Palm Scanner", link:"/palm-reader" },
  ];
  return (
    <div
      className="relative flex flex-col h-fit w-full py-12 items-center justify-center bg-yellow-50 dark:bg-black gothic-a1-text">
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
        <div className="inline-block px-4 py-2 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm mt-12">
           <span className="text-black">Most Trusted Astrology Website!</span>
          </div>
        <h1 className="relative z-20 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-4xl font-bold text-transparent sm:text-7xl">
        Astrology For Mee
      </h1>
      <p className="mt-2 text-lg text-gray-6=700 p-2  gothic-a1-text">



          Unlock the mysteries of your future with AI astrology—where science meets the stars.
          </p>
   <section className="relative max-w-7xl mx-auto px-4 py-12">
      {/* Dotted Background Layer */}
      <div className="absolute inset-0 "/>
    
      {/* Foreground Content */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {features.map((item, idx) => {
          const isFirstCol = idx % 5 === 0;
          const isLastCol = (idx + 1) % 5 === 0;

          return (
            <Link
              href={item.link}
              key={idx}
              className={`p-6 border-yellow-600 border-dashed text-center flex flex-col justify-center items-center cursor-pointer
                ${!isFirstCol ? 'border-l' : ''} 
                ${idx < 5 ? 'border-b' : ''} 
                ${!isLastCol ? 'border-r' : ''}`}
            >
              <div className="text-7xl mb-4 text-yellow-700 ">{item.icon}</div>
              <h3 className=" font-semibold mb-2">{item.title}</h3>
            </Link>
          );
        })}
      </div>
    </section>
    </div>
  );
}


