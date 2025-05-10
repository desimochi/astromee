"use client";
import { useState } from 'react';
import Link from 'next/link';
import BottomNav from './BottamNav';
import Image from 'next/image';

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-900 hidden sm:block">
      <div className="max-w-6xl mx-auto px-6 py-4 sm:mt-4 sm:rounded-full bg-white/90 backdrop-blur-sm border border-gray-600 shadow-xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image src={"/astromee-logo.png"} alt='astromee-logo' height={150} width={150} />
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/"><span className="text-gray-700 hover:text-yellow-600">Home</span></Link>
            {/* <div className="relative group">
              <button className="text-gray-700 hover:text-yellow-600">Horoscope ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/service1"><span className="block px-4 py-2 text-black hover:text-yellow-600">Daily Horoscope</span></Link>
                <Link href="/service2"><span className="block px-4 py-2 text-black hover:text-yellow-600">Yearly Horoscope</span></Link>
              </div>
            </div> */}
 
            <Link href="/numerology"><span className="text-gray-700 hover:text-yellow-600">Numerology</span></Link>
            {/* <div className="relative group">
              <button className="text-gray-700 hover:text-yellow-600">Free Calculators ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/"><span className="block px-4 py-2 text-black hover:text-yellow-600">Flame Calculator</span></Link>
                <Link href="/"><span className="block px-4 py-2 text-black hover:text-yellow-600">Lucky Rudraksh</span></Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-700 hover:text-yellow-600">Free Readings ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/"><span className="block px-4 py-2 text-black hover:text-yellow-600">Palm Readings</span></Link>
                <Link href="/"><span className="block px-4 py-2 text-black hover:text-yellow-600">Baby Name</span></Link>
              </div>
            </div> */}
          </div>
    
        </div>
      </div>

      {/* Mobile Menu */}
   

      {/* Desktop Hover Style */}
      <style jsx>{`
        .group:hover .group-hover\\:block {
          display: block;
        }
      `}</style>
      <div className='block sm:hidden'>
        
      </div>
    </nav>
    <BottomNav />
    </>
  );
};

export default FloatingNavbar;
