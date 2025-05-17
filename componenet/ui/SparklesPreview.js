"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";

export function SparklesPreview() {
  return (
    <div
      className="h-[40rem] w-full bg-yellow-50 flex flex-col items-center justify-center overflow-hidden rounded-md gothic-a1-text">
        
       <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent text-center">Birth Chart Generator</h1>
                <p className="text-center">Discover your unique astrological insights with our Birth Chart Generator – an easy tool to reveal personality traits, strengths, and life paths based on your birth details.</p>
      <div className="w-[40rem] h-40 relative mt-4">
        {/* Gradients */}
        <div
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div
          className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent h-px w-3/4" />
        <div
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div
          className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-amber-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#a55f00" />

        {/* Radial Gradient to prevent sharp edges */}
        <div
          className="absolute inset-0 w-full h-full bg-yellow-50 [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]">
            <form>
                <input type="text"/>
            </form>
          </div>
          
      </div>
    </div>
  );
}
