// app/flames/page.js

'use client';
import { useState } from 'react';
import { calculateFlames } from '@/utils/flames';
import { FlameIcon } from 'lucide-react';

export default function FlamesPage() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const output = calculateFlames(name1, name2);
    setResult(output);
  };

  return (
    <div className="bg-yellow-100/50 bg-clip-padding backdrop-filter  backdrop-blur backdrop-saturate-100 backdrop-contrast-100 p-12 max-w-xl mx-auto rounded-lg shadow-lg border-yellow-300">
      <p className='font-bold text-yellow-700 text-xl'>Enter two names to find out your relationship!</p>
      <hr className='w-[200px] border border-yellow-700 border-dotted mt-4 mb-6' />
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter First Person Name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          className="w-full border border-yellow-700 mt-2 rounded p-2 text-yellow-700"
          required
        />
        <input
          type="text"
          placeholder="Enter Second Person Name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          className="w-full border border-yellow-700 mt-4 rounded p-2 text-yellow-700"
          required
        />
        <button type="submit" className="w-fit px-5 mt-5 flex justify-center gap-1 bg-yellow-700 text-yellow-100 font-bold py-2 rounded hover:bg-yellow-600 cursor-pointer">
          <FlameIcon className='h-4 w-4'/> Calculate
        </button>
      </form>
      {result && (
        <div className="mt-6 text-xl text-yellow-800 font-semibold">
          Relationship: {result}
        </div>
      )}
    </div>
  );
}
