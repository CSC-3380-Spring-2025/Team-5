import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { SpotifyAuth } from '@/auth/spotifyAuth';
import { Stack } from 'expo-router';

import { getAuth } from 'firebase/auth';
import { doc, updateDoc, increment } from 'firebase/firestore';
import {router} from "expo-router";

/*
 TODO: 
  Make squares red when they are incorrect and game ends
  Add members hint similar to debut and popularity
*/

interface Artist {
  id: string;
  pfp: string | null;
  Debut: string;
  Members: number;
  Popularity: number;
  Gender: string;
  Genre: string;
  Nationality: string;
}

let allArtists: Artist[] = [];

export default function ArtistlyPage() { 

  const [guess, setGuess] = useState('');
  const [triesLeft, setTriesLeft] = useState(10);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);
  const [artistImage, setArtistImage] = useState<string | null>(null);
  const [correctDebut, setCorrectDebut] = useState(false);
  const [debutLessThan, setDebutLessThan] = useState(false);
  const [correctGender, setCorrectGender] = useState(false);
  const [correctGenre, setCorrectGenre] = useState(false);
  const [correctMembers, setCorrectMembers] = useState(false);
  const [correctNationality, setCorrectNationality] = useState(false);
  const [correctPopularity, setCorrectPopularity] = useState(false);
  const [popularityLessThan, setPopularityLessThan] = useState(false);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  useEffect(() => {
    newGame();
  }, []);
  

  // fetch spotify artist image
  const fetchSpotifyImage = async (artistName: string) => {
    try {
      const spotifyAuth = SpotifyAuth.getInstance();
      const accessToken = await spotifyAuth.getAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );
      
      const data = await response.json();
      if (data.artists?.items?.[0]?.images?.[0]?.url) {
        return data.artists.items[0].images[0].url;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Spotify image:', error);
      return null;
    }
  };

  const newGame = async () => {

    setGameStatus('playing');
    setTriesLeft(10);
    setCorrectDebut(false);
    setDebutLessThan(false);
    setCorrectMembers(false);
    setCorrectPopularity(false);
    setPopularityLessThan(false);
    setCorrectGender(false);
    setCorrectGenre(false);
    setCorrectNationality(false);
    setGuess('');
    setCurrentArtist(null);
    setArtistImage(null);

    try {
      const artistsRef = collection(db, 'Artistly');
      const querySnapshot = await getDocs(artistsRef);
      
      allArtists = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Artist));
      
      // Select random artist
      const randomIndex = Math.floor(Math.random() * allArtists.length);
      const selectedArtist = allArtists[randomIndex];
      setCurrentArtist(selectedArtist);
      
      // Fetch Spotify image for the selected artist
      if (selectedArtist.id) {
        const imageUrl = await fetchSpotifyImage(selectedArtist.id);
        setArtistImage(imageUrl);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
const incrementArtistlyStats = async () => {
    const user = getAuth().currentUser;
    if (!user) return;
  
    const ref = doc(db, 'users', user.uid);
    try {
      await updateDoc(ref, {
        'artistly.won': increment(1),
        'artistly.played': increment(1),
      });
    } catch (error) {
      console.error('Failed to update Artistly stats:', error);
    }
  };
  
  const onGuessSubmit = () => {
    if (guess === currentArtist?.id) {  // win
      setGuess('');
      setCorrectDebut(true);
      setCorrectMembers(true);
      setCorrectPopularity(true);
      setCorrectGender(true);
      setCorrectGenre(true);
      setCorrectNationality(true);
      setGameStatus('won');
      incrementArtistlyStats();
    } else if (triesLeft > 1) { // determine if guessed artist has some correct attributes
      let guessedArtist = allArtists.find(artist => artist.id === guess);
      if (guessedArtist?.Debut === currentArtist?.Debut) {
        setCorrectDebut(true);
      } else {
        if (guessedArtist?.Debut && currentArtist?.Debut && guessedArtist.Debut < currentArtist.Debut) {
          setDebutLessThan(true);
        } else {
          setDebutLessThan(false);
        }
      }
      if (guessedArtist?.Members === currentArtist?.Members) {
        setCorrectMembers(true);
      }
      if (guessedArtist?.Popularity === currentArtist?.Popularity) {
        setCorrectPopularity(true);
      } else {
        if (guessedArtist?.Popularity && currentArtist?.Popularity && guessedArtist.Popularity < currentArtist.Popularity) {
          setPopularityLessThan(true);
        } else {
          setPopularityLessThan(false);
        }
      }
      if (guessedArtist?.Gender === currentArtist?.Gender) {
        setCorrectGender(true);
      }
      if (guessedArtist?.Genre === currentArtist?.Genre) {
        setCorrectGenre(true);
      }
      if (guessedArtist?.Nationality === currentArtist?.Nationality) {
        setCorrectNationality(true);
      }
      setTriesLeft(triesLeft - 1);
      setGuess('');
    } else {  // lose
      setGameStatus('lost');
    }
  };

  const onSkip = () => {
    setGameStatus('lost');
    setTriesLeft(0);
  }

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Artistly',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
        }}
      />
      <View style={styles.container}>
         <TouchableOpacity
                style={{
                  position: 'absolute',
                  top: 50,
                  left: 20,
                  padding:10,
                  backgroundColor: '#1DB954', 
                  borderRadius: 20,
                  zIndex: 100,
                }}
                onPress={() => router.back()}
              >
                <Text style={{ color: 'white' }}>BACK</Text>
              </TouchableOpacity>
        <Text style={styles.title}>{gameStatus === 'playing' ? '?' : currentArtist?.id}
        </Text>
        {/* Artist Info Section */}
        <View style={styles.artistInfoContainer}>
          {/* Profile Picture */}
          {gameStatus === 'playing' ? (
            <View style={styles.placeholderImage}>
            </View>
          ) : artistImage ? (
            <Image source={{ uri: artistImage }} style={styles.artistImage} />
          ) : (
            <View style={styles.placeholderImage} />
          )}

          {/* Artist Attributes */}
          <View style={styles.infoBoxes}>
            <View style={[styles.infoBox, correctDebut && styles.correct]}>
              <Text style={styles.boxText}>Debut:{'\n'}
                {gameStatus === 'playing' ? 
                  (correctDebut ? currentArtist?.Debut : triesLeft === 10 ? '?' : debutLessThan ? '⬆️' : '⬇️') :
                  currentArtist?.Debut
                }
              </Text>
            </View>
            <View style={[styles.infoBox, correctMembers && styles.correct]}>
              <Text style={styles.boxText}>Members:{'\n'}
                {gameStatus === 'playing' ? 
                  (correctMembers ? currentArtist?.Members : '?') :
                  currentArtist?.Members
                }
              </Text>
            </View>
            <View style={[styles.infoBox, correctPopularity && styles.correct]}>
              <Text style={styles.boxText}>Popularity:{'\n'}
                {gameStatus === 'playing' ? 
                  (correctPopularity ? '#' + currentArtist?.Popularity : triesLeft === 10 ? '?' : popularityLessThan ? '⬆️' : '⬇️') :
                  '#' + currentArtist?.Popularity
                }
              </Text>
            </View>
            <View style={[styles.infoBox, correctGender && styles.correct]}>
              <Text style={styles.boxText}>Gender:{'\n'}
                {gameStatus === 'playing' ? 
                  (correctGender ? currentArtist?.Gender : '?') :
                  currentArtist?.Gender
                }
              </Text>
            </View>
            <View style={[styles.infoBox, correctGenre && styles.correct]}>
              <Text style={styles.boxText}>Genre:{'\n'}
                {gameStatus === 'playing' ? 
                  (correctGenre ? currentArtist?.Genre : '?') :
                  currentArtist?.Genre
                }
              </Text>
            </View>
            <View style={[styles.infoBox, correctNationality && styles.correct]}>
              <Text style={styles.boxText}>Nationality:{'\n'}
                {gameStatus === 'playing' ? 
                  (correctNationality ? currentArtist?.Nationality : '?') :
                  currentArtist?.Nationality
                }
              </Text>
            </View>
          </View>
        </View>
        
        {/* Game Status */}
        {gameStatus !== 'playing' && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerTitle}>
                  {gameStatus === 'won' ? 'Correct! 🎉' : '❌'}
                </Text>
                <Text style={styles.answerText}>Artist: {currentArtist?.id}</Text>
              </View>
        )}

        {/* Guess Input */}
        {gameStatus === 'playing' && <TextInput
          style={styles.input}
          placeholder="Enter artist name..."
          placeholderTextColor="#aaa"
          value={guess}
          onChangeText={setGuess}
        />}

        {/* Buttons */}
        {gameStatus === 'playing' && <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onGuessSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>}
        {/* Tries Left */}
        {gameStatus === 'playing' && <Text style={styles.triesText}>Tries Left: {triesLeft}</Text>}
        {(gameStatus === 'won' || gameStatus === 'lost') && <TouchableOpacity style={styles.newGameButton} onPress={newGame}>
          <Text style={styles.newGameButtonText}>New Game</Text>
        </TouchableOpacity>}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  artistInfoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  artistImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#444',
    marginBottom: 16,
  },
  infoBoxes: {
    width: '90%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  infoBox: {
    backgroundColor: '#444',
    borderRadius: 8,
    width: '30%',
    paddingVertical: 12,
    marginVertical: 6,
    alignItems: 'center',
  },
  correct: {
    backgroundColor: '#1DB954',
  },
  incorrect: {
    backgroundColor: '#FF0000',
  },
  boxText: {
    color: '#ccc',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#555',
    color: '#fff',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  triesText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  answerContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
  },
  answerTitle: {
    fontSize: 24,
    color: '#1DB954',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  newGameButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  newGameButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
