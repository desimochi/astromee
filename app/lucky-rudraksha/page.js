'use client';
import { useState } from 'react';

export default function RudrakshaFinder() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    place: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const getRudrakshaByWeakPlanets = (planetData) => {
    const planetToRudraksha = {
      Sun: '1 Mukhi',
      Moon: '2 Mukhi',
      Mars: '3 Mukhi',
      Mercury: '4 Mukhi',
      Jupiter: '5 Mukhi',
      Venus: '6 Mukhi',
      Saturn: '7 Mukhi',
      Rahu: '8 Mukhi',
      Ketu: '9 Mukhi',
    };

    const threshold = 50;
    const weakPlanets = planetData.filter(p => p.Strength < threshold);

    const rudrakshas = weakPlanets.map(p => ({
      planet: p.PlanetName,
      strength: p.Strength,
      rudraksha: planetToRudraksha[p.PlanetName],
    }));

    return rudrakshas;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const { date, time, place } = formData;
    const apiUrl = `https://api.vedastro.org/Person/PlanetStrengths?time=${date}T${time}&place=${encodeURIComponent(place)}`;

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();

      const planets = data?.Body || [];
      const recommended = getRudrakshaByWeakPlanets(planets);
      setResult(recommended);
    } catch (err) {
      console.error(err);
      setResult({ error: 'Failed to fetch data. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-30 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🔮 Lucky Rudraksha Finder</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md p-6 rounded">
        <input name="name" type="text" placeholder="Your Name" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="date" type="date" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="time" type="time" onChange={handleChange} required className="w-full p-2 border rounded" />
        <input name="place" type="text" placeholder="Place of Birth (City or Lat,Lng)" onChange={handleChange} required className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">
          {loading ? 'Calculating...' : 'Find My Rudraksha'}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          {result.error ? (
            <p className="text-red-600">{result.error}</p>
          ) : result.length === 0 ? (
            <p className="text-green-600">You$asop;re blessed! No weak planets detected.</p>
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-2">Recommended Rudrakshas:</h2>
              <ul className="list-disc pl-5">
                {result.map((item, index) => (
                  <li key={index}>
                    <strong>{item.planet}</strong> (Strength: {item.strength}) → {item.rudraksha}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
