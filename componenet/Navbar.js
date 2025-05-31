"use client";
import { useState } from 'react';
import BottomNav from './BottamNav';
import Image from 'next/image';
import { Calendar, Calendar1, FlameIcon, PaintBucketIcon } from 'lucide-react';
import NavLinks from './NavLink';
import { usePathname } from 'next/navigation';
const FloatingNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const pathname = usePathname()
   const isLoginPage = pathname.startsWith('/login');
  if(isLoginPage){
    return null;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <>
    <nav className="fixed top-0 left-0 w-full z-900 bg-yellow-50/90 hidden sm:block  gothic-a1-text backdrop-blur-sm shadow-sm ">
      <div className="max-w-7xl mx-auto px-6 py-4   ">
        <div className="flex items-center justify-between">
          <NavLinks href="/">
            <Image src={"/astromee-logo.png"} alt='astromee-logo' height={200} width={200} />
          </NavLinks>
          <div className="hidden md:flex space-x-6">
            <NavLinks href="/">Home</NavLinks>
            {/* <div className="relative group">
              <button className="text-gray-900 hover:text-yellow-600">Horoscope ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <NavLinks href="/service1"><span className="block px-4 py-2 text-black hover:text-yellow-600">Daily Horoscope</span></NavLinks>
                <NavLinks href="/service2"><span className="block px-4 py-2 text-black hover:text-yellow-600">Yearly Horoscope</span></NavLinks>
              </div>
            </div> */}
 
            <NavLinks href="/numerology">Numerology</NavLinks>
            <div className="relative group">
              <button className="text-gray-900 hover:text-yellow-600">Horoscope ▽</button>
              <div className="absolute hidden group-hover:block space-y-2 ">
                <div className='bg-white shadow-md rounded-md top-10 left-0 w-48 p-3'>
                <NavLinks href="/horoscope/daily-horoscope"> <span className='flex items-center gap-1'><Calendar className='h-4 w-4'/> Today Horoscope</span></NavLinks>
                <NavLinks href="/horoscope/weekly-horoscope"> <span className='flex items-center gap-1 mt-2'><Calendar1 className='h-4 w-4'/> Weekly Horoscope</span></NavLinks>
                <NavLinks href="/horoscope/monthly-horoscope"> <span className='flex items-center gap-1 mt-2'><Calendar1 className='h-4 w-4'/> Monthly Horoscope</span></NavLinks>
                </div>
              </div>
            </div>
            <div className="relative group">
              <button className="text-gray-900 hover:text-yellow-600">Free Calculators ▽</button>
              <div className="absolute hidden group-hover:block ">
                <div className='bg-white shadow-md rounded-md top-10 left-0 w-48 p-3'>
                <NavLinks href="/flame-calculator"> <span className='flex items-center'><FlameIcon className='h-4 w-4'/> Flame Calculator</span></NavLinks>
                <NavLinks href="/lucky-color"> <span className='flex items-center mt-2'><PaintBucketIcon className='h-4 w-4'/> Lucky Color Calculator</span></NavLinks>
                </div>
              </div>
            </div>
            {/* <div className="relative group">
              <button className="text-gray-900 hover:text-yellow-600">Free Readings ▽</button>
              <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md top-8 left-0 w-48">
                <NavLinks href="/"><span className="block px-4 py-2 text-black hover:text-yellow-600">Palm Readings</span></NavLinks>
                <NavLinks href="/"><span className="block px-4 py-2 text-black hover:text-yellow-600">Baby Name</span></NavLinks>
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
