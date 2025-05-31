"use Client" 
export default function PalmScanner(){
    return(
          <div className="flex items-center justify-center h-fit p-4">
      <div className="relative w-101 h-124">
        {/* Palm Image */}
        <img
          src="/palm.png"
          alt="Palm Scan"
          className="w-full h-full object-cover rounded-2xl border-4 border-yellow-400 p-6"
        />

        {/* Scanning Line */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
          <div className="absolute w-full h-1 bg-yellow-400 animate-scan-glow opacity-70"></div>
        </div>

        {/* Scanning Text */}
        <div className="absolute bottom-2 w-full text-center text-black-300 text-xs font-mono">
          SCANNING.....
        </div>
      </div>
    </div>
    )
}