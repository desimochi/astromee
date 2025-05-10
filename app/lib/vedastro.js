// lib/vedAstro.js
import { authFetch } from "../authfetch";

export const getPlanetData = async (location, date, time, ayanamsa = 'RAMAN') => {
  const url = `Calculate/AllPlanetData/PlanetName/All/Location/${location}/Time/${time}/${date}/+01:00/Ayanamsa/${ayanamsa}`;
  const response = await authFetch(url);
  return response;
};

export const getHouseData = async (location, date, time, ayanamsa = 'RAMAN') => {
  const url = `Calculate/AllHouseData/HouseName/All/Location/${location}/Time/${time}/${date}/+01:00/Ayanamsa/${ayanamsa}`;
  const response = await authFetch(url);
  return response;
};

export const getDashaData = async (startDate, endDate, location, ayanamsa = 'RAMAN') => {
  const url = `Calculate/DasaAtRange/Location/${location}/Time/00:00/${startDate}/+01:00/Location/${location}/Time/00:00/${endDate}/+01:00/Levels/3/PrecisionHours/100/Ayanamsa/${ayanamsa}`;
  const response = await authFetch(url);
  return response;
};

export const getHoroscopePrediction = async (location, date, time, ayanamsa = 'RAMAN') => {
  const url = `Calculate/HoroscopePredictions/Location/${location}/Time/${time}/${date}/+00:00/Ayanamsa/${ayanamsa}`;
  const response = await authFetch(url);
  return response;
};

export const getSouthIndianChart = async (location, date, time, ayanamsa = 'RAMAN') => {
  const url = `Calculate/SouthIndianChart/Location/${location}/Time/${time}/${date}/+01:00/ChartType/BhavaChalit/Ayanamsa/${ayanamsa}`;
  const response = await authFetch(url);
  return response;
};
