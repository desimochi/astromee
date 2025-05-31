import { CakeIcon, CalendarArrowUp, UserCheckIcon } from "lucide-react";
import LocationSearch from "../GeoLocation/LocationSearch";

export default function Form({person, error, loading, handleLocationSelect, selectedDate, 
      setSelectedDate, time, setTime, location, setLocation, name, setName}){
    return(
        <div className="mx-auto p-8 shadow-lg rounded-lg bg-yellow-100">
      <h2 className="text-2xl font-bold mb-4">Enter Person {person} Details</h2>
      <hr className="border border-b-2 border-dotted mb-6 border-yellow-700"/>
      {error && <p className="text-red-500">{error}</p>}
       <label className="font-bold mb-2 ">Name / नाम  <span className="text-red-500 text-lg">*</span></label>
      <div className="relative w-full mb-4 mt-2">
        <input
  type="text"
  placeholder="Enter Name"
  className="border border-amber-300 p-2 pl-12 rounded-sm w-full appearance-none"
  onChange={(e) => {setName(e.target.value)
  }}
/>


  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-700 p-2.5 text-yellow-100 pointer-events-none">
  <UserCheckIcon className="h-5 w-5"/>
  </div>
</div>
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
  <CalendarArrowUp className="h-5 w-5"/>
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
        
    </div>
    )
}