'use client'; // if using App Router
import DotBack from '@/componenet/ui/DotBack';
import { useState } from 'react';

const zodiacColors = {
  Aries: 'Red',
  Taurus: 'Green',
  Gemini: 'Yellow',
  Cancer: 'White',
  Leo: 'Orange',
  Virgo: 'Brown',
  Libra: 'Pink',
  Scorpio: 'Black',
  Sagittarius: 'Purple',
  Capricorn: 'Grey',
  Aquarius: 'Blue',
  Pisces: 'Sea Green',
};

const numerologyColors = {
  1: 'Red',
  2: 'Orange',
  3: 'Yellow',
  4: 'Green',
  5: 'Blue',
  6: 'Indigo',
  7: 'Violet',
  8: 'Brown',
  9: 'Gold',
};

export default function Home() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [result, setResult] = useState('');

  function getZodiacSign(month, day) {
    const zodiacs = [
      ['Capricorn', 19],
      ['Aquarius', 18],
      ['Pisces', 20],
      ['Aries', 19],
      ['Taurus', 20],
      ['Gemini', 20],
      ['Cancer', 22],
      ['Leo', 22],
      ['Virgo', 22],
      ['Libra', 22],
      ['Scorpio', 21],
      ['Sagittarius', 21],
      ['Capricorn', 31],
    ];
    return day <= zodiacs[month][1] ? zodiacs[month][0] : zodiacs[month + 1][0];
  }

  function getNumerologyNumber(dateStr) {
    const digits = dateStr.replaceAll('-', '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);
    while (sum > 9 && sum !== 11 && sum !== 22) {
      sum = sum.toString().split('').reduce((a, b) => a + Number(b), 0);
    }
    return sum;
  }

  const calculateLuckyColor = () => {
    if (!name || !dob) return;

    const dateObj = new Date(dob);
    const day = dateObj.getDate();
    const month = dateObj.getMonth(); // 0-based

    const zodiac = getZodiacSign(month, day);
    const num = getNumerologyNumber(dob);

    const colorFromZodiac = zodiacColors[zodiac];
    const colorFromNum = numerologyColors[num];

    setResult(
      `Hi ${name}, your zodiac is ${zodiac} and numerology number is ${num}.
      🎨 Your lucky colors are: ${colorFromZodiac} and ${colorFromNum}.`
    );
  };

  return (
    <DotBack>
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-center justify-center p-8 gothic-a1-text z-21">
      <h1 className="bg-gradient-to-b from-yellow-200 to-yellow-700 bg-clip-text text-5xl text-center font-bold text-transparent mb-6">Lucky Color Calculator</h1>
      <p className='mb-6 text-center'> The Free Lucky Colors Calculator helps you discover the colors that bring the most positive energy into your life, according to your numerology. By analyzing your birthdate and personal numerological numbers, this tool provides color recommendations that can enhance your luck, success, and well-being in all areas of life.

</p>
      <div className="space-y-4 max-w-md w-full border p-6 rounded-sm bg-yellow-100/30 border-yellow-300">
      <label className='font-bold text-yellow-700'>Name</label>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-yellow-700 mt-2 rounded p-2 text-yellow-700"
        />
        <label className='font-bold text-yellow-700'>Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full border border-yellow-700 rounded mt-2 p-2 text-yellow-700"
        />
        <button
          onClick={calculateLuckyColor}
          className="bg-yellow-700 text-yellow-100 px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer hover:italic transition-colors animate-in"
        >
          Get Lucky Color
        </button>
        {result && (
          <div className="mt-4 bg-yellow-700 text-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-lg">{result}</p>
          </div>
        )}
      </div>
    </div>
    </DotBack>
  );
}
