import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const PostPopup = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [caption, setCaption] = useState('');
  const [selectedItem, setSelectedItem] = useState<{title: string; artist: string} | null>(null);

  const handleSelectItem = () => {
    // Placeholder for Spotify API integration
    // In future, this will open a Spotify search modal
    setSelectedItem({
      title : 'Placeholder Song Title',
      artist: 'Placeholder Artist'
    });
  };

  const handleSubmit = () => {
  // Placeholder - post action disabled for now
};

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Create Post</Text>

          <TouchableOpacity style={styles.selectButton} onPress={handleSelectItem}>
            <FontAwesome name="music" size={20} color="white" />
            <Text style={styles.selectButtonText}>
              {selectedItem ? `${selectedItem.title} - ${selectedItem.artist}` : 'Select Song or Album (via Spotify)'}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#aaa"
            multiline
            value={caption}
            onChangeText={setCaption}
          />

          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.postButton}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  popup: {
    backgroundColor: 'white',
    padding: 20,
    width: '85%',
    borderRadius: 12,
    elevation: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15
  },
  selectButtonText: {
    color: 'white',
    marginLeft: 10
  },
  captionInput: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 15
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    marginRight: 15
  },
  postButton: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6
  },
  buttonText: {
    color: 'white'
  }
});

export default PostPopup;
