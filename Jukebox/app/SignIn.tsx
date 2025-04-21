import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function SignIn() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.signUpButton}
          onPress={() => router.push('/SignUpScreen')}
        >
          <Text style={styles.signUpButtonText}>Sign Up Free</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.googleButton}>
          <Image 
            source={require('@/assets/images/googlelogo.webp')}
            style={styles.googleLogo}
          />
          <Text style={styles.googleButtonText}>Continue with Google</Text>
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
  googleButton: {
    width: 256,
    paddingVertical: 12,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  googleLogo: {
    width: 20,
    height: 20,
  },
  googleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});



