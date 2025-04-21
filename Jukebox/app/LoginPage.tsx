import React, { useState } from 'react';
import{
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { router } from 'expo-router';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (): Promise<void> => {
      try {
          const usersRef = collection(db, 'users');
          const q = query(usersRef, where('username', '==', username));
          const querySnapshot = await getDocs(q);
          
          if (querySnapshot.empty) {
              Alert.alert('Error', 'Username not found');
              return;
          }

          const userDoc = querySnapshot.docs[0];
          const userEmail = userDoc.data().email;

          await signInWithEmailAndPassword(auth, userEmail, password);
          Alert.alert('Success', 'Logged in successfully!');
          console.log('Logged in successfully!');
          router.replace('/');
      } catch (error: any) {
          Alert.alert('Error', error.message);
          console.log('Error logging in:', error.message);
      }
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.form}> 
        <Text style={styles.heading}>Sign in to Jukebox!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={styles.jLogo}>Jukebox</Text>
      </View>
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: '#D9A9E2', 
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#B57EDC', 
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#1a1a1a',
    fontWeight: 'bold',
    fontSize: 18,
  },
  jLogo: {
    fontSize: 52,
    fontWeight: '900',
    marginTop:30,
    color: '#B57EDC', 
    backgroundColor: '#000',
    padding: 20,
    borderRadius: 50,
    overflow: 'hidden',
    textAlign: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  }
});
