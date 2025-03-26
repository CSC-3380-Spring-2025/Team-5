import React, { useState } from 'react';
import{
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

export default function SignUpScreen() {
    const[email, setEmail]= useState('');
    const[password, setPassword]=useState('');

return(
    <SafeAreaView style={styles.container}>
    <View style={styles.form}> 
    <Text style={styles.heading}>Sign Up For Jukebox!</Text>
    <TextInput
    style={styles.input}
    placeholder="Enter here..."
    placeholderTextColor="#888"
    value={email}
    onChangeText={setEmail}
    />
    <TextInput
          style={styles.input}
          placeholder="Enter here..."
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button}>
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
