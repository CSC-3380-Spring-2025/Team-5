import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


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

const FeaturedList: React.FC<FeaturedListProps> = ({ title, items }) => {
  const renderStars = (rating: number): React.ReactNode[] => {
    const stars: React.ReactNode[] = [];
    const fullStars: number = Math.floor(rating);
    const hasHalfStar: boolean = rating - fullStars >= 0.5;
    
    
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
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Image 
              source={{ uri: item.imageUrl }} 
              style={styles.coverImage}
              resizeMode="cover"
            />
            
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
            
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