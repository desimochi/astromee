"use client"
import { SparklesPreview } from "@/componenet/ui/SparklesPreview";
import { MailIcon, Pen, PhoneCallIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Page(){
    const [type, setType] = useState("email")
    const [showotp, setShowOtp] = useState(false)
      const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
 const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

    function handleClick(){
        const currenttype = type ==="email"? "mobile" : "email"
        setType(currenttype)
          setEmailError("");
    setMobileError("");
    }
     const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const validateMobile = (value) => {
    const regex = /^\d{10}$/;
    if (!regex.test(value)) {
      setMobileError("Mobile number must be 10 digits.");
    } else {
      setMobileError("");
    }
  };
    async function handleOTP() {
    const isEmail = type === "email";
    const value = isEmail ? email.trim() : mobile.trim();

    if (!value) {
      if (isEmail) {
        setEmailError("Please enter your email.");
      } else {
        setMobileError("Please enter your mobile number.");
      }
      return;
    }

    if (isEmail && !/^\S+@\S+\.\S+$/.test(value)) {
      setEmailError("Invalid email format.");
      return;
    }

    if (!isEmail && !/^\d{10}$/.test(value)) {
      setMobileError("Mobile number must be 10 digits.");
      return;
    }

    // Clear errors
    setEmailError("");
    setMobileError("");

    try {
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, value }),
      });

      if (res.ok) {
        setShowOtp(true);
      } else {
        const data = await res.json();
        const errMsg = data?.message || "Failed to send OTP.";
        if (isEmail) {
          setEmailError(errMsg);
        } else {
          setMobileError(errMsg);
        }
      }
    } catch (error) {
      if (isEmail) {
        setEmailError("Network error. Please try again.");
      } else {
        setMobileError("Network error. Please try again.");
      }
    }

}
 async function handleVerifyOtp() {
    const isEmail = type === "email";
    const value = isEmail ? email.trim() : mobile.trim();
    const res = await fetch("/api/verify-otp", {
      method: "POST",
      body: JSON.stringify({ type, value, otp }),
    });

    const data = await res.json();
    if (data?.error) {
      setError(data.error);
    } else {
      window.location.href = "/";
    }
  }
    return(
       <div className="flex max-h-screen">
        <div className="w-1/2 shadow-2xl">
        <img
  src="/astromee-login.jpg"
  alt="astromee login"
  width={100}
  height={100}
  className="w-full h-screen"
/>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center">
         
        <img src ="/astromee-logo.png" alt ="astromee-login" className="h-[55px] w-[200px]" />
        <p className="text-sm mt-3 w-[480px] text-center text-gray-600"> Unlock your destiny — sign in now to discover personalized astrological insights tailored just for you!</p>
       
        <div className=" w-[480px] px-8 mt-6">
            {!showotp && <>
            <div className="flex justify-between mb-1"><label className="font-bold">{type ==="email"?"Email" : "Mobile"}</label> <p onClick={handleClick} className="text-yellow-600 underline cursor-pointer">Use {type==="email"? "Mobile" : "Email"}</p></div>
            {type ==='email' ?<> <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pr-3 flex items-center text-yellow-50 bg-yellow-500 rounded-l-sm">
                {type==='email'? <MailIcon className="h-5 w-5"/>: <PhoneCallIcon className="h-5 w-5"/>}
                </div>
            <input type="email" value={email}  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }} className=" pl-12 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>{emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </> :<> <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 pr-3 flex items-center text-yellow-50 bg-yellow-500 rounded-l-sm">
              <PhoneCallIcon className="h-5 w-5"/>
                </div>
            <input type="number" value={mobile}onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setMobile(val);
                    validateMobile(val);
                  }} className=" pl-12 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
             {mobileError && (
                <p className="text-red-500 text-sm mt-1">{mobileError}</p>
              )}
              </>}
            </>}
            {showotp && <div className="flex justify-between"><label className="font-bold">Enter OTP</label><p className="text-yellow-600 underline flex items-center cursor-pointer" onClick={handleOTP}><Pen class="h-4 w-4"/>Edit Info.</p></div>}
            {showotp && (
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-3"
        />
      )}
{!showotp && <button className="bg-yellow-500 text-white w-full py-2 rounded-sm mt-3 cursor-pointer" onClick={handleOTP}>Login</button>}
            {showotp && <button onClick={handleVerifyOtp} className="bg-green-600 text-white px-4 py-2 w-full">
          Verify & Login
        </button>}
        <SparklesPreview />
        </div>
        
        </div>
       </div>
    )
}