export const runtime = 'nodejs';

import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

// Palm reader tool function
async function isPalmImage(imageUrl) {
  const schema = z.object({
    isImage:z.boolean()
  })
  const prompt = `You are an image verifier. Carefully analyze this image: ${imageUrl}.
Check if it contains a human palm image suitable for palm reading. 
Ignore the background, lighting, and small imperfections. 
Focus only on whether a hand with palm visible is present, even if not perfect. 
Reply only with JSON: { "isImage": true } or { "isImage": false }`;
 const result = await generateObject({
    model: openai('gpt-4o', { structuredOutputs: true }),
    schemaName: 'PalmImage',
    schemaDescription: 'Check PalmImag is Real or not',
    schema,
    prompt,
  });

  return result.object;
}

async function readPalmImage(imageUrl) {
  const schema = z.object({
    loveLife: z.string(),
    career: z.string(),
    health: z.string(),
  });

  const prompt = `You are a palm reader. Analyze the hand in this image: ${imageUrl}. Return a JSON object describing the person's love life, career, and health. Use the traditional Palm Reading Logics and must provide the information such as time of marriage, death, and how much educaiton and career insights. Give the in details analysis with logics;`;

  const result = await generateObject({
    model: openai('gpt-4o-2024-08-06', { structuredOutputs: true }),
    schemaName: 'PalmReading',
    schemaDescription: 'Palmistry reading with love, career, and health predictions.',
    schema,
    prompt,
  });

  return result.object;
}


// API route handler
export async function POST(req) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return new Response(
        JSON.stringify({ error: 'imageUrl is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
 const validPalm = await isPalmImage(imageUrl);
    if (!validPalm.isImage) {
      return new Response(JSON.stringify({ error: 'Please upload a palm image.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Call the palm reading function
    const prediction = await readPalmImage(imageUrl);

    return new Response(JSON.stringify(prediction), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
