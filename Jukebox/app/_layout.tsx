
import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from '@/components/NavigationBar';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';



export default function RootLayout() {
  return (
    <SafeAreaView style={
      { 
        flex: 1
        }
        
        }>
      <Stack />
      <NavigationBar />
    </SafeAreaView>
  );
}

