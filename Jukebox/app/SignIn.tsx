import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { router, Stack } from "expo-router";

export default function SignIn() {
  return (
    
    <View style={styles.container}>
      <Stack.Screen options={{ title: "" }} />
      <Text style={styles.title}>Welcome to Jukebox!</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => router.push('/SignUpScreen')}
        >
          <Text style={styles.signUpButtonText}>Sign Up Free</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/LoginPage')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 16,
  },
  signUpButton: {
    width: 256,
    paddingVertical: 12,
    backgroundColor: '#D8B6FF',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  signUpButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



