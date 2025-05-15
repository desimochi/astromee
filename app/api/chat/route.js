// /app/api/chat/route.js
import { streamText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const getPlanetPositions = tool({
  name: "getPlanetPositions",
  description: "Get planet positions using birth location, time, and date",
  parameters: z.object({
    location: z.string().describe("Birth location (city name)"),
    time: z.string().describe("Birth time in HH:MM format"),
    day: z.string().describe("Day of birth"),
    month: z.string().describe("Month of birth"),
    year: z.string().describe("Year of birth"),
  }),
  execute: async ({ location, time, day, month, year }) => {
    const url = `https://webapi.vedastro.org/api/Calculate/AllPlanetData/PlanetName/All/Location/${location}/Time/${time}/${day}/${month}/${year}/`;
    const res = await fetch(url);
    const data = await res.json();
    return { positions: data.Payload };
  },
});

export async function POST(req) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    tools: { getPlanetPositions },
    toolChoice: "auto",
  });

  return result.toDataStreamResponse();
}
