import { Stack } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from './Components/NavBar';

export default function RootLayout() {
  return 
  <SafeAreaView style={{ flex: 1 }}>
  <Stack />;
  <NavBar />
  </SafeAreaView>
}
