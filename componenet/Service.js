// components/AstrologyPrediction.tsx
import Image from "next/image";
import Link from "next/link";

const zodiacSigns = [
  { name: "Aries", icon: "/image/zodiac/arise-01.png" },
  { name: "Taurus", icon: "/image/zodiac/Taurus-01.png" },
  { name: "Gemini", icon: "/image/zodiac/Gemini-01.png" },
  { name: "Cancer", icon: "/image/zodiac/Cencer-01.png" },
  { name: "Leo", icon: "/image/zodiac/Leo-01.png" },
  { name: "Virgo", icon: "/image/zodiac/Virgo-01.png" },
  { name: "Libra", icon: "/image/zodiac/Libra-01.png" },
  { name: "Scorpio", icon: "/image/zodiac/Scorpio-01.png" },
  { name: "Sagittarius", icon: "/image/zodiac/Sagitarius-01.png" },
  { name: "Capricorn", icon: "/image/zodiac/Capricorn-01.png" },
  { name: "Aquarius", icon: "/image/zodiac/Aquarius-01.png" },
  { name: "Pisces", icon: "/image/zodiac/Pisces-01.png" },
];

export default function AstrologyPrediction() {
  return (
    <section className="max-w-7xl mx-auto py-16 gothic-a1-text">
      <div className="px-12 flex justify-between items-center">
<h2 className="text-5xl font-bold mb-2 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent">Today Horoscope</h2>
      <Link href={"/horoscope/daily-horoscope"} className="bg-yellow-700 text-yellow-100 px-12 py-2 rounded-full transition-colors">Read All</Link>
      </div>
      <div className="mx-12 mb-8">
        <hr className="border-t-2 mt-8 border-yellow-900 border-dotted" />
        
    </div>
      <div className="grid grid-cols-2 mt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-2 gap-x-2 px-4 max-w-7xl mx-auto">
        {zodiacSigns.map((sign) => (
          <div key={sign.name} className="flex flex-col items-center p-6 transition-colors rounded-md cursor-pointer">
            <Image
              src={sign.icon}
              alt={sign.name}
              width={112}
              height={112}
              className="mb-2 hover:scale-110 transition-transform "
            />
            <p className=" text-gray-800 text-lg font-bold">{sign.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
