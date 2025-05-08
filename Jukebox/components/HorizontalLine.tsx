import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 2.5, 
    backgroundColor: '#FFFFFF', 
    width: '100%',
    alignSelf: 'center', 
  },
});

export default HorizontalLine;