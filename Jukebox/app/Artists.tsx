import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ListViewPage from '@/components/listViewPage';

export default function artistsPage() {
 return (
   <View style={styles.container}>
     <ListViewPage />
   </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});