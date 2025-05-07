import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { useWindowDimensions } from 'react-native';
import HomeIcon from '@/assets/navBar_Icons/Home_Icon_NB.svg'; // Updated path
import SearchIcon from '@/assets/navBar_Icons/Search_Icon_NB.svg'; // Updated path
import PostIcon from '@/assets/navBar_Icons/Post_Icon_NB.svg'; // Updated path
import GameIcon from '@/assets/navBar_Icons/Game_Icon_NB.svg'; // Updated path
import ProfileIcon from '@/assets/navBar_Icons/Profile_Icon_NB.svg'; // Updated path




const NavigationBar = () => {
  
  return (
    <View style={styles.container}>
      {/* Home Icon */}
      <Link href="/" asChild>
        <TouchableOpacity>
          <HomeIcon width={scale(44)} height={scale(44)} />
        </TouchableOpacity>
      </Link>

      {/* Search Icon */}
      <Link href="/searchPage" asChild>
        <TouchableOpacity>
          <SearchIcon width={scale(48)} height={scale(48)} />
        </TouchableOpacity>
      </Link>

      {/* Post Icon */}
      <Link href="/postPage" asChild>
        <TouchableOpacity>
          <PostIcon width={scale(44)} height={scale(44)} />
        </TouchableOpacity>
      </Link>

      {/* Game Icon */}
      <Link href="/gamePage" asChild>
        <TouchableOpacity>
          <GameIcon width={scale(46)} height={scale(46)} />
        </TouchableOpacity>
      </Link>

      {/* Profile Icon */}
      <Link href="/profilePage" asChild>
        <TouchableOpacity>
          <ProfileIcon width={scale(44)} height={scale(44)} />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', // Add this
    bottom: 0, // Stick to the bottom
    width: '100%',
    height: scale(60), // Adjust the height according to your needs
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000', // Temporary background color
  },
  tab: {
    alignItems: 'center',
    flex: 1, // Distribute space evenly
},
});

export default NavigationBar;