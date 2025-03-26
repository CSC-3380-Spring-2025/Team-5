import React from 'react';
import { SafeAreaView, Text, Alert } from 'react-native';
import { WeatherButton } from '../components/WeatherButton';
import * as Linking from 'expo-linking';

const playlistMap: Record<string, string> = {
  Clear: 'https://open.spotify.com/playlist/37i9dQZF1DX1BzILRveYHb?si=cFSi8w6KRZWUIsXuCb7VlA',         // Sunny vibes
  Rain: 'https://open.spotify.com/playlist/47S4MBG0EEXwA0GdJUA4Ur?si=ussQgyOzR5yUCQa5N7zqHQ',          // Rainy day
  Clouds: 'https://open.spotify.com/playlist/0zT16OyDCOj2576PwLuEEs?si=r9vQ3QaRSLmkz4ysRtFuXA',        // Cloudy chill
  Mist: 'https://open.spotify.com/playlist/76OvGtXbjFqwGUjoEq2zsG?si=WCJ10UceT02VkZPHnDf1Bg',          // Focus/misty
  Thunderstorm: 'https://open.spotify.com/playlist/0wUt6ZvRWhgSA9FLNeo1Uf?si=N6mWWuAeTZWQLDALwAVohA',  // Moody storm
  Snow: 'https://open.spotify.com/playlist/4raqLXnmb8WYkjfed9olAR?si=ZyJBGEHrSseVa9rsrpD2LQ',          // Snowy lo-fi
  Default: 'https://open.spotify.com/playlist/37i9dQZF1DWYBO1MoTDhZI',       // fallback
};

export default function SearchScreen() {
  const handleWeatherPress = (weather: string, message: string) => {
    const playlist = playlistMap[weather] || playlistMap.Default;

    Alert.alert('🎶 Your Weather Vibe', message, [
      {
        text: 'Open Playlist',
        onPress: () => Linking.openURL(playlist),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Search by Weather 🌤️</Text>
      <WeatherButton onPress={handleWeatherPress} />
    </SafeAreaView>
  );
}
