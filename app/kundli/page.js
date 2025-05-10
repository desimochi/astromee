"use client"

import { useState } from 'react';
import { getPlanetData, getHouseData, getDashaData, getHoroscopePrediction, getSouthIndianChart } from '../lib/vedastro';

export default function Home() {
  const [formData, setFormData] = useState({
    location: '',
    date: '',
    time: '',
    ayanamsa: 'RAMAN'
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { location, date, time, ayanamsa } = formData;

    try {
      // API calls for all the data using authFetch
      const planetData = await getPlanetData(location, date, time, ayanamsa);
      const houseData = await getHouseData(location, date, time, ayanamsa);
      const dashaData = await getDashaData('01/01/2000', '01/01/2001', location, ayanamsa); // Example timeframe
      const horoscopePrediction = await getHoroscopePrediction(location, date, time, ayanamsa);
      const southIndianChart = await getSouthIndianChart(location, date, time, ayanamsa);

      setResult({
        planetData,
        houseData,
        dashaData,
        horoscopePrediction,
        southIndianChart
      });
    } catch (error) {
      console.error("Error fetching Kundli data:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl mb-6 text-center">Kundli Maker</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="location" className="block">Location (City)</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block">Date of Birth</label>
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="time" className="block">Time of Birth</label>
          <input
            type="time"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ayanamsa" className="block">Ayanamsa</label>
          <select
            name="ayanamsa"
            id="ayanamsa"
            value={formData.ayanamsa}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="RAMAN">RAMAN</option>
            <option value="Lahiri">Lahiri</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Generate Kundli
        </button>
      </form>

      {result && (
        <div className="mt-8">
          <h2 className="text-xl">Planetary Data</h2>
          <pre>{JSON.stringify(result.planetData, null, 2)}</pre>

          <h2 className="text-xl mt-4">House Data</h2>
          <pre>{JSON.stringify(result.houseData, null, 2)}</pre>

          <h2 className="text-xl mt-4">Dasha Data</h2>
          <pre>{JSON.stringify(result.dashaData, null, 2)}</pre>

          <h2 className="text-xl mt-4">Horoscope Prediction</h2>
          <pre>{JSON.stringify(result.horoscopePrediction, null, 2)}</pre>

          <h2 className="text-xl mt-4">South Indian Chart</h2>
          <pre>{JSON.stringify(result.southIndianChart, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

