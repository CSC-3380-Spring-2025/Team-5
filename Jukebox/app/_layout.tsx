import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationBar }from '@/components/NavigationBar';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
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
