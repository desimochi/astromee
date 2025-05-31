
import FormAstro from "@/componenet/Form/FormAstro";
import KundliChart from "@/componenet/Form/KundliChart";
import DotBack from "@/componenet/ui/DotBack";
import { SparklesPreview } from "@/componenet/ui/SparklesPreview";
import { Heart } from "lucide-react";

export default function Page(){

    
    return (
        <>
        <DotBack>
            <div className="py-32 h-fit  z-21 gothic-a1-text">
                <div className="flex w-fit mt-8 justify-center mx-auto px-4 text-center-2 mb-3 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm">
        <span className="text-black">Find Your Compatiblity</span>
          </div>
                <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent text-center">Match Maker</h1>
                <p className="text-center">Check compatibility between two people. Easily predict your relationship&asop;s future with astrology calculation.</p>
            <div className="w-full">
                <FormAstro />
            </div>
           
        
            </div>
            
        </DotBack>
     
        </>
    )
}