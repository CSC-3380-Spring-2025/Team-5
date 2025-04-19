import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const songs = [
  { title: "Blinding Lights", uri: require('../assets/Songs/blinding_lights.mp3') },
  { title: "Revenge", uri: require('../assets/Songs/revenge.mp3') },
  { title: "Moonlight", uri: require('../assets/Songs/moonlight.mp3') },
  { title: "Circles", uri: require('../assets/Songs/circles.mp3') },
  { title: "Steve's Lava Chicken", uri: require('../assets/Songs/steves_lava_chicken.mp3') },
  { title: "Stay", uri: require('../assets/Songs/stay.mp3') },
];


export default function SonglyPage() {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState<boolean[]>([]);
  const [snippet, setSnippet] = useState(1);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCorrectPopup, setShowCorrectPopup] = useState(false);

  const currentSong = songs[currentIndex];

  const getHintDisplay = (title: string): string =>
    title.replace(/[a-zA-Z]/g, '_').split('').join(' ');

  const handlePlay = async () => {
    if (sound) await sound.unloadAsync();
  
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        currentSong.uri,
        { shouldPlay: true }
      );
      setSound(newSound);
  
      setTimeout(async () => {
        await newSound.stopAsync();
      }, snippet * 1000);
    } catch (e) {
      console.error('Audio error:', e);
    }
  };

  const handleGuessSubmit = () => {
    const isCorrect =
      guess.trim().toLowerCase() === currentSong.title.toLowerCase();
  
    setAttempts((prev) => [...prev, isCorrect]);
    setGuess('');
  
    if (isCorrect) {
      setShowCorrectPopup(true);
  
      setTimeout(() => {
        setShowCorrectPopup(false);
        moveToNextSong();
      }, 1500);
    } else if (snippet >= 4) {
      moveToNextSong();
    } else {
      setSnippet(snippet + 1);
    }
  };
  
  const handleSkip = () => {
    setAttempts((prev) => [...prev, false]);

    if (snippet >= 4) {
      moveToNextSong();
    } else {
      setSnippet(snippet + 1);
    }
  };

  const moveToNextSong = () => {
    setGuess('');
    setSnippet(1);
    setAttempts([]);
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  {showCorrectPopup && (
    <View style={styles.popup}>
      <Text style={styles.popupText}>Correct! 🎉</Text>
    </View>
  )}
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>SONGLY</Text>

      <TouchableOpacity style={styles.playButton} onPress={handlePlay}>
        <FontAwesome name="play" size={40} color="#111" />
      </TouchableOpacity>

      <Text style={styles.timer}>{snippet} Second{snippet > 1 ? 's' : ''}</Text>

      <Text style={styles.hint}>Hint</Text>
      <Text style={styles.hintText}>{getHintDisplay(currentSong.title)}</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Guess the song"
          placeholderTextColor="#aaa"
          value={guess}
          onChangeText={setGuess}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.btnText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitBtn} onPress={handleGuessSubmit}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressRow}>
        {attempts.map((result, i) => (
          <View key={i} style={styles.circle}>
            <Text style={result ? styles.check : styles.cross}>
              {result ? '✓' : '✕'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.navBar}>
        <Ionicons name="home-outline" size={26} color="#fff" />
        <Ionicons name="search" size={26} color="#fff" />
        <Ionicons name="add-circle-outline" size={26} color="#fff" />
        <Ionicons name="game-controller-outline" size={26} color="#fff" />
        <Ionicons name="person-outline" size={26} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#ff5e5e',
    width: 250,
    height: 250,
    borderRadius: 400,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  timer: {
    color: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  hint: {
    color: '#aaa',
    marginTop: 10,
  },
  hintText: {
    color: '#fff',
    fontSize: 22,
    letterSpacing: 4,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  skipBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitBtn: {
    backgroundColor: '#aaaaff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    color: '#111',
    fontWeight: 'bold',
  },
  progressRow: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 10,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  check: {
    color: '#00ff00',
    fontSize: 22,
  },
  cross: {
    color: '#ff3333',
    fontSize: 22,
  },
  popup: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -100 }],
    width: 200,
    padding: 20,
    backgroundColor: '#00cc88',
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 100,
    elevation: 5,
  },
  popupText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  navBar: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#222',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
