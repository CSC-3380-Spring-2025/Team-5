import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function SonglyPage() {
  const [guess, setGuess] = useState('');
  const [currentTry, setCurrentTry] = useState(0);

 
  const maxTries = 6;
  const guesses = Array.from({ length: maxTries }, (_, i) => i < currentTry ? `Guess ${i + 1}` : '');

  return (
    <View style={styles.container}>
     
      <Text style={styles.title}>Songly</Text>

     
      <View style={styles.guessContainer}>
        {guesses.map((g, idx) => (
          <View key={idx} style={styles.guessBox}>
            <Text style={styles.guessText}>{g || ''}</Text>
          </View>
        ))}
      </View>

    
      <View style={styles.timelineContainer}>
        <View style={[styles.timelineSegment, { flex: 1 }]} />
        <View style={[styles.timelineSegment, { flex: 2 }]} />
        <View style={[styles.timelineSegment, { flex: 4 }]} />
        <View style={[styles.timelineSegment, { flex: 8 }]} />
        <View style={[styles.timelineSegment, { flex: 15 }]} />
      </View>

    
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={24} color="#fff" />
      </TouchableOpacity>

 
      <TextInput
        style={styles.input}
        placeholder="Enter song name..."
        placeholderTextColor="#aaa"
        value={guess}
        onChangeText={setGuess}
      />


      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  guessContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  guessBox: {
    width: '90%',
    height: 40,
    backgroundColor: '#444',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  guessText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timelineContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginVertical: 16,
  },
  timelineSegment: {
    backgroundColor: '#555',
    height: '100%',
    marginHorizontal: 1,
  },
  playButton: {
    backgroundColor: '#1DB954',
    borderRadius: 50,
    padding: 12,
    marginBottom: 20,
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
});
