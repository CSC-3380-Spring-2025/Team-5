import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (uri: string) => void;
};

const imageOptions = [
  { file: require('../assets/PFP/pfp1.jpeg'), name: 'pfp1.jpeg' },
  { file: require('../assets/PFP/pfp2.jpeg'), name: 'pfp2.jpeg' },
  { file: require('../assets/PFP/pfp3.jpeg'), name: 'pfp3.jpeg' },
  { file: require('../assets/PFP/pfp4.jpeg'), name: 'pfp4.jpeg' },
];



export default function ProfilePicture({ visible, onClose, onSave }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSave = () => {
    if (selected !== null) {
      const selectedImage = imageOptions[selected];
      onSave(selectedImage.name);
      onClose();
    }
  };
  
  

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Choose a Picture</Text>
          <FlatList
            data={imageOptions}
            keyExtractor={(_, i) => i.toString()}
            numColumns={2}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelected(index)}
                style={[
                  styles.imageWrap,
                  selected === index && styles.selected,
                ]}
              >
                <Image source={item.file} style={styles.image} />
              </TouchableOpacity>
            )}
          />
          <View style={styles.actions}>
            <TouchableOpacity onPress={onClose} style={styles.cancel}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave} style={styles.save}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '85%',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 14,
    textAlign: 'center',
  },
  imageWrap: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: '#B57EDC',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  cancel: {
    backgroundColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  save: {
    backgroundColor: '#B57EDC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
