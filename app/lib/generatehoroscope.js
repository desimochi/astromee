'use server'


import { connectToDatabase } from './mongodb'
const zodiacSigns = [
  'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
]

// Helper to format date to dd/mm/yyyy (IST)
function getISTFormattedDate() {
  const now = new Date()
  const IST_OFFSET = 5.5 * 60 * 60 * 1000
  const istNow = new Date(now.getTime() + IST_OFFSET)

  const dd = String(istNow.getDate()).padStart(2, '0')
  const mm = String(istNow.getMonth() + 1).padStart(2, '0')
  const yyyy = istNow.getFullYear()

  return `${dd}/${mm}/${yyyy}` // e.g., "15/05/2025"
}

export async function generateDailyHoroscopes() {
  try {
    const formattedDate = getISTFormattedDate()

    const db = await connectToDatabase()
    const collection = db.collection('daily_horoscopes')

    for (const sign of zodiacSigns) {
      const res = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=TODAY`)

      if (!res.ok) {
        console.error(`Failed to fetch horoscope for ${sign}`)
        continue
      }

      const data = await res.json()
      const content = data?.data?.horoscope_data || 'No content'

      horoscopes.push({ sign, content })
    }

    const result = await collection.insertOne({
      date: formattedDate,
      horoscopes,
    })


    return {
      _id: result.insertedId.toString(),
      date: formattedDate,
      horoscopes,
    }
  } catch (error) {
    console.error('Error generating daily horoscopes:', error)
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