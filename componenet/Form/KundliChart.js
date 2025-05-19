"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../ui/DatePicker";
import { CakeIcon, Calendar1Icon, CalendarArrowUpIcon } from "lucide-react";
import LocationSearch from "../GeoLocation/LocationSearch";
import DatePicker from "../ui/DatePicker";
import AstroLoader from "../Loader";

export default function KundliChart({ type }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
     const [svgContent, setSvgContent] = useState("");
    const [time, setTime] = useState(new Date());
    const [location, setLocation] = useState("")
    const [imageUrl, setImageUrl] = useState("");
    const [open, setOpen] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] =  useState(false)
    const handleOpen = ()=>{
      setOpen((prev)=> !prev)
    }
    const handleLocationSelect = (location) => {
    setLocation(location.label)
  };
  const handleSubmit = async ()=>{
    if(!time || !location){
      setError("Please Select Time and Location")
      return;
    }
      setLoading(true)
      try {
        const res = await fetch(`https://api.vedastro.org/api/Calculate/SouthIndianChart/Location/${location}/Time/${time}/${selectedDate}/+05:30/ChartType/RasiD1/Ayanamsa/RAMAN`)
        const svgText = await res.text();

    setSvgContent(svgText)
      } catch (error) {
        console.error("Failed to fetch SVG:", error);
      } finally {
        setLoading(false)
      }
  }
  return (
    <div className="flex flex-col sm:flex-row gap-6 mt-6">
      <div className="w-full sm:w-1/2">
      <div className="mx-auto p-8 shadow-lg rounded-lg bg-yellow-100">
      <h2 className="text-2xl font-bold mb-4">Get Birth Chart</h2>
      <hr className="border border-b-2 border-dotted mb-6 border-yellow-700"/>
      {error && <p className="text-red-500">{error}</p>}
      <label className="font-bold mb-2 ">Date of Birth / जन्मतिथि <span className="text-red-500 text-lg">*</span></label>
      <div className="relative w-full mb-4 mt-2">
        <input
  type="date"
  className="border border-amber-300 p-2 pl-12 rounded-sm w-full appearance-none"
  onChange={(e) => {
    const [year, month, day] = e.target.value.split("-");
    setSelectedDate(`${day}/${month}/${year}`); // dd/mm/yyyy
  }}
/>


  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-700 p-2.5 text-yellow-100 pointer-events-none">
  <CalendarArrowUpIcon className="h-5 w-5"/>
  </div>
</div>
<label className="font-bold mb-2 ">Time of Birth / जन्म का समय <span className="text-red-500 text-lg">*</span></label>
<div className="relative w-full mb-4 mt-2">
        <input
  type="time"
  className="border border-amber-300 p-2 pl-12 rounded-sm w-full appearance-none"
  onChange={(e) => {
    const [hour, minute] = e.target.value.split(":");
    setTime(`${hour}:${minute}`); // HH:mm (24-hour)
  }}
/>
  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-700 p-2.5 text-yellow-100 pointer-events-none">
  <CakeIcon className="h-5 w-5"/>
  </div>
</div>
        <label className="font-bold ">Birth Location / जन्म स्थान <span className="text-red-500 text-lg">*</span></label>
        <LocationSearch onSelect={handleLocationSelect}/>
        <button
  className="bg-yellow-700 text-yellow-100 py-2 px-8 rounded-sm mt-4 cursor-pointer"
  onClick={handleSubmit}
>
  {loading ? "Generating...." : "Generate Chart"}
</button>
    </div>
      </div>
    <div className="w-full sm:w-1/2">

    {loading ? <AstroLoader /> : <div className=" sm:h-[500px] overflow-auto svg-wrapper" dangerouslySetInnerHTML={{ __html: svgContent }} />}
    </div>
    </div>
  );
}
 