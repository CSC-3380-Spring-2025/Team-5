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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';
import { router } from 'expo-router';


export default function SignUpScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleSignUp = async (): Promise<void> => {
      try {
          // Create user with email and password
          const userSignUp = await createUserWithEmailAndPassword(auth, email, password);
          
          // Create user profile in Firestore
          await setDoc(doc(db, 'users', userSignUp.user.uid), {
              username,
              email,
              createdAt: new Date().toISOString(),
              userId: userSignUp.user.uid,
          });

          Alert.alert('Success', 'Account created successfully!');
          console.log('Account created successfully!');
          router.replace('/');
      } catch (error: any) {
          Alert.alert('Error', error.message);
          console.log('Error creating account:', error.message);
      }
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.form}> 
        <Text style={styles.heading}>Sign Up For Jukebox!</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <Text style={styles.jLogo}>Jukebox</Text>
      </View>
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: '#D9A9E2', // light purple
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
    backgroundColor: '#B57EDC', // medium purple
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
    color: '#B57EDC', // purple for brand
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
