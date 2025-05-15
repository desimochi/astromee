'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from './mongodb'
const zodiacSigns = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
]


export async function generateDailyHoroscopes() {
  try {
    const now = new Date()

    // Convert current UTC time to IST
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const istDate = new Date(utc + 5.5 * 60 * 60 * 1000)

    // Set IST time to start of the day (midnight)
    istDate.setHours(0, 0, 0, 0)

    // Convert IST midnight to UTC for DB use
    const istMidnightUTC = new Date(istDate.getTime() - 5.5 * 60 * 60 * 1000)
    const nextISTMidnightUTC = new Date(istMidnightUTC.getTime() + 24 * 60 * 60 * 1000)

    const db = await connectToDatabase()
    const collection = db.collection('daily_horoscopes')

    // Check if horoscope for current IST date already exists (using UTC timestamps)
    const existing = await collection.findOne({
      date: {
        $gte: istMidnightUTC,
        $lt: nextISTMidnightUTC
      }
    })

    if (existing) {
      return {
        _id: existing._id.toString(),
        ...existing,
      }
    }

    const horoscopes = []

    for (const sign of zodiacSigns) {
      const res = await fetch(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`
      )

      if (!res.ok) {
        console.error(`❌ Failed to fetch horoscope for ${sign}`)
        continue
      }

      const data = await res.json()
      const content = data?.data?.horoscope_data || 'No content'

      horoscopes.push({ sign, content })
    }

    // Insert today's horoscope with UTC-based date for IST midnight
    const result = await collection.insertOne({
      date: istMidnightUTC,
      horoscopes,
    })

    // Revalidate cache for your public page
    revalidatePath('/daily-horoscope')

    return {
      _id: result.insertedId.toString(),
      date: istMidnightUTC,
      horoscopes,
    }

  } catch (error) {
    console.error('❌ Error generating daily horoscopes:', error)
    return { error: 'Failed to generate horoscopes' }
  }
}

export async function generateWeeklyHoroscopes() {
  try {
    const today = new Date()
    const weekId = getYearWeekId(today)
    const db = await connectToDatabase()
    const collection = db.collection('weekly_horoscopes')

    // Check if today's data already exists
    const existing = await collection.findOne({ week: { $gte: weekId } })

    if (existing) {
      return {
        _id: existing._id.toString(),
        ...existing,
      }
    }

    const horoscopes = []

    for (const sign of zodiacSigns) {
      const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/weekly?sign=${sign}`)

      if (!res.ok) {
        console.error(`Failed to fetch horoscope for ${sign}`)
        continue
      }

      const data = await res.json()
      const content = data?.data?.horoscope_data || 'No content'

      horoscopes.push({
        sign,
        content,
      })
    }

    // Save the full daily data as a single document
    const result = await collection.insertOne({
      week: weekId,
      horoscopes, // array of { sign, content }
    })

    revalidatePath('/horoscope')

    return {
      _id: result.insertedId.toString(),
      week: weekId,
      horoscopes,
    }
  } catch (error) {
    console.error('Error generating daily horoscopes:', error)
    return { error: 'Failed to generate horoscopes' }
  }
}

function getYearWeekId(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() + 4 - (d.getDay() || 7))
  const yearStart = new Date(d.getFullYear(), 0, 1)
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  return `${d.getFullYear()}-W${weekNo}`
}

export async function generateMonthlyHoroscopes() {
  try {
    const today = new Date()
    const month = getMonthYearId(today)
    const db = await connectToDatabase()
    const collection = db.collection('monthly_horoscopes')

    // Check if today's data already exists
    const existing = await collection.findOne({ month: { $gte: month } })

    if (existing) {
      return {
        _id: existing._id.toString(),
        ...existing,
      }
    }

    const horoscopes = []

    for (const sign of zodiacSigns) {
      const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/monthly?sign=${sign}`)

      if (!res.ok) {
        console.error(`Failed to fetch horoscope for ${sign}`)
        continue
      }

      const data = await res.json()
      const content = data?.data?.horoscope_data || 'No content'
      const challanging_days = data?.data?.challenging_days || 'No content'
      const standout_days = data?.data?.standout_days || 'No content'

      horoscopes.push({
        sign,
        content,
        challanging_days,
        standout_days
      })
    }

    // Save the full daily data as a single document
    const result = await collection.insertOne({
      month: month,
      horoscopes, // array of { sign, content }
    })

    revalidatePath('/weekly-horoscope')

    return {
      _id: result.insertedId.toString(),
      month: month,
      horoscopes,
    }
  } catch (error) {
    console.error('Error generating daily horoscopes:', error)
    return { error: 'Failed to generate horoscopes' }
  }
}

function getMonthYearId(date) {
  const options = { month: 'long', year: 'numeric' }
  const formatter = new Intl.DateTimeFormat('en-US', options)
  const parts = formatter.formatToParts(date)

  const month = parts.find(p => p.type === 'month')?.value.toLowerCase()
  const year = parts.find(p => p.type === 'year')?.value

  return `${month}/${year}`
}