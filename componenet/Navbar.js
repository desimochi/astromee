"use client"
import { useState } from 'react';
import Link from 'next/link';

const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-16 py-4 h-full w-full bg-black rounded-full mt-3 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-600 shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-white text-2xl font-bold">AstroMee</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/home">
              <span className="text-white">Home</span>
            </Link>
            <div className="relative">
              <button className="text-white">Horoscope ▽</button>
              <div className="absolute hidden bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/service1">
                  <span className="block px-4 py-2 text-black">Daily Horoscope</span>
                </Link>
                <Link href="/service2">
                  <span className="block px-4 py-2 text-black">Yearly Horoscope</span>
                </Link>
              </div>
            </div>
            <Link href="/about">
              <span className="text-white">Kundli Matching</span>
            </Link>
            <Link href="/contact">
              <span className="text-white">Panchang</span>
            </Link>
            <Link href="/contact">
              <span className="text-white">Numerology </span>
            </Link>
            <div className="relative">
              <button className="text-white">Free Calculators ▽</button>
              <div className="absolute hidden bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/service1">
                  <span className="block px-4 py-2 text-black">Flame Calculator</span>
                </Link>
                <Link href="/service2">
                  <span className="block px-4 py-2 text-black">Lucky Rudraksh</span>
                </Link>
              </div>
            </div>
            <div className="relative">
              <button className="text-white">Free Readings ▽</button>
              <div className="absolute hidden bg-white shadow-md rounded-md top-8 left-0 w-48">
                <Link href="/service1"> 
                  <span className="block px-4 py-2 text-black">Palm Readings</span>
                </Link>
                <Link href="/service2">
                  <span className="block px-4 py-2 text-black">Baby Name</span>
                </Link>
              </div>
            </div>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-blue-500 text-white space-y-4 py-4 px-6`}
      >
        <Link href="/home">
          <span onClick={toggleMenu}>Home</span>
        </Link>
        <Link href="/about">
          <span onClick={toggleMenu}>About</span>
        </Link>
        <Link href="/contact">
          <span onClick={toggleMenu}>Contact</span>
        </Link>
        <div className="relative">
          <button className="w-full text-white">Services</button>
          <div className="absolute hidden bg-white shadow-md rounded-md top-8 left-0 w-full">
            <Link href="/service1">
              <span className="block px-4 py-2 text-black">Service 1</span>
            </Link>
            <Link href="/service2">
              <span className="block px-4 py-2 text-black">Service 2</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Show Dropdown on Hover for Desktop */}
      <style jsx>{`
        .relative:hover .absolute {
          display: block;
        }
      `}</style>
    </nav>
  );
};

export default FloatingNavbar;
