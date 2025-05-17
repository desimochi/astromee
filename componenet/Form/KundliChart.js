"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CustomDatePicker from "../ui/DatePicker";
import { CakeIcon, Calendar1Icon } from "lucide-react";

export default function KundliChart({ type }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [open, setOpen] = useState(false)
    const handleOpen = ()=>{
      setOpen((prev)=> !prev)
    }
  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
      <h2 className="text-xl font-bold mb-4">Generate Kundli</h2>
      <div className="relative w-full">
        <input
          type="text"
        placeholder="Enter Your DOB" 
          className="border p-2 pr-10 rounded-sm w-full appearance-none" onClick={handleOpen} />
  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
    <CakeIcon className="h-5 w-5"/>
  </div>
</div>
    {open && <CustomDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />}
    </div>
  );
}
 