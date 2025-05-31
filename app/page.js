import AstrologyServices from "@/componenet/AstrologyService";
import Footer from "@/componenet/Footer";
import MoonScrollAnimation from "@/componenet/Moon";
import AstrologyPrediction from "@/componenet/Service";
import GradientHero from "@/componenet/Gredient";
import { DotBackgroundDemo } from "@/componenet/Features";
export default function Home() {
  return (<>
  <DotBackgroundDemo />
  <AstrologyPrediction />
  <hr className="border-t border-gray-900 border-dotted" />
  <AstrologyServices />
  
  </>
  ) 
}
