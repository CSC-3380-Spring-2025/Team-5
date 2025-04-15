import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function SonglyPage() {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState([false, false, false, false, true]); // simulate progress

  const handleGuessSubmit = () => {
    // Handle logic
  };

  const handleSkip = () => {
    // Move to next snippet
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Make Your Daily Guess</Text>

      <TouchableOpacity style={styles.playButton}>
        <FontAwesome name="play" size={70} color="#000" />
      </TouchableOpacity>

      <Text style={styles.timer}>10 Seconds</Text>

      <Text style={styles.hint}>Hint</Text>
      <Text style={styles.hintText}>_ _ _ _ _   _ _ _ _ _</Text>

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
            {result === true && <Text style={styles.check}>✓</Text>}
            {result === false && <Text style={styles.cross}>✕</Text>}
          </View>
        ))}
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
    width: 200,
    height: 200,
    borderRadius: 100,
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
  check: { color: '#00ff00', fontSize: 22 },
  cross: { color: '#ff3333', fontSize: 22 },
});

