
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { addToFavorites } from '@/utils/addToFavorites';

type Props = {
  type: 'track' | 'album' | 'artist';
  id: string;
};

export default function FavoriteButton({ type, id }: Props) {
  const handlePress = async () => {
    await addToFavorites(type, id);
    alert('Added to favorites!');
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>❤️ Favorite</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B57EDC',
    padding: 10,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
