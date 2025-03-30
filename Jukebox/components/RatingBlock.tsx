import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface RatingBlockProps {
  rating: number; // e.g., 8.3
  totalRatings: number; // e.g., 143000
  maxStars?: number; // default 10 for this style
  starSize?: number;
}

const RatingBlock: React.FC<RatingBlockProps> = ({
  rating,
  totalRatings,
  maxStars = 10,
  starSize = 18,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  const formatRatings = (num: number): string => {
    if (num >= 1000) return `${Math.round(num / 1000)}k`;
    return num.toString();
  };

  const renderStars = () => {
    const stars: JSX.Element[] = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesome key={`full-${i}`} name="star" size={starSize} color="#fff" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesome key="half" name="star-half-full" size={starSize} color="#fff" />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesome key={`empty-${i}`} name="star-o" size={starSize} color="#fff" />
      );
    }

    return stars;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerRow}>
        <Text style={styles.largeRating}>{rating.toFixed(1)}</Text>
        <Text style={styles.totalRatings}>{formatRatings(totalRatings)}</Text>
      </View>
      <View style={styles.starsRow}>{renderStars()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  largeRating: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  totalRatings: {
    fontSize: 16,
    color: 'gray',
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
});

export default RatingBlock;
