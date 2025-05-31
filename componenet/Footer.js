"use client"
import { FacebookIcon, InstagramIcon, TwitchIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
   const pathname = usePathname()
     const isLoginPage = pathname.startsWith('/login');
    if(isLoginPage){
      return null;
    }
  return (
    <footer className="bg-[#2e2e2e] text-white px-6 py-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <Image src="/astromee-logo-white.png" alt="AstroMee Logo" width={200} height={100} />
          <p className="mt-8 font-semibold">AstroMee Mobile Apps</p>
          <div className="flex gap-2 mt-2">
            <Image src="/images/google-play.png" alt="Google Play" width={120} height={40} />
            <Image src="/images/app-store.png" alt="App Store" width={120} height={40} />
          </div>
          <p className="mt-4 font-semibold">Follow us on</p>
          <div className="flex gap-3 mt-2 items-center">
           <span className="bg-yellow-50 text-yellow-700 p-2 rounded-sm cursor-pointer hover:text-yellow-100 hover:bg-yellow-700 transition-colors"> <FacebookIcon className="h-5 w-5" /></span>
           <span className="bg-yellow-50 text-yellow-700 p-2 rounded-sm cursor-pointer hover:text-yellow-100 hover:bg-yellow-700 transition-colors"> <InstagramIcon className="h-5 w-5" /></span>
           <span className="bg-yellow-50 text-yellow-700 p-2 rounded-sm cursor-pointer hover:text-yellow-100 hover:bg-yellow-700 transition-colors"> <YoutubeIcon className="h-5 w-5" /></span>
          <span className="bg-yellow-50 text-yellow-700 p-2 rounded-sm cursor-pointer hover:text-yellow-100 hover:bg-yellow-700 transition-colors">  <TwitterIcon className="h-5 w-5" /></span>
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
