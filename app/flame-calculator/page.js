import FlamesPage from "@/componenet/FlameCal";
import DotBack from "@/componenet/ui/DotBack";
import Image from "next/image";

export default function Flames(){
    return(
        <DotBack>
        <div className="z-21 gothic-a1-text">
            <div className="max-w-7xl mx-auto py-16 sm:py-36 px-4">
                <h1 className="bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-5xl text-center font-bold text-transparent">Flames Calculator</h1>
                
                <hr className="w-[240px] border border-dotted mx-auto mt-4 mb-8" />
                <p className="text-center text-gray-800">The FLAME Calculator is a playful and nostalgic way to explore the potential relationship between two people based on their names. Whether you&apos;re curious about a romantic spark, a budding friendship, or just having fun with acquaintances, this tool offers a lighthearted glimpse into the connection you might share. FLAME stands for Friends, Lovers, Affectionate, Marriage, Enemies, and Soulmates—each letter symbolizing a unique type of bond.</p>
           <div className="flex flex-col sm:flex-row gap-4 mt-16">
  {/* Left Column: Flames Form */}
  <div className="w-full sm:w-1/2">
    <FlamesPage />
  </div>

  {/* Right Column: Image */}
  <div className="w-full sm:w-1/2">
    <Image
      src="/image/calculators/flame-calculator-couple.jpg"
      alt="flame-calculator-couple"
      width={600}
      height={400}
      className="w-full h-auto rounded-sm object-cover"
    />
  </div>
</div>
            
            </div>
        
        </div>
        </DotBack>
    )
}