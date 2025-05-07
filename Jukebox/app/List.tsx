import React from 'react';
import { View, StyleSheet } from 'react-native';
import ListsScreen from '../components/listComponent'; // ✅ This is the correct relative path

export default function ListPage() {
  return (
    <View style={styles.container}>
      <ListsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
