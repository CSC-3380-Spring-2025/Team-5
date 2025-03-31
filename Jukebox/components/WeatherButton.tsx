import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import { getLocation, getCityFromCoords } from '../Services/locationService';
import { getCurrentWeather } from '@/Services/weatherService';

type WeatherButtonProps = {
  onPress: (weather: string, message: string) => void;
};

export const WeatherButton: React.FC<WeatherButtonProps> = ({ onPress }) => {
  const [weather, setWeather] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('your area');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { latitude, longitude } = await getLocation();
        const city = await getCityFromCoords(latitude, longitude);
        setLocation(city);

        const data = await getCurrentWeather(latitude, longitude);
        const currentWeather = data.current.weather[0].main;
        setWeather(currentWeather);
      } catch (e) {
        console.error('Error fetching location or weather:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getEmoji = () => {
    switch (weather) {
      case 'Clear': return '☀️';
      case 'Rain': return '🌧️';
      case 'Clouds': return '☁️';
      case 'Mist': return '🌫️';
      case 'Thunderstorm': return '⛈️';
      case 'Snow': return '❄️';
      default: return '🎵';
    }
  };

  if (loading) return <ActivityIndicator />;
  if (!weather) return <Text>Weather not found</Text>;

  const emoji = getEmoji();
  const message = `In ${location}, it is ${weather} ${emoji}. Here's a playlist for your vibe! 🎶`;

  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(weather, message)}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{weather}</Text>
      <Text style={styles.location}>📍 {location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f2f2f2',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  emoji: {
    fontSize: 50,
  },
  label: {
    fontSize: 18,
    marginTop: 6,
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
