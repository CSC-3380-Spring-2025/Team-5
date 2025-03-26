// components/HorizontalLine.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizontalLine = () => {
  return <View style={styles.line} />;
};

const styles = StyleSheet.create({
  line: {
    height: 2.5, // Thickness of the line
    backgroundColor: '#FFFFFF', // Grey color
    width: '100%', // Width of the line
    alignSelf: 'center', // Center the line horizontally
  },
});

export default HorizontalLine;