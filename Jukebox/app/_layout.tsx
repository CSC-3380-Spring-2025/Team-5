import React, { useEffect } from 'react';
import { Stack, usePathname } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import NavigationBar from '@/components/NavigationBar';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { UserProvider } from '@/context/UserContext';


export default function RootLayout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
   
    router.replace('/SignIn');
  }, []);

  // List of routes where navigation bar should be hidden
  const hiddenRoutes = ['/SignIn', '/LoginPage', '/SignUpScreen'];

  return (
    <UserProvider>
    <SafeAreaView 
      style={{ flex: 1 }} 
      edges={hiddenRoutes.includes(pathname) ? [] : ['bottom']}
    >
      <StatusBar style="light" translucent={true} />
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
    </UserProvider> 
  );
}
