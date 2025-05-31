'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MoonScrollAnimation() {
  const sectionRef = useRef();
  const moonRef = useRef();
  const moonImgRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      let hasChanged = false;

      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=1000',
        pin: true,
        anticipatePin: 1,
        scrub: true,
      });

      // Animate the moon scale and position on scroll
      gsap.to(moonRef.current, {
        scale: 24,
        y: 1500,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: true,
        },
      });

      // Change text on scroll start
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top-+=100 top',
        end: 'top+=2000 top',
        onUpdate: (self) => {
          if (self.progress > 0 && !hasChanged) {
            hasChanged = true;
            textRef.current.innerText = 'Check what your future has for you';
          } else if (self.progress === 0 && hasChanged) {
            hasChanged = false;
            textRef.current.innerText = 'Astro Mee';
          }
        },
      });

      // Fade in moon image
      gsap.fromTo(
        moonImgRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Fade in heading text
      gsap.fromTo(
        textRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-r from-[#04001f] to-[#000000] text-white flex justify-center items-center"
    >
      {/* Text */}
      <h1
        ref={textRef}
        className="text-5xl md:text-7xl font-bold relative z-10 text-center opacity-0 bg-gradient-to-tl from-slate-800 via-yellow-500 to-zinc-400 bg-clip-text text-transparent"
      >
        Astro Mee
      </h1>

      {/* Moon */}
      <div
        ref={moonRef}
        className="absolute w-14 h-14 md:w-20 md:h-20 z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <img
          ref={moonImgRef}
          src="/moon.png"
          alt="Moon"
          className="w-full h-full object-cover rounded-full transition-all duration-300 shadow-lg animate-rotatemoon opacity-0"
        />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-70 animate-twinkle"
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
    </section>
  );
}
