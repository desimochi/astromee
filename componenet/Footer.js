import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#2e2e2e] text-white px-6 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <Image src="/images/logo-footer.png" alt="AstroMee Logo" width={100} height={100} />
          <p className="mt-4 font-semibold">AstroMee Mobile Apps</p>
          <div className="flex gap-2 mt-2">
            <Image src="/images/google-play.png" alt="Google Play" width={120} height={40} />
            <Image src="/images/app-store.png" alt="App Store" width={120} height={40} />
          </div>
          <p className="mt-4 font-semibold">Follow us on</p>
          <div className="flex gap-2 mt-2">
            <Image src="/icons/facebook.svg" alt="Facebook" width={30} height={30} className="bg-white p-1 rounded" />
            <Image src="/icons/youtube.svg" alt="YouTube" width={30} height={30} className="bg-white p-1 rounded" />
            <Image src="/icons/instagram.svg" alt="Instagram" width={30} height={30} className="bg-white p-1 rounded" />
            <Image src="/icons/twitter.svg" alt="Twitter" width={30} height={30} className="bg-white p-1 rounded" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Quick Links</h3>
          <ul className="space-y-1">
            {[
              "Chat with Astrologer",
              "Astrologer",
              "Tarot Readers",
              "Numerologist",
              "Vastu Experts",
              "Fengshui Astrologer",
              "Love Astrologer",
              "Financial Astrologer",
              "Marriage Astrologer",
              "Free Astrology Consultation",
              "Horoscope 2025",
            ].map((item, i) => (
              <li key={i}><Link href="#" className="hover:underline">{item}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-2">Useful Links</h3>
          <ul className="space-y-1">
            {[
              "About Us",
              "Contact Us",
              "Astrologer Registration",
              "Partner Us",
              "Career",
              "Site Map",
              "Karma & Destiny",
              "Refund Policy",
              "Astroyogi Academy",
              "Media coverage",
              "Authors",
            ].map((item, i) => (
              <li key={i}><Link href="#" className="hover:underline">{item}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center">
        <p>©DaddysData AI - 2025. All rights reserved
        </p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">FAQs</Link>
          <Link href="#" className="hover:underline">T&C</Link>
        </div>
      </div>
    </footer>
  );
}
