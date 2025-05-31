import { generateWeeklyHoroscopes } from "@/app/lib/generatehoroscope";
import DotBack from "@/componenet/ui/DotBack";

export default async function HoroscopePage() {
  // Server Action to generate or fetch today's horoscope
  const data = await generateWeeklyHoroscopes()
  if (!data || !data.horoscopes?.length) {
    return <div className="p-6 text-gray-500">No horoscope data found for today.</div>
  }
console.log(data)
  return (
    <DotBack>
    <div className="max-w-7xl mx-auto py:4 sm:py-32 gothic-a1-text z-21">
  <h1 className="text-2xl sm:text-4xl font-bold text-yellow-700 mb-6 mt-6 text-center tracking-wide">
    Weekly Horoscope - This Week<span className="text-black"> </span>
  </h1>
<div className="max-w-xl mx-auto">
  <hr className="border border-dotted mb-8" />
</div>
  <div className="">
    {data.horoscopes.map(({ sign, content }) => (
      <div
        key={sign}
        className="bg-yellow-100/50 hover:scale-110 mb-8 transition-transform bg-clip-padding backdrop-filter  backdrop-blur backdrop-saturate-100 backdrop-contrast-100 p-8 mx-auto rounded-lg shadow-sm border border-yellow-200"
      >
        
         <div className="flex flex-col sm:flex-row gap-2 items-center">
            <h2 className="text-2xl text-yellow-700 font-bold capitalize mb-4 text-center w-1/6">{sign}</h2>
            <p className="text-gray-900 text-base leading-relaxed whitespace-pre-line w-5/6">{content}</p>
            </div>
        
      </div>
    ))}
  </div>
</div>
</DotBack>
  )
}
