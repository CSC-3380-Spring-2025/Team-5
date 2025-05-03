import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Pressable, Image } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { WeatherButton } from '@/components/WeatherButton';
import { SpotifyService, SpotifyArtist } from '@/services/SpotifyArtistService';
import { SpotifySongService, SpotifySong } from '@/services/SpotifySongService';
import { SpotifyAlbumService, SpotifyAlbum } from '@/services/SpotifyAlbumService';

import { searchUsers } from '@/services/searchUsers';
import { router, Stack } from 'expo-router';
import { User } from '@/context/UserContext';

type SearchCategory = 'Artists' | 'Songs' | 'Albums' | 'Users';
const placeholderImage: any = require('@/assets/PFP/defaultPFP.jpeg');

export default function SearchPage() {
  const [category, setCategory] = useState<SearchCategory>('Artists');
  const [results, setResults] = useState<(SpotifyArtist | SpotifySong | SpotifyAlbum | User)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const spotifyArtistService = SpotifyService.getInstance();
  const spotifySongService = SpotifySongService.getInstance();
  const spotifyAlbumService = SpotifyAlbumService.getInstance();

  const handleSearch = async (query: string) => {
    if (category === 'Artists') {
      setIsLoading(true);
      try {
        const artistResults = await spotifyArtistService.searchArtists(query);
        setResults(artistResults);
      } catch (error) {
        console.error('Error searching artists:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else if (category === 'Songs') {
      setIsLoading(true);
      try {
        const songResults = await spotifySongService.searchSongs(query);
        setResults(songResults);
      } catch (error) {
        console.error('Error searching songs:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else if (category === 'Albums') {
      setIsLoading(true);
      try {
        const albumResults = await spotifyAlbumService.searchAlbums(query);
        setResults(albumResults);
      } catch (error) {
        console.error('Error searching albums:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    } else if (category === 'Users') {
      try {
        const userResults = await searchUsers(query);
        const formattedUserResults = userResults.map(user => ({
          ...user,
          username: user.username,
          picture: user.profilePicture || placeholderImage,
        }));
        setResults(formattedUserResults);
      } catch (error) {
        console.error('Error searching users:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleWeatherPress = (weather: string, message: string) => {
    console.log(message);
  };

  const handleItemPress = (item: SpotifyArtist | SpotifySong | SpotifyAlbum | User) => {
    router.push('/infopage');
  };

  const categories: SearchCategory[] = ['Artists', 'Songs', 'Albums', 'Users'];

  const renderItem = ({ item }: { item: SpotifyArtist | SpotifySong | SpotifyAlbum | User }) => {
    let imageUrl = null;
    let title = '';
    let subtitle = '';

    if ('images' in item && item.images[0]) {
      imageUrl = item.images[0].url;
      title = item.name;
      if ('artists' in item) {
        subtitle = item.artists.map((a: { name: string }) => a.name).join(', ');
      }
    } else if ('album' in item && item.album.images[0]) {
      imageUrl = item.album.images[0].url;
      title = item.name;
      subtitle = item.artists.map((a: { name: string }) => a.name).join(', ');
    } else if ('username' in item) {
      if (item.profilePicture) {
        imageUrl = { uri: item.profilePicture };
      } else {
        imageUrl = placeholderImage;
      }
      title = item.username;
    }

    return (
      <Pressable 
      onPress={() => handleItemPress(item)}
      style={({ pressed }) => [
        styles.resultItem,
        pressed && styles.resultItemPressed
      ]}
    >
      {imageUrl ? (
        <Image 
          source={imageUrl}
          style={[
            styles.albumImage,
            (category === 'Albums' || category === 'Songs') && styles.squareImage
          ]}
        />
      ) : null}
      <View style={styles.spotifyItemInfo}>
        <Text style={styles.spotifyItemName}>{title}</Text>
        {subtitle ? (
          <Text style={styles.spotifyItemDetails}>{subtitle}</Text>
        ) : null}
      </View>
    </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Search" }} />
      {/* ✅ Weather Display */}
      <View style={styles.weatherContainer}>
        <WeatherButton onPress={handleWeatherPress} />
      </View>

      {/* Category Buttons */}
      <View style={styles.buttonGroup}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.categoryButtonText}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      
      <SearchBar onSearch={handleSearch} selectedCategory={category} />

    
      <Text style={styles.resultsTitle}>Results in {category}:</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No results found.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#555',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  resultsTitle: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  albumImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  spotifyItemInfo: {
    flex: 1,
  },
  spotifyItemName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spotifyItemDetails: {
    color: '#ccc',
    fontSize: 14,
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: '#555',
    fontStyle: 'italic',
    marginTop: 20,
    textAlign: 'center',
  },
  resultItemPressed: {
    backgroundColor: '#333',
    opacity: 0.8,
  },
  squareImage: {
    borderRadius: 8,
  },
});
