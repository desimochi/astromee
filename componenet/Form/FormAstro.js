"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../ui/DatePicker";
import { CakeIcon, Calendar1Icon, CalendarArrowUpIcon, Heart, HeartHandshake } from "lucide-react";
import LocationSearch from "../GeoLocation/LocationSearch";
import DatePicker from "../ui/DatePicker";
import AstroLoader from "../Loader";
import Form from "./From";

export default function FormAstro({ type }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
     const [selectedDate1, setSelectedDate1] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [name, setName] = useState("")
     const [name1, setName1] = useState("")
    const [location, setLocation] = useState("")
    const [time1, setTime1] = useState(new Date());
    const [location1, setLocation1] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] =  useState(false)
     const [show, setShow] =  useState(false)
    const [matchscore, setMatchScore] = useState({})
    const handleLocationSelect = (location) => {
    setLocation(location.label)
  };
  const handleLocationSelect1 = (location) => {
    setLocation1(location.label)
  };
  const handleSubmit = async()=>{
    if(!time || !location ||!time1 || !location){
      setError("Please Select Time and Location")
      return;
    }
      setLoading(true)
      try {
        const res = await fetch(`https://api.vedastro.org/api/Calculate/MatchReport/Location/${location}/Time/${time}/${selectedDate}/+05:30/Location/${location1}/Time/${time1}/${selectedDate1}/+05:30/`)
        const data = await res.json();

    setMatchScore(data.Payload?.MatchReport)
      } catch (error) {
        console.error("Failed to fetch SVG:", error);
      } finally {
        setLoading(false)
        setShow(true)
      }
  }
  return (
    <>
    
    <div className="flex flex-col sm:flex-row gap-6 mt-6">
      <div className="w-full sm:w-1/2">
      <Form person= "1"  error={error} loading={loading} handleLocationSelect={handleLocationSelect} selectedDate={selectedDate} 
      setSelectedDate={setSelectedDate} time={time} setTime={setTime} location={location} setLocation={setLocation} name={name} setName={setName} />
      
      </div>
    <div className="w-full sm:w-1/2">
<Form person= "2" error={error} loading={loading} handleLocationSelect={handleLocationSelect1} selectedDate={selectedDate} 
      setSelectedDate={setSelectedDate1} time={time} setTime={setTime1} location={location} setLocation={setLocation1} name={name1} setName={setName1} />
    </div>
    </div>
 <div className="flex justify-center mt-6">
                <button onClick={handleSubmit} className="mt-4 bg-yellow-700 py-2 px-16 rounded-sm text-yellow-100 shadow-2xl cursor-pointer flex items-center gap-2"><Heart className="h-5 w-5 animate-pulse"/> Check Match<Heart className="h-5 w-5 animate-pulse"/></button>
            </div>
            {loading ? <AstroLoader /> : 
            show && <div className="max-w-7xl mx-auto mt-16">
                    <div className="flex w-40 mt-8 justify-center mx-auto px-4 text-center-2 mb-3 border border-yellow-500 rounded-full text-sm bg-yellow-500/50 backdrop-blur-sm">
        <span className="text-black">Match Report</span>
          </div>
          <div className="flex flex-col items-center">
  <h3 className="flex text-center text-4xl items-center font-bold gap-4"><span className="text-6xl font-extrabold mb-4 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent text-center">{name}</span> <HeartHandshake className="h-12 w-12 text-yellow-700 animate-pulse"/> 
  <span className="text-6xl font-extrabold mb-4 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent text-center">{name1}</span></h3>
  <p>{matchscore.Summary?.ScoreSummary}</p>
          </div>
          <div className="flex mt-4 justify-between items-center">
            <div>
 <h4 className="font-extrabold text-3xl">Your Relationship Predictions </h4>
             <p className="mt-3 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-sm font-semibold">Summary - {matchscore.Summary?.ScoreSummary}</p>
            </div>
           
            <div className="bg-yellow-700 p-5 px-10 text-yellow-100 text-center rounded-sm">
                <h4 className="font-3xl">{matchscore.KutaScore}</h4>
                <p>Relationship Score</p>
            </div>
          </div>
          <table className="w-full mt-8">
                <thead className="border border-yellow-700 bg-yellow-50 text-yellow-700">
                    <tr  className="px-2">
                        <th className="px-2 py-2">S.No.</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Nature</th>
                        <th className="py-2">Male Info</th>
                        <th className="py-2">Female Info</th>
                         <th className="py-2">Information</th>
                         <th className="py-2">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                        {matchscore?.PredictionList?.length>0 ? 
                        matchscore.PredictionList.map((item,index)=>(
                            <tr key={index} className=" border-b-1">
                                 <td className="px-2 py-2">{index}</td>
                                <td className="px-2 py-2">{item.Name}</td>
                                 <td className="px-2 py-2">{item.Nature}</td>
                                <td className="px-2 py-2">{item.MaleInfo}</td>
                                <td className="px-2 py-2">{item.FemaleInfo}</td>
                                <td className="px-2 py-2">{item.Info}</td>
                                <td className="px-2 py-2">{item.Description}</td>
                               
                            </tr>
                        ))

                     : <tr><td className="">No Prediction Found- Kindly Change Input Data</td></tr>}
                    </tbody>
          </table>
        
                </div>}
    </>
  );
}
 