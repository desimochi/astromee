// components/AstrologyServices.tsx
import Image from "next/image";

const services = [
  { name: "Match Making", image: "/match-making.jpg" },
  { name: "Panchang", image: "/panchang.jpg" },
  { name: "Tarot Reading", image: "/tarot-reading.jpg" },
  { name: "Kundli", image: "/kundli.webp" },
  { name: "Love", image: "/love.avif" },
  { name: "Numerology", image: "/numerology.avif" },
  { name: "Remedies", image: "/remedies.jpg" },
  { name: "Planet Transits", image: "/planet-transits.jpg" },
  { name: "Vastu", image: "/vastu.jpg" },
  { name: "Zodiac Signs", image: "/zodiac-signs.jpg" },
  { name: "Festivals", image: "/festivals.jpg" },
  { name: "Spirituality", image: "/spirituality.jpg" },
];

export default function AstrologyServices() {
  return (
    <section className="py-10 text-center">
      <h2 className="text-3xl font-bold mb-2 mt-6">Free Astrology Services</h2>
      <div className="max-w-[240px] mx-auto mb-8">
        <hr className="border-t border-gray-900 border-dotted" />
    </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 max-w-7xl mx-auto">
        {services.map((service) => (
          <div key={service.name} className="flex flex-col items-center">
            <div className="rounded-xl overflow-hidden w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 relative">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-3 font-semibold text-md">{service.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
