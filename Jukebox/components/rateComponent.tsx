import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type RatingPopupProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
};

export default function RatingPopup({ visible, onClose, onSubmit }: RatingPopupProps) {
  const [rating, setRating] = useState<number>(0);

  const handleStarPress = (index: number, event: GestureResponderEvent) => {
    const { locationX } = event.nativeEvent;
    const starWidth = 40;
    const isHalf = locationX < starWidth / 2;
    const selectedRating = isHalf ? index - 0.5 : index;
    setRating(selectedRating);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFull = rating >= i;
      const isHalf = rating + 0.5 >= i && rating < i;

      stars.push(
        <Pressable
          key={i}
          onPressIn={(e) => handleStarPress(i, e)}
          style={{ marginHorizontal: 5, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
        >
          <Ionicons
            name={isFull ? 'star' : isHalf ? 'star-half' : 'star-outline'}
            size={40}
            color="white"
          />
        </Pressable>
      );
    }
    return stars;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#111', padding: 20, borderRadius: 20, width: '80%', alignItems: 'center' }}>
          <Text style={{ fontSize: 22, marginBottom: 20, fontWeight: 'bold', color: 'white' }}>Rate</Text>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            {renderStars()}
          </View>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: '#333', borderRadius: 10 }}
              onPress={onClose}
            >
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10, backgroundColor: '#4CAF50', borderRadius: 10 }}
              onPress={() => onSubmit(rating)}
            >
              <Text style={{ color: 'white' }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
