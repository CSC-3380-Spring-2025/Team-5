import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

const NavBar = () => {
    return (
      <View style={styles.navBar}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/profile" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/games" asChild>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Games</Text>
          </TouchableOpacity>
        </Link>
      </View>
    );
  };
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#333',
      paddingVertical: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    navItem: {
      flex: 1,
      alignItems: 'center',
    },
    navText: {
      color: '#fff',
      fontSize: 16,
    },
  });
  
  export default NavBar;