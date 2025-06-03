import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generate } from 'ai';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64Image = Buffer.from(arrayBuffer).toString('base64');
  const imageUrl = `data:image/png;base64,${base64Image}`;

  const result = await generate({
    model: openai.chat('gpt-4o'),
    messages: [
      {
        role: 'system',
        content: 'You are an expert palm reader AI. Read and interpret palm images using traditional palmistry knowledge. Focus on life line, heart line, and career.',
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'Please analyze this palm image and tell me about the person’s career, love life, and health.',
          },
          {
            type: 'image_url',
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  return NextResponse.json({ analysis: result.text });
}
