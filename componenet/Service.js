// components/AstrologyPrediction.tsx
import Image from "next/image";

const zodiacSigns = [
  { name: "Aries", icon: "/aries.png" },
  { name: "Taurus", icon: "/taurus.png" },
  { name: "Gemini", icon: "/gemini.png" },
  { name: "Cancer", icon: "/cancer.png" },
  { name: "Leo", icon: "/leo.png" },
  { name: "Virgo", icon: "/virgo.png" },
  { name: "Libra", icon: "/libra.png" },
  { name: "Scorpio", icon: "/scorpio.png" },
  { name: "Sagittarius", icon: "/sagittarius.png" },
  { name: "Capricorn", icon: "/capricorn.png" },
  { name: "Aquarius", icon: "/aquarius.png" },
  { name: "Pisces", icon: "/pisces.png" },
];

export default function AstrologyPrediction() {
  return (
    <section className="text-center py-8">
      <h2 className="text-3xl font-bold mb-2 mt-6">Todays Astrology Prediction</h2>
      <div className="max-w-[240px] mx-auto mb-8">
        <hr className="border-t border-gray-900 border-dotted" />
    </div>
      <div className="grid grid-cols-2 mt-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-2 gap-x-4 px-4 max-w-6xl mx-auto">
        {zodiacSigns.map((sign) => (
          <div key={sign.name} className="flex flex-col items-center hover:bg-yellow-200 p-8 transition-colors rounded-md hover:shadow-lg ">
            <Image
              src={sign.icon}
              alt={sign.name}
              width={48}
              height={48}
              className="mb-2"
            />
            <p className=" text-gray-700">{sign.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
