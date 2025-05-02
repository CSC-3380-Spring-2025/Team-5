import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Pressable, Image } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { WeatherButton } from '@/components/WeatherButton';
import { SpotifyService, SpotifyArtist } from '@/Services/SpotifyArtistService';
import { SpotifySongService, SpotifySong } from '@/Services/SpotifySongService';
import { SpotifyAlbumService, SpotifyAlbum } from '@/Services/SpotifyAlbumService';
import { router, Stack } from 'expo-router';
import FavoriteButton from '@/components/FavoriteButton';


type SearchCategory = 'Artists' | 'Songs' | 'Albums';

export default function SearchPage() {
  const [category, setCategory] = useState<SearchCategory>('Artists');
  const [results, setResults] = useState<(SpotifyArtist | SpotifySong | SpotifyAlbum)[]>([]);
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
    }
  };

  const handleWeatherPress = (weather: string, message: string) => {
    console.log(message);
  };

  const handleItemPress = (item: SpotifyArtist | SpotifySong | SpotifyAlbum) => {
    router.push('/infopage');
  };

  const categories: SearchCategory[] = ['Artists', 'Songs', 'Albums'];

  const renderItem = ({ item }: { item: SpotifyArtist | SpotifySong | SpotifyAlbum }) => {
    let imageUrl = null;
  
    if ('images' in item && item.images[0]) {
      imageUrl = item.images[0].url;
    } else if ('album' in item && item.album.images[0]) {
      imageUrl = item.album.images[0].url;
    }
  
    return (
      <Pressable
        onPress={() => handleItemPress(item)}
        style={({ pressed }) => [
          styles.resultItem,
          pressed && styles.resultItemPressed
        ]}
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={[
              styles.albumImage,
              (category === 'Albums' || category === 'Songs') && styles.squareImage
            ]}
          />
        )}
  
        {/* Text + Favorite button in a row */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.spotifyItemName}>{item.name}</Text>
            {'artists' in item && (
              <Text style={styles.spotifyItemDetails}>
                {item.artists.map(a => a.name).join(', ')}
              </Text>
            )}
          </View>
  
          <FavoriteButton
            id={item.id}
            type={
              'album' in item ? 'album' :
              'artists' in item ? 'track' :
              'artist'
            }
          />
        </View>
      </Pressable>
    );
  };
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Search" }} />
      <View style={styles.weatherContainer}>
        <WeatherButton onPress={handleWeatherPress} />
      </View>

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


