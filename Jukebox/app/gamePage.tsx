import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import AlbumlyButton from '@/assets/gamePage_Icons/Albumly.svg'; // Updated path
import ArtistlyButton from '@/assets/gamePage_Icons/Artistly.svg'; // Updated path
import SonglyButton from '@/assets/gamePage_Icons/Songly.svg'; // Updated path
import Trophy from '@/assets/gamePage_Icons/Trophy.svg';


export default function GamePage() {
 return (
   <View style={styles.container}>
     {/* Albumly Button with Trophy */}
     <View style={styles.buttonRow}>
       <Link href="/albumly" asChild>
         <TouchableOpacity activeOpacity={0.7}>
           <AlbumlyButton width={scale(285)} height={scale(97)} />
         </TouchableOpacity>
       </Link>
       <View style={styles.trophyContainer}>
         <Trophy width={scale(52)} height={scale(52)} />
       </View>
     </View>


     {/* Artistly Button with Trophy */}
     <View style={styles.buttonRow}>
       <Link href="/artistly" asChild>
         <TouchableOpacity activeOpacity={0.7}>
           <ArtistlyButton width={scale(285)} height={scale(97)} />
         </TouchableOpacity>
       </Link>
       <View style={styles.trophyContainer}>
         <Trophy width={scale(52)} height={scale(52)} />
       </View>
     </View>


     {/* Songly Button with Trophy */}
     <View style={styles.buttonRow}>
       <Link href="/songly" asChild>
         <TouchableOpacity activeOpacity={0.7}>
           <SonglyButton width={scale(285)} height={scale(97)} />
         </TouchableOpacity>
       </Link>
       <View style={styles.trophyContainer}>
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
   backgroundColor: '#808080',
 },
 buttonRow: {
   flexDirection: 'row', // Align button and trophy in a row
   alignItems: 'flex-end', // Align items to the bottom
   marginVertical: scale(32), // Add spacing between rows
   marginLeft: scale(-60), // Move the entire row to the left
  },
 trophyContainer: {
   marginLeft: scale(10), // Add spacing between button and trophy
   marginBottom: scale(0), // Lower the trophy slightly
 },
});
