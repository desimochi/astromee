import { generateDailyHoroscopes } from "@/app/lib/generatehoroscope";
import DotBack from "@/componenet/ui/DotBack";

export default async function HoroscopePage() {
  // Server Action to generate or fetch today's horoscope
  const data = await generateDailyHoroscopes("today")
  if (!data || !data.horoscopes?.length) {
    return <div className="p-6 text-gray-500">No horoscope data found for today.</div>
  }
console.log(data)
  return (
    <DotBack>
    <div className="max-w-7xl mx-auto py:4 sm:py-32 gothic-a1-text z-21">
  <h1 className="text-center text-4xl font-bold mb-4 bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-transparent">
    Daily Horoscope - <span className="text-black"> {data.date}</span>
  </h1>
<div className="max-w-xl mx-auto">
  <hr className="border border-dotted mb-8" />
</div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {data.horoscopes.map(({ sign, content }) => (
      <div
        key={sign}
        className="bg-yellow-100/50 hover:scale-110 transition-transform bg-clip-padding backdrop-filter  backdrop-blur backdrop-saturate-100 backdrop-contrast-100 p-8 max-w-xl mx-auto rounded-lg shadow-sm border border-yellow-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 capitalize mb-4 text-center">{sign}</h2>
         <hr className="border border-dotted mb-8" />
        <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{content}</p>
      </div>
    ))}
  </div>
</div>
</DotBack>
  )
}
