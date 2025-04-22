import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ListViewPage from '@/components/listViewPage';


export default function songPage() {
 return (
   <View style={styles.container}>
    <Text>Song Page</Text>
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
