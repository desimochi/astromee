"use client";
import { useState } from 'react';
import Link from 'next/link';

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
    <nav className="fixed top-0 left-0 w-full z-900">
      <div className="max-w-6xl mx-auto px-6 py-4 sm:mt-4 sm:rounded-full bg-yellow-500/70 backdrop-blur-sm border border-yellow-600 shadow-xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-white text-2xl font-bold">AstroMee</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/home"><span className="text-white">Home</span></Link>
            <div className="relative group">
              <button className="text-white">Horoscope ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/service1"><span className="block px-4 py-2 text-black">Daily Horoscope</span></Link>
                <Link href="/service2"><span className="block px-4 py-2 text-black">Yearly Horoscope</span></Link>
              </div>
            </div>
            <Link href="/about"><span className="text-white">Kundli Matching</span></Link>
            <Link href="/contact"><span className="text-white">Panchang</span></Link>
            <Link href="/numerology"><span className="text-white">Numerology</span></Link>
            <div className="relative group">
              <button className="text-white">Free Calculators ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/flame"><span className="block px-4 py-2 text-black">Flame Calculator</span></Link>
                <Link href="/rudraksh"><span className="block px-4 py-2 text-black">Lucky Rudraksh</span></Link>
              </div>
            </div>
            <div className="relative group">
              <button className="text-white">Free Readings ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/palm"><span className="block px-4 py-2 text-black">Palm Readings</span></Link>
                <Link href="/baby-name"><span className="block px-4 py-2 text-black">Baby Name</span></Link>
              </div>
            </div>
          </div>
          <button onClick={toggleMenu} className="md:hidden text-white text-xl">
            {isMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-yellow-100 text-black flex flex-col space-y-2 py-8 px-6">
          <Link href="/home"><span onClick={toggleMenu}>Home</span></Link>
          <Link href="/about"><span onClick={toggleMenu}>Kundli Matching</span></Link>
          <Link href="/contact"><span onClick={toggleMenu}>Panchang</span></Link>
          <Link href="/numerology"><span onClick={toggleMenu}>Numerology</span></Link>

          {/* Nested Menus */}
          <div>
            <button onClick={() => toggleSubmenu("horoscope")} className="w-full text-left">
              Horoscope ▾
            </button>
            {openSubmenu === "horoscope" && (
              <div className="pl-4 flex flex-col space-y-1">
                <Link href="/service1"><span onClick={toggleMenu}>Daily Horoscope</span></Link>
                <Link href="/service2"><span onClick={toggleMenu}>Yearly Horoscope</span></Link>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleSubmenu("calculators")} className="w-full text-left">
              Free Calculators ▾
            </button>
            {openSubmenu === "calculators" && (
              <div className="pl-4 flex flex-col space-y-1">
                <Link href="/flame"><span onClick={toggleMenu}>Flame Calculator</span></Link>
                <Link href="/rudraksh"><span onClick={toggleMenu}>Lucky Rudraksh</span></Link>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => toggleSubmenu("readings")} className="w-full text-left">
              Free Readings ▾
            </button>
            {openSubmenu === "readings" && (
              <div className="pl-4 flex flex-col space-y-1">
                <Link href="/palm"><span onClick={toggleMenu}>Palm Readings</span></Link>
                <Link href="/baby-name"><span onClick={toggleMenu}>Baby Name</span></Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Hover Style */}
      <style jsx>{`
        .group:hover .group-hover\\:block {
          display: block;
        }
      `}</style>
    </nav>
  );
};

export default FloatingNavbar;
