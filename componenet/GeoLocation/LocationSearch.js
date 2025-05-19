"use client"
import { LocateFixed, LocationEditIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const GEO_USERNAME = 'astromee '; // Replace this

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

useEffect(() => {
  if (!showDropdown || !query) {
    setSuggestions([]);
    return;
  }

  const fetchSuggestions = async () => {
    try {
      const res = await fetch(
        `https://secure.geonames.org/searchJSON?q=${query}&maxRows=10&username=${GEO_USERNAME.trim()}`
      );
      const data = await res.json();

      const formatted = data.geonames.map((item) => ({
        label: `${item.name}${item.adminName1 ? ', ' + item.adminName1 : ''}, ${item.countryName}`,
        lat: item.lat,
        lng: item.lng,
        timezone: item.timezone?.timeZoneId,
      }));

      setSuggestions(formatted);
    } catch (err) {
      console.error('GeoNames fetch error:', err);
      setSuggestions([]);
    }
  };

  const delayDebounce = setTimeout(fetchSuggestions, 300);
  return () => clearTimeout(delayDebounce);
}, [query, showDropdown]);


  const handleSelect = (location) => {
    setQuery(location.label);
    setShowDropdown(false);
    if (onSelect) onSelect(location);
  };

  return (
    <div className="relative w-full mt-2 ">
      <div className="relative w-full mb-4 mt-2">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onFocus={() => setShowDropdown(true)}
        className="w-full p-2 pl-12 border border-amber-300 rounded"
        placeholder="Enter city or place..."
      />
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-yellow-700 p-2.5 text-yellow-100 pointer-events-none">
  <LocationEditIcon className="h-5 w-5"/>
  </div>
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded shadow max-h-60 overflow-y-auto">
          {suggestions.map((location, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(location)}
            >
              {location.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
