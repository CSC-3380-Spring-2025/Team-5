import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎧 Welcome to Jukebox</Text>

      <Link href="/search" style={styles.link}>
        👉 Tap to Discover Weather Playlists
      </Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: '600',
  },
  link: {
    fontSize: 18,
    color: '#1DB954', // Spotify green
    textDecorationLine: 'underline',
  },
});
