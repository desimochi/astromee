// /app/api/chat/route.js
export const runtime = 'nodejs';
import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const gethoroscope = tool({
  name: "gethoroscope",
  description: "Get horoscope using birth location, time, and date",
  parameters: z.object({
    location: z.string().describe("Birth location (having cityname,state name, country name)"),
    time: z.string().describe("Birth time in HH:MM format"),
    day: z.string().describe("Day of birth"),
    month: z.string().describe("Month of birth"),
    year: z.string().describe("Year of birth"),
  }),
  execute: async ({ location, time, day, month, year }) => {
  const url = `https://api.vedastro.org/api/Calculate/HoroscopePredictions/Location/${location}/Time/${time}/${day}/${month}/${year}/+05:30/SortByWeight/True/Ayanamsa/RAMAN`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch horoscope predictions from Vedastro");
  }

  const raw = await res.json();
  
  const insights = (raw?.Payload ?? []).map((item) => ({
    tag: item.Tags?.[0] ?? "General",
    name: item.Name,
    description: item.Description?.trim() ?? "No description",
    planets:item.RelatedBody?.Planets[0] ??" ",
    houses:item.RelatedBody?.Houses ??" ",
    weight:item.Weight ?? "00.00"
  }));
console.log("tools", insights, url)
  // ✅ For LLM memory or response
  return { insights };
},

});
const getPlanetPosition = tool({
  name: "getPlanetPosition",
  description: "Get planet position using birth location, time, and date",
  parameters: z.object({
    location: z.string().describe("Birth location (having cityname,state name, country name)"),
    time: z.string().describe("Birth time in HH:MM format"),
    day: z.string().describe("Day of birth"),
    month: z.string().describe("Month of birth"),
    year: z.string().describe("Year of birth"),
  }),
  execute: async ({ location, time, day, month, year }) => {
  const url = `https://api.vedastro.org/api/Calculate/AllPlanetData/PlanetName/All/Location/${location}/Time/${time}/${day}/${month}/${year}/+05:30/Ayanamsa/RAMAN`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch horoscope predictions from Vedastro");
  }

 const data = await res.json();

    const planets = data?.Payload?.AllPlanetData?.map((entry) => {
      const planetName = Object.keys(entry)[0];
      const planetInfo = entry[planetName];
      return {
        planet: planetName,
        sign: planetInfo.PlanetRasiD1Sign?.Name || "Unknown",
        degree: planetInfo.PlanetRasiD1Sign?.DegreesIn?.TotalDegrees || 0,
      };
    }) ?? [];
console.log("planet",  planets)
  // ✅ For LLM memory or response
  return { planets };
},

});



export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    tools: { 
       gethoroscope,
  getPlanetPosition,
     },
    toolChoice: "auto",
    maxSteps:3,
    toolHandler: async (toolCall) => {
    switch (toolCall.tool.name) {
    case "gethoroscope":
      return await gethoroscope.execute(toolCall.args);
    case "getPlanetPosition":
      return await getPlanetPosition.execute(toolCall.args);
    default:
      throw new Error("Unknown tool");
    }
  }
  });

  return result.toDataStreamResponse();
}
