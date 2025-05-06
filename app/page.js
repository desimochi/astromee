import AstrologyServices from "@/componenet/AstrologyService";
import Footer from "@/componenet/Footer";
import MoonScrollAnimation from "@/componenet/Moon";
import AstrologyPrediction from "@/componenet/Service";
import Image from "next/image";

export default function Home() {
  return (<>
  <MoonScrollAnimation />
  <AstrologyPrediction />
  <hr className="border-t border-gray-900 border-dotted" />
  <AstrologyServices />
  <Footer/>
  </>
  ) 
}
