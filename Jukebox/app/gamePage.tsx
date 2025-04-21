import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import AlbumlyButton from '@/assets/gamePage_Icons/Albumly.svg'; 
import ArtistlyButton from '@/assets/gamePage_Icons/Artistly.svg'; 
import SonglyButton from '@/assets/gamePage_Icons/Songly.svg'; 
import Trophy from '@/assets/gamePage_Icons/Trophy.svg';


export default function GamePage() {
 return (
   <View style={styles.container}>
     <Stack.Screen options={{ title: "Games" }} />
     {}
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


     {}
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


     {}
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
   flexDirection: 'row', 
   alignItems: 'flex-end', 
   marginVertical: scale(32), 
   marginLeft: scale(-60), 
  },
 trophyContainer: {
   marginLeft: scale(10),
   marginBottom: scale(0),
 },
});
