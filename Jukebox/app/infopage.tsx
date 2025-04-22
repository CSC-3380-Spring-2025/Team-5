import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import RatingBlock from '@/components/RatingBlock';
import InfoPageBanner from '@/components/infoPageBanner';
import Info from '@/components/info';
import FeaturedSongs from '@/components/featuredSongs';
import SongList from '@/components/songList';

const artistInfo = {
  type: 'album',
  data: {
    artists: ["The Weeknd"],
    tracks: 16,
    releaseDate: "2016-08-26",
    label: "XO",
  }
};

const InfoPage = () => {
  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ headerShown: false }} />
      <InfoPageBanner />
      <RatingBlock rating={8.3} totalRatings={143000} />
      <ScrollView>
        <Info type='album' data={artistInfo.data} />
        <FeaturedSongs />
        <SongList />
      </ScrollView>
        {/* <Info type="album" data={albums} /> */}
      {/* <View>
        

        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FEATURED</Text>
          {featuredTracks.map((track, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemText}>{track.title}</Text>
              <Text style={styles.itemRating}>{track.rating.toFixed(1)}</Text>
            </View>
          ))}
          <TouchableOpacity>
            <Text style={styles.moreText}>See More ▾</Text>
          </TouchableOpacity>
        </View>

        {}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ALBUMS</Text>
          {albums.map((album, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemText}>{album.title}</Text>
              <Text style={styles.itemRating}>{album.rating.toFixed(1)}</Text>
            </View>
          ))}
        </View>
      </View> */}
      <FeaturedSongs />
      {}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  // scroll: {
  //   paddingBottom: 100,
  // },
  // headerImage: {
  //   width: '100%',
  //   height: 200,
  // },
  // headerTextContainer: {
  //   padding: 16,
  // },
  // artistName: {
  //   color: 'white',
  //   fontSize: 28,
  //   fontWeight: 'bold',
  // },
  // artistLabel: {
  //   color: 'hsl(0, 0%, 70%)',
  //   fontSize: 14,
  //   marginTop: 4,
  // },
  // section: {
  //   paddingHorizontal: 16,
  //   paddingVertical: 10,
  // },
  // sectionTitle: {
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  // },
  // itemRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingVertical: 6,
  // },
  // itemText: {
  //   color: 'white',
  //   fontSize: 15,
  //   flex: 1,
  // },
  // itemRating: {
  //   color: 'white',
  //   fontSize: 15,
  //   marginLeft: 12,
  // },
  // moreText: {
  //   color: 'hsl(0, 0%, 70%)',
  //   fontSize: 14,
  //   marginTop: 8,
  // },
});

export default InfoPage;