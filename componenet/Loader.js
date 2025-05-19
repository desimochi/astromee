export default function AstroLoader() {
    return (
      <div className="flex flex-col items-center justify-center ">
        {/* Rotating circular zodiac */}
        <div className="relative w-40 h-40 animate-spin-slow rounded-full border-[6px] border-dashed border-yellow-400 shadow-xl">
          {/* Glowing center orb */}
          <div className="absolute inset-1 bg-yellow-300 rounded-full blur-xl opacity-70 animate-pulse"></div>
  
          {/* Star sparkles */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                left: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                transform: "translate(-50%, -50%)",
                animation: `twinkle 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
  
        <p className="mt-8 text-white text-lg font-semibold tracking-wider animate-pulse">
          Calculating your stars...
        </p>
  
        {/* Custom twinkle animation */}
        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          .animate-spin-slow {
            animation: spin 5s linear infinite;
          }
        `}</style>
      </div>
    );
  }
  