// app/search.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpotifyArtistSearch from '../components/SpotifyArtistSearch';

export default function SearchPage() {
  return (
    <View style={styles.container}>
      <SpotifyArtistSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});