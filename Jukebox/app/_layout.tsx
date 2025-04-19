import React, { useEffect } from 'react';
import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from '@/components/NavigationBar';
import { StatusBar } from 'expo-status-bar';
import { Redirect } from 'expo-router';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in screen when app starts
    router.replace('/SignIn');
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <StatusBar style="light" translucent={true} /> {/*Fills top background for android phones*/}
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "black", 
        },
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
          fontSize: 32,
        },
        headerTitleAlign: "center",
        headerBackVisible: false,
      }}/>
      <NavigationBar />
    </SafeAreaView>
  );
}
