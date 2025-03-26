import axios from 'axios';

const API_KEY = '1891a716d89ca246039bcd19b03023a2';
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall';

export const getCurrentWeather = async (lat: number, lon: number) => {
  const res = await axios.get(BASE_URL, {
    params: {
      lat,
      lon,
      exclude: 'minutely,hourly,daily,alerts',
      appid: API_KEY,
      units: 'metric',
    },
  });

  return res.data;
};
