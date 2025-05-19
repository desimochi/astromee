
import KundliChart from "@/componenet/Form/KundliChart";
import DotBack from "@/componenet/ui/DotBack";
import { SparklesPreview } from "@/componenet/ui/SparklesPreview";

export default function Page(){

    
    return (
        <>
        <DotBack>
            <div className="py-32 h-fit z-21 gothic-a1-text">
                <div className="flex w-40 mt-8 justify-center mx-auto px-4 text-center-2 mb-3 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm">
        <span className="text-black">Number Tells Story</span>
          </div>
                <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent text-center">Birth Chart Generator</h1>
                <p className="text-center">Discover your unique astrological insights with our Birth Chart Generator – an easy tool to reveal personality traits, strengths, and life paths based on your birth details.</p>
            <div>
                <KundliChart />
            </div>
        
            </div>
            
        </DotBack>
     
        </>
    )
}