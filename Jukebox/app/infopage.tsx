import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import RatingBlock from '@/components/RatingBlock';
import NavigationBar from '@/components/NavigationBar';


const artistImage = 'https://via.placeholder.com/400x200.png?text=Artist+Header';

const featuredTracks = [
  { title: 'Timeless (feat Playboi Carti)', rating: 9.8 },
  { title: 'One Of The Girls (with JEN...)', rating: 6.1 },
  { title: 'Cry For Me', rating: 6.4 },
  { title: 'Sao Paulo (feat. Anitta)', rating: 8.7 },
  { title: 'Starboy', rating: 9.1 },
];

const albums = [
  { title: 'Hurry Up Tomorrow', rating: 7.3 },
  { title: 'Starboy (Deluxe)', rating: 8.1 },
  { title: 'Live At SoFi Stadium', rating: 6.3 },
];

const InfoPage = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {}
        <Image source={{ uri: artistImage }} style={styles.headerImage} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.artistName}>The Weeknd</Text>
          <Text style={styles.artistLabel}>ARTIST</Text>
        </View>

        {}
        <RatingBlock rating={8.3} totalRatings={143000} />

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
      </ScrollView>

      {}
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  scroll: {
    paddingBottom: 100,
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  headerTextContainer: {
    padding: 16,
  },
  artistName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  artistLabel: {
    color: 'hsl(0, 0%, 70%)',
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  itemText: {
    color: 'white',
    fontSize: 15,
    flex: 1,
  },
  itemRating: {
    color: 'white',
    fontSize: 15,
    marginLeft: 12,
  },
  moreText: {
    color: 'hsl(0, 0%, 70%)',
    fontSize: 14,
    marginTop: 8,
  },
});

export default InfoPage;