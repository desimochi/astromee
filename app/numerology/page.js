"use client";
import TypingHeader from "@/componenet/TypedText";
import DOMPurify from 'dompurify';
import { ArrowUpRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { authFetch } from "../authfetch";
import Image from "next/image";
import AstroLoader from "@/componenet/Loader";
import { cn } from "@/lib/utils";
import DotBack from "@/componenet/ui/DotBack";

export default function Page(){
    const [name, setName] = useState('');
    const [error, setError] = useState(false);  
    const [loading, setLoading] = useState(false);
    const resultRef = useRef(null);
    const [result, setResult] = useState({});
    function scrollToResult() {
        resultRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
      useEffect(() => {
        if (loading) {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, [loading]);
    async function handleSubmit() {
        setLoading(true);
       
        try {
            const response = await authFetch(`Calculate/NameNumberPrediction/FullName/${name}`)
            const data = await response.json();
            if(!response.ok) {
                setError(true);
                setLoading(false);
                return;
            }
            setResult(data.Payload);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    console.log(result)
    return(
        <>
        <DotBack>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gothic-a1-text z-21">
            <div className="inline-block px-4 text-center-2 mb-3 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm">
        <span className="text-black">Number Tells Story</span>
          </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent">Numerology</h1>
            <p className="text-lg text-gray-700 mb-8">A person {`'`}s life can be predicted through his name spellings. From Mantra Shastra, uses vibration frequency of alphabets.</p>
            <div className="w-[360px] sm:w-[400px] bg-yellow-50 bg-clip-padding backdrop-filter backdrop-blur backdrop-saturate-100 backdrop-contrast-100 py-6 px-10 rounded-lg shadow-lg border border-amber-100">
                <TypingHeader/>
              <input type="text" placeholder="Enter your name" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full p-2 mb-4 mt-2 border border-yellow-700 text-yellow-700 bg-yellow-50 rounded" />
              <button onClick={handleSubmit} disabled={loading} className=" px-6 py-2 mt-4 bg-yellow-700 text-yellow-50 font-semibold rounded-full overflow-hidden cursor-pointer hover:bg-yellow-600 hover:text-white transition duration-300 ease-in-out shadow-lg flex items-center justify-center">
  {loading? 'Submitting...' : 'Submit'} <ArrowUpRight className="h-4 w-4 hover:h-6 hover:w-6" />
</button>
            </div>
          
        </div>
        </DotBack>
        <div ref={resultRef} className=" inset-0 z-0 pointer-events-none">
        {loading && (
            <div className="max-w-7xl mx-auto pt-20 pb-20 px-4 max-h-screen">
                <AstroLoader />
            </div>
        )}
        {result?.NameNumberPrediction && (
  <div className="max-w-7xl mx-auto pt-20 pb-20 px-4">
    <h3 className="text-4xl text-center font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
      {name?.toUpperCase()}{`'s`} Numerology
    </h3>

    <hr className="border-1 border-yellow-500 w-1/2 border-dotted mx-auto mt-4 mb-8" />

    <div className="flex flex-col md:flex-row gap-6">
      {/* Left Column */}
      <div className="md:w-1/2 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-1/2 text-black">
            <h5 className="text-xl mb-2 font-bold">Planet - {result.NameNumberPrediction.Planet}</h5>
            <hr className="border-1 border-yellow-500 w-1/4 border-dotted mt-1 mb-4" />
            <p className="text-yellow-300"></p>
            {result.NameNumberPrediction.Planet && (
              <Image
                src={`/image/${result.NameNumberPrediction.Planet}.png`}
                height={250}
                width={250}
                alt={`${result.NameNumberPrediction.Planet}`}
                className="animate-rotatemoon"
              />
            )}
          </div>

          <div className="w-1/2 text-black">
            <h5 className="text-xl mb-2 font-bold">Lucky Number</h5>
            <hr className="border-1 border-yellow-500 w-1/4 border-dotted mt-1 mb-4" />
            <p className="text-yellow-700 bg-yellow-100 flex items-center rounded-3xl justify-center text-9xl font-bold w-[250px] h-[250px] shadow-lg">
              {result.NameNumberPrediction.Number || '—'}
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-2xl text-gray-900">Prediction</h4>
          <hr className="border-1 border-yellow-500 w-1/2 border-dotted mt-1 mb-4" />
          <div
            className="text-black text-base space-y-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(result.NameNumberPrediction.Prediction),
            }}
          />
        </div>
      </div>
      <div className="md:w-1/2 space-y-6">
      <h3 className="text-xl mb-2 font-bold">Prediction Summary</h3>
      <hr className="border-1 border-yellow-500 w-1/4 border-dotted mt-1 mb-4" />
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Finance}%</p>
                <h5>Finance</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Romance}%</p>
                <h5>Romance</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Education}%</p>
                <h5>Education</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Health}%</p>
                <h5>Health</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Family}%</p>
                <h5>Family</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Growth}%</p>
                <h5>Growth</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Career}%</p>
                <h5>Career</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Reputation}%</p>
                <h5>Reputation</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Spirituality}%</p>
                <h5>Spirituality</h5>
            </div>
            <div className="bg-yellow-100 text-yellow-700 text-center p-4 rounded-md">
                
                <p className="text-4xl font-bold">{result.NameNumberPrediction.PredictionSummary.Luck}%</p>
                <h5>Luck</h5>
            </div>
        </div>
      </div>
    </div>
  </div>
)}
</div>
        </>
    )
}