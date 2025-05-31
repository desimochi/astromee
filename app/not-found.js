import DotBack from "@/componenet/ui/DotBack";
import Link from "next/link";

export default function NotFound(){
    return (
        <div className="min-h-screen flex items-center justify-center w-full">
            <div className="bg-gradient-to-b from-yellow-400 to-white w-full text-gray-700 flex items-center justify-center min-h-screen relative overflow-hidden font-serif">
      <div className="absolute inset-0 opacity-10 bg-cover bg-center z-0" />

      <div className="text-center z-10 p-8 max-w-xl">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-2xl mb-4">You’ve drifted off the cosmic path...</p>
        <p className="mb-8 text-lg">The stars couldn't find this page in your horoscope.</p>

        <Link href="/" >
          <div className="inline-block px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl shadow-lg hover:bg-yellow-300 transition duration-300">
            Return to Home
          </div>
        </Link>
      </div>
    </div>

        </div>
        
    )
}