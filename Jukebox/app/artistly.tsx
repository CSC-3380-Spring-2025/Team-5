import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function ArtistlyPage() {
  const [guess, setGuess] = useState('');
  const [triesLeft, setTriesLeft] = useState(10);

  const placeholderArtist = {
    pfp: null,
    debutYear: '',
    memberCount: '',
    popularity: '',
    gender: '',
    genre: '',
    origin: '',
  };

  return (
    <View style={styles.container}>
      {}
      <Text style={styles.title}>Artistly</Text>

      {}
      <View style={styles.artistInfoContainer}>
        {}
        {placeholderArtist.pfp ? (
          <Image source={{ uri: placeholderArtist.pfp }} style={styles.artistImage} />
        ) : (
          <View style={styles.placeholderImage} />
        )}

        {}
        <View style={styles.infoBoxes}>
          <View style={styles.infoBox}><Text style={styles.boxText}>Debut</Text></View>
          <View style={styles.infoBox}><Text style={styles.boxText}>Members</Text></View>
          <View style={styles.infoBox}><Text style={styles.boxText}>Popularity</Text></View>
          <View style={styles.infoBox}><Text style={styles.boxText}>Gender</Text></View>
          <View style={styles.infoBox}><Text style={styles.boxText}>Genre</Text></View>
          <View style={styles.infoBox}><Text style={styles.boxText}>Origin</Text></View>
        </View>
      </View>

      {}
      <TextInput
        style={styles.input}
        placeholder="Enter artist name..."
        placeholderTextColor="#aaa"
        value={guess}
        onChangeText={setGuess}
      />

      {}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      {}
      <Text style={styles.triesText}>Tries Left: {triesLeft}</Text>
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
  boxText: {
    color: '#ccc',
    fontWeight: 'bold',
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
});
