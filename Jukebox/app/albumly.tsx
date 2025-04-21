import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';

interface Album {
  id: number;
  name: string;
  artist: string;
  imageUrl: string;
}

const albums: Album[] = [
  {
    id: 1,
    name: "Thriller",
    artist: "Michael Jackson",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97"
  },
  {
    id: 2,
    name: "Abbey Road",
    artist: "The Beatles",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25"
  },
  {
    id: 3,
    name: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe"
  },
  {
    id: 4,
    name: "Rumours",
    artist: "Fleetwood Mac",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b27357df7ce0eac715cf70e519a7"
  },
  {
    id: 5,
    name: "Graduation",
    artist: "Kanye",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273675561f3defd1d5a551936a8"
  },
  {
    id: 6,
    name: "Currents",
    artist: "Tame Impala",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2739e1cfc756886ac782e363d79"
  },
  {
    id: 7,
    name: "Take Care",
    artist: "Drake",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273ac0c2daf1867b0d86cca74be"
  },
  {
    id: 8,
    name: "Bad",
    artist: "Michael Jackson",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2731e2e5176d6d1076f24e2c860"
  },
  {
    id: 9,
    name: "21",
    artist: "Adele",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b273744ea41a7c1ae57024752db9"
  },
  {
    id: 10,
    name: "Discovery",
    artist: "Daft Punk",
    imageUrl: "https://i.scdn.co/image/ab67616d0000b2732c25dad9f8fd54652f7ba5df"
  }
];

export default function AlbumGuessingGame() {
  const [guess, setGuess] = useState('');
  const [triesLeft, setTriesLeft] = useState(5);
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null);
  const [blurLevel, setBlurLevel] = useState(30);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
 
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    setCurrentAlbum(randomAlbum);
    setBlurLevel(30);
    setTriesLeft(5);
    setGuess('');
    setGameStatus('playing');
    setImageLoading(true);
    setImageError(false);
  };

  const useTry = () => {
    const newTries = triesLeft - 1;
    setTriesLeft(newTries);
    setBlurLevel(prevBlur => prevBlur - 5);
    
    if (newTries === 0) {
      setGameStatus('lost');
    }
  };

  const handleSubmit = () => {
    if (!currentAlbum || !guess.trim()) return; 
    
    if (guess.toLowerCase() === currentAlbum.name.toLowerCase()) {
      setGameStatus('won');
    } else {
      useTry(); 
    }
  };

  const handleSkip = () => {
    useTry(); 
    setGuess('');
  };
  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <View style={styles.container}>
      {currentAlbum && (
        <>

          {}
          <View style={styles.albumArtContainer}>
            {imageLoading && (
              <ActivityIndicator size="large" color="#1DB954" style={styles.loader} />
            )}
            
            {imageError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Album Art Not Available</Text>
              </View>
            ) : (
              <Image 
                source={{ uri: currentAlbum.imageUrl }}
                blurRadius={gameStatus !== 'playing' ? 0 : blurLevel} 
                style={[styles.albumArt, imageLoading && styles.hidden]}
                resizeMode="cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </View>

          {}
          {gameStatus !== 'playing' && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerTitle}>
                {gameStatus === 'won' ? 'Correct! 🎉' : '❌'}
              </Text>
              <Text style={styles.answerText}>Album: {currentAlbum.name}</Text>
              <Text style={styles.answerText}>Artist: {currentAlbum.artist}</Text>
            </View>
          )}

          {}
          <TextInput
            style={styles.input}
            placeholder="Enter album name..."
            placeholderTextColor="#aaa"
            value={guess}
            onChangeText={setGuess}
            editable={gameStatus === 'playing'}
            onSubmitEditing={() => guess.trim() && handleSubmit()}        
            />
          
          {}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, triesLeft === 0 && styles.disabledButton]} 
              onPress={handleSkip}
              disabled={gameStatus !== 'playing' || triesLeft === 0}
            >
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, gameStatus !== 'playing' && styles.disabledButton]} 
              onPress={handleSubmit}
              disabled={gameStatus !== 'playing'}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          
          {}
          <Text style={styles.triesText}>Tries Left: {triesLeft}</Text>
          
          {}
          {gameStatus !== 'playing' && (
            <TouchableOpacity style={styles.newGameButton} onPress={startNewGame}>
              <Text style={styles.buttonText}>New Album</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumArtContainer: {
    width: 300,
    height: 300,
    backgroundColor: '#222',
    marginBottom: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  albumArt: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hidden: {
    opacity: 0,
  },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#555',
    color: '#fff',
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#222',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    minWidth: 100,
  },
  disabledButton: {
    opacity: 0.6,
  },
  newGameButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
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
});