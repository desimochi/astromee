import AstrologyServices from "@/componenet/AstrologyService";
import AstrologyPrediction from "@/componenet/Service";
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
