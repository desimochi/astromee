export const runtime = 'nodejs';

import { generateObject } from 'ai';
import { z } from 'zod';
import { openai } from '@ai-sdk/openai';

// Palm reader tool function
async function isPalmImage(imageUrl) {
  const schema = z.object({
    isImage:z.boolean()
  })
  const prompt = `You are an image classifier that only checks whether the image : ${imageUrl} contains a human palm image or not. Ignore the background just focus on human palm only and then Return a JSON object of Does this image contain a human palm image suitable for palm reading? Answer true or false`
 const result = await generateObject({
    model: openai('gpt-4o-2024-08-06', { structuredOutputs: true }),
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
