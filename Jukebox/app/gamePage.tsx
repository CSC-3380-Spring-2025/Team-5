import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { scale } from 'react-native-size-matters';
import AlbumlyButton from '@/assets/gamePage_Icons/Albumly.svg'; 
import ArtistlyButton from '@/assets/gamePage_Icons/Artistly.svg'; 
import SonglyButton from '@/assets/gamePage_Icons/Songly.svg'; 
import Trophy from '@/assets/gamePage_Icons/Trophy.svg';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function GamePage() {
  const [wins, setWins] = useState({
    albumly: 0,
    artistly: 0,
    songly: 0,
  });
  useFocusEffect(
    useCallback(() => {
      const fetchWins = async () => {
        const user = getAuth().currentUser;
        if (!user) return;
    
        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          console.log("👀 Firestore user data:", data);
  
          setWins({
            albumly: data.albumly?.won ?? 0,
            artistly: data.artistly?.won ?? 0,
            songly: data.songly?.won ?? 0,
          });
        }
      };
  
      fetchWins();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Games" }} />

      <View style={styles.buttonRow}>
  <Link href="/albumly" asChild>
    <TouchableOpacity activeOpacity={0.7}>
      <AlbumlyButton width={scale(285)} height={scale(97)} />
    </TouchableOpacity>
  </Link>
  <View style={styles.trophyContainer}>
    <Text style={styles.winsText}>{wins.albumly}</Text>
    <Trophy width={scale(52)} height={scale(52)} />
  </View>
</View>


<View style={styles.buttonRow}>
  <Link href="/artistly" asChild>
    <TouchableOpacity activeOpacity={0.7}>
      <ArtistlyButton width={scale(285)} height={scale(97)} />
    </TouchableOpacity>
  </Link>
  <View style={styles.trophyContainer}>
    <Text style={styles.winsText}>{wins.artistly}</Text>
    <Trophy width={scale(52)} height={scale(52)} />
  </View>
</View>


<View style={styles.buttonRow}>
  <Link href="/songly" asChild>
    <TouchableOpacity activeOpacity={0.7}>
      <SonglyButton width={scale(285)} height={scale(97)} />
    </TouchableOpacity>
  </Link>
  <View style={styles.trophyContainer}>
    <Text style={styles.winsText}>{wins.songly}</Text>
    <Trophy width={scale(52)} height={scale(52)} />
  </View>
</View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: scale(32),
    marginLeft: scale(-60),
  },
  trophyContainer: {
    marginLeft: scale(10),
    alignItems: 'center',
  },
  winsText: {
    color: '#FFD700',
    fontSize: scale(14),
    fontWeight: 'bold',
    marginBottom: scale(4),
  },
});
