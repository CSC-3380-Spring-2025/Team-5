import React, { useEffect } from 'react';
import { Stack, usePathname } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from '@/components/NavigationBar';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect to sign-in screen when app starts
    router.replace('/SignIn');
  }, []);

  // List of routes where navigation bar should be hidden
  const hiddenRoutes = ['/SignIn', '/LoginPage', '/SignUpScreen'];

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
      {!hiddenRoutes.includes(pathname) && <NavigationBar />}
    </SafeAreaView>
  );
}
