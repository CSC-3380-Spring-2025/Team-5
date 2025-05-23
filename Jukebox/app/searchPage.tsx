import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Pressable, Image } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { WeatherButton } from '@/components/WeatherButton';
import { SpotifyService, SpotifyArtist } from '@/Services/SpotifyArtistService';
import { SpotifySongService, SpotifySong } from '@/Services/SpotifySongService';
import { SpotifyAlbumService, SpotifyAlbum } from '@/Services/SpotifyAlbumService';
import { Linking } from 'react-native';
import { searchUsers } from '@/Services/searchUsers';
import { router, Stack } from 'expo-router';
import FavoriteButton from '@/components/FavoriteButton';
import { User } from '@/context/UserContext';

import { saveArtistRating } from '@/firebase/saveRating';
import { saveSongRating, saveAlbumRating } from '@/firebase/saveSongAndAlbumRating';
import RatingPopup from '@/components/rateComponent';




import FollowButton from '../components/FollowButton';


type SearchCategory = 'Artists' | 'Songs' | 'Albums' | 'Users';
const placeholderImage: any = require('@/assets/PFP/defaultPFP.jpeg');

export default function SearchPage() {
  const [category, setCategory] = useState<SearchCategory>('Artists');
  const [results, setResults] = useState<(SpotifyArtist | SpotifySong | SpotifyAlbum | User)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const spotifyArtistService = SpotifyService.getInstance();
  const spotifySongService = SpotifySongService.getInstance();
  const spotifyAlbumService = SpotifyAlbumService.getInstance();
  const [selectedItem, setSelectedItem] = useState<SpotifyArtist | SpotifySong | SpotifyAlbum | User | null>(null);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

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

  const handleWeatherPress = async (weather: string, message: string) => {
    console.log(message);
  
    const weatherToPlaylist: Record<string, string> = {
      Clear: 'https://open.spotify.com/playlist/37i9dQZF1DX1BzILRveYHb?si=fA2nEPeASNmbLb0N8c-K9g', 
      Rain: 'https://open.spotify.com/playlist/37i9dQZF1EIh5QTm0PNBlW?si=jgwb18RQQ562kCK_uhPM0g',  
      Clouds: 'https://open.spotify.com/playlist/37i9dQZF1EIgxHuuVqSn9D?si=6dhnV98KQWit_beAKKinGg', 
      Mist: 'https://open.spotify.com/playlist/3MpipEMiLninINFu5gBAGE?si=8nOhXCGSTe-lVoeBQCemkQ',  
      Thunderstorm: 'https://open.spotify.com/playlist/37i9dQZF1EIeOmlQSSmx93?si=ZpUZKnEGT3anGMZoW4e24A', 
      Snow: 'https://open.spotify.com/playlist/4raqLXnmb8WYkjfed9olAR?si=ykgeTjbCQkWGccmqadKwAA', 
    };
  
    const url = weatherToPlaylist[weather] || 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO'; 
  
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.warn("Can't open Spotify playlist URL");
      }
    } catch (error) {
      console.error("Error opening playlist:", error);
    }
  };
  

  const handleItemPress = (item: SpotifyArtist | SpotifySong | SpotifyAlbum | User) => {
    if (category !== 'Users') {
      setSelectedItem(item);
      setShowRatingPopup(true);
    } else {
      router.push('/infopage');
    }
  };

  const handleRatingSubmit = async (rating: number) => {
    if (!selectedItem || !('id' in selectedItem) || !('name' in selectedItem)) return;
  
    try {
      const { id, name } = selectedItem;
  
      if ('username' in selectedItem) {
        return;
      } else if (category === 'Artists') {
        await saveArtistRating(id, name, rating);
      } else if (category === 'Songs') {
        await saveSongRating(id, name, rating);
      } else if (category === 'Albums') {
        await saveAlbumRating(id, name, rating);
      }
  
      console.log(`Saved rating: ${rating} for ${name}`);
    } catch (error) {
      console.error('Failed to save rating:', error);
    } finally {
      setShowRatingPopup(false);
      setSelectedItem(null);
    }
  };
  
  
  

  const categories: SearchCategory[] = ['Artists', 'Songs', 'Albums', 'Users'];

  const renderItem = ({ item }: { item: SpotifyArtist | SpotifySong | SpotifyAlbum | User }) => {
    let imageUrl = null;
    let title = '';
    let subtitle = '';

    if ('images' in item && item.images && item.images.length > 0 && item.images[0]) {
      imageUrl = { uri: item.images[0].url };
      title = item.name;
      if ('artists' in item) {
        subtitle = item.artists.map((a: { name: string }) => a.name).join(', ');
      }
    } else if ('album' in item && item.album.images && item.album.images.length > 0 && item.album.images[0]) {
      imageUrl = { uri: item.album.images[0].url };
      title = item.name;
      subtitle = item.artists.map((a: { name: string }) => a.name).join(', ');
    } else if ('username' in item) {
      if (item.profilePicture && typeof item.profilePicture === 'string') {
        imageUrl = { uri: item.profilePicture };
      } else {
        imageUrl = placeholderImage;
      }
      title = item.username || 'User';
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
            source={imageUrl}
            style={[
              styles.albumImage,
              (category === 'Albums' || category === 'Songs') && styles.squareImage
            ]}
          />
        )}
  
        {/* Text + Favorite/Follow button in a row */}
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.spotifyItemName}>{title}</Text>
            {subtitle ? (
              <Text style={styles.spotifyItemDetails}>{subtitle}</Text>
            ) : null}
          </View>
  
          {'username' in item ? (
            <FollowButton userId={item.id} />
          ) : (
            <FavoriteButton
              id={item.id}
              type={
                'album' in item ? 'album' :
                'artists' in item ? 'track' :
                'artist'
              }
            />
          )}
        </View>
      </Pressable>
    );
  };
  

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Search" }} />
      {/* Weather Display */}
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

      <RatingPopup
        visible={showRatingPopup}
        onClose={() => {
          setShowRatingPopup(false);
          setSelectedItem(null);
        }}
        onSubmit={handleRatingSubmit}
      />
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


