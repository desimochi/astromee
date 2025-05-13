import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";

// components/GradientHero.js
export default function GradientHero() {
    return (
      <div className="relative min-h-[120vh]  sm:min-h-[100vh] bg-white  gothic-a1-text overflow-hidden flex flex-col sm:flex-row items-center justify-center text-white">
        {/* Planets orbiting */}
        <div className=" w-full sm:w-1/2">
        <div className="z-40 text-center sm:text-left w-full px-4 sm:px-40">
          <div className="inline-block px-4 py-2 mb-3 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm">
           <span className="text-black">Most Trusted Astrology Website!</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-black gothic-a1-text">
  Astrology {` `}
  <span className="inline-block text-yellow-400 ">For </span>{` `}
  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
    Mee
  </span>
</h1>
          <p className="mt-6 text-lg text-gray-600  gothic-a1-text">
          Unlock the mysteries of your future with AI astrology—where science meets the stars.
          </p>
          <p className="mt-2 text-gray-400 gothic-a1-text">
          Personalized insights guiding your journey through the cosmos.
          </p>
        </div>
        <div className="absolute w-full inset-0 flex items-center justify-center mx:0">
          {/* Orbit 1 */}
          <div className="w-[0px] h-[0px] border border-gray-700/10 rounded-full">
            <div className="w-32 h-32 bg-yellow-300 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black shadow-[0_0_60px_30px_rgba(253,224,71,0.5)]"></div>
          </div>
          <div className="w-[200px] h-[200px] border border-gray-700/10 rounded-full animate-orbit">
            <div className="w-4 h-4 bg-gray-400 rounded-full absolute top-0 left-1/2 -translate-x-1/2 text-black">.</div>
          </div>
          {/* Orbit 2 */}
          <div className="w-[300px] h-[300px] border border-gray-800/10 rounded-full animate-reorbit delay-1000 absolute">
            <div className="w-3 h-3 rounded-full absolute top-0 left-1/2 -translate-x-1/2 animate-rotatemoon">🟠</div>
          </div>
          {/* Orbit 3 */}
          <div className="w-[400px] h-[400px] border border-gray-900/10 rounded-full animate-orbit delay-2000 absolute">
            <div className="w-2 h-2 rounded-full absolute top-0 left-1/2 -translate-x-1/2">🌍</div>
          </div>
          <div className="w-[500px] h-[500px] border border-gray-900/10 rounded-full animate-reorbit delay-2000 absolute">
            <div className="w-2 h-2 bg-red-600 rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>
          <div className="w-[600px] h-[600px] border border-gray-900/10 rounded-full animate-orbit delay-2000 absolute">
            <div className="w-2 h-2 rounded-full absolute top-0 left-1/2 -translate-x-1/2">🪐</div>
          </div>
          <div className="w-[700px] h-[700px] border border-gray-900/10 rounded-full animate-reorbit delay-2000 absolute">
            <div className="w-2 h-2 rounded-full absolute top-0 left-1/2 -translate-x-1/2">🌑</div>
          </div>
          <div className="w-[800px] h-[800px] border border-gray-900/10 rounded-full animate-orbit delay-2000 absolute">
            <div className="w-2 h-2 bg-sky-600 rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>
          <div className="w-[900px] h-[900px] border border-gray-900/10 rounded-full animate-reorbit delay-2000 absolute">
            <div className="w-4 h-4 bg-blue-700 rounded-full absolute top-0 left-1/2 -translate-x-1/2"></div>
          </div>
        </div>
  
        {/* Text content */}
        
        </div>
        <div className="w-full sm:w-1/2 mx-auto mt-20 sm:mt-0 z-50">
        <div className="bg-yellow-100/50 bg-clip-padding backdrop-filter  backdrop-blur backdrop-saturate-100 backdrop-contrast-100 p-12 max-w-xl mx-auto rounded-lg shadow-lg">
        <div className="inline-block px-4 text-center-2 mb-3 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm">
           <span className="text-black">Need Help!</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-black">
 First Chat {` `} 
  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
     Free
  </span>
</h1>
<p className="mt-2 text-gray-600">
          Recommended by many users, our astrology service is the best in the world.
          </p>
          <button className=" px-6 py-2 mt-4 bg-yellow-700 text-yellow-100 font-semibold rounded-full overflow-hidden cursor-pointer hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out shadow-lg flex items-center justify-center">
  Chat Now <ArrowUpRight className="h-4 w-4" />
</button>
        </div>
        </div>
        <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-black rounded-full opacity-70 animate-twinkle "
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        
      </div>
      

      </div>
    );
  }
  