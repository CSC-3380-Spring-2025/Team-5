import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Define interfaces for our component props and data structure
interface MusicItem {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
}

interface FeaturedListProps {
  title: string;
  items: MusicItem[];
}

// Each Featured List will contain a title and an array of 5 items (those items being arists, songs, or albums)
const FeaturedList: React.FC<FeaturedListProps> = ({ title, items }) => {
  // This function renders star ratings (1-5)
  const renderStars = (rating: number): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    const fullStars: number = Math.floor(rating);
    const hasHalfStar: boolean = rating - fullStars >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <AntDesign 
          key={`star-${i}`} 
          name="star" 
          size={8} 
          color="#FFD700" 
          style={styles.starIcon} 
        />
      );
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <AntDesign 
          key="half-star" 
          name="staro" 
          size={8} 
          color="#FFD700" 
          style={styles.starIcon} 
        />
      );
    }
    
    // Add empty stars to make total of 5
    const emptyStars: number = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <AntDesign 
          key={`empty-star-${i}`} 
          name="staro" 
          size={16} 
          color="#FFD700" 
          style={styles.starIcon} 
        />
      );
    }
    
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Featured List Title */}
      <Text style={styles.title}>{title}</Text>
      {/* Horizonal Scroll List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            {/* Associated Image (this will be artist pfp, song cover, or album cover) */}
            <Image 
              source={{ uri: item.imageUrl }} 
              style={styles.coverImage}
              resizeMode="cover"
            />
            
            {/* Star rating */}
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
            
            {/* Name of album, artist, or song */}
            {item.name && (
              <Text numberOfLines={1} style={styles.itemName}>
                {item.name}
              </Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Styling for the featured list
const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
    color: 'white'
  },
  itemContainer: {
    marginRight: 0,
    width: 120, 
    alignItems: 'center',
  },
  coverImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 6,
    justifyContent: 'center',
  },
  starIcon: {
    marginHorizontal: 1,
  },
  itemName: {
    marginTop: 4,
    fontFamily: 'Inter',
    fontSize: 12,
    textAlign: 'center',
    width: '100%',
    color: 'white'
  },
});

// Example of what it would look like using placeholders
// You can see what it looks like by putting <ExampleFeaturedList /> in index
const ExampleFeaturedList: React.FC = () => {
  const featuredAlbums: MusicItem[] = [
    {
      id: '1',
      name: 'In Rainbows',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/14/Inrainbowscover.png/220px-Inrainbowscover.png',
      rating: 4.5,
    },
    {
      id: '2',
      name: 'Random Access Memories',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/26/Daft_Punk_-_Random_Access_Memories.png/220px-Daft_Punk_-_Random_Access_Memories.png',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Bad',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Michael_Jackson_-_Bad.png/220px-Michael_Jackson_-_Bad.png',
      rating: 5.0,
    },
    {
      id: '4',
      name: 'Damn',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/51/Kendrick_Lamar_-_Damn.png/220px-Kendrick_Lamar_-_Damn.png',
      rating: 4.9,
    },
    {
      id: '5',
      name: 'Channel Orange',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Channel_ORANGE.jpg/220px-Channel_ORANGE.jpg',
      rating: 4.7,
    }
  ];

  return <FeaturedList title="Albums" items={featuredAlbums} />;
};

export default ExampleFeaturedList;