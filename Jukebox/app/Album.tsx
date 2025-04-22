import ListViewPage from '@/components/listViewPage';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';


export default function albumPage() {
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
