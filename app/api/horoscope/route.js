import { connectToDatabase } from '@/app/lib/mongodb'
import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

// OpenAI client setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req) {
  try {
    const { sign } = await req.json()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Connect to the MongoDB database
    const db = await connectToDatabase()

    // Check if horoscope for today already exists
    const existing = await db
      .collection('horoscopes')
      .findOne({ sign, date: { $gte: today } })

    if (existing) {
      return NextResponse.json(existing)
    }

    // Generate horoscope using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an expert astrologer.' },
        { role: 'user', content: `Write a detailed daily horoscope for ${sign}. Also, provide:
        1. The lucky number for today
        2. The lucky color for today
        3. The Subh Muhurat (auspicious time) for today
        Important Dont Mention the Date in it and make of 200 words`  
      },
      ],
    })

    const content = completion.choices[0].message.content

    // Extract lucky number, lucky color, and subh muhurat from the content
 

    // Prepare the horoscope data
    const horoscope = {
      sign,
      content,
      date: new Date(),
    }

    // Save horoscope to MongoDB
    const savedHoroscope = await db.collection('horoscopes').insertOne(horoscope)

    // Return the saved document (we use the insertedId to retrieve it)
    return NextResponse.json({
      _id: savedHoroscope.insertedId,
      ...horoscope
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to generate or save horoscope.' }, { status: 500 })
  }
}

// Helper functions to extract data from the response
const extractLuckyNumber = (response) => {
  // Extract lucky number using regex
  const match = response.match(/lucky number (\d+)/i)
  return match ? match[1] : 'N/A'
}

const extractLuckyColor = (response) => {
  // Extract lucky color using regex
  const match = response.match(/lucky color (\w+)/i)
  return match ? match[1] : 'N/A'
}

const extractSubhMuhurat = (response) => {
  // Extract subh muhurat (auspicious time) using regex
  const match = response.match(/subh muhurat (\d{1,2}:\d{2} [APM]+)/i)
  return match ? match[1] : 'N/A'
}
