import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { useWindowDimensions } from 'react-native';
import HomeIcon from '@/assets/navBar_Icons/Home_Icon_NB.svg'; 
import SearchIcon from '@/assets/navBar_Icons/Search_Icon_NB.svg'; 
import PostIcon from '@/assets/navBar_Icons/Post_Icon_NB.svg';
import GameIcon from '@/assets/navBar_Icons/Game_Icon_NB.svg'; 
import ProfileIcon from '@/assets/navBar_Icons/Profile_Icon_NB.svg'; 
import PostPopup from '@/components/postingComponent';




const NavigationBar = () => {
  const [isPostPopUpVisible, setIsPostPopUpVisible] = useState(false);

  const handlePostPress = () => {
    setIsPostPopUpVisible(true);
  };

  const handleClosePostPopUp = () => {
    setIsPostPopUpVisible(false);
  };

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <TouchableOpacity>
          <HomeIcon width={scale(44)} height={scale(44)} />
        </TouchableOpacity>
      </Link>

      <Link href="/searchPage" asChild>
        <TouchableOpacity>
          <SearchIcon width={scale(48)} height={scale(48)} />
        </TouchableOpacity>
      </Link>

      <TouchableOpacity onPress={handlePostPress}>
        <PostIcon width={scale(44)} height={scale(44)} />
      </TouchableOpacity>
      {/* <Link href="/postPage" asChild>
        <TouchableOpacity>
          <PostIcon width={scale(44)} height={scale(44)} />
        </TouchableOpacity>
      </Link> */}

      <Link href="/gamePage" asChild>
        <TouchableOpacity>
          <GameIcon width={scale(46)} height={scale(46)} />
        </TouchableOpacity>
      </Link>

      <Link href="/profilePage" asChild>
        <TouchableOpacity>
          <ProfileIcon width={scale(44)} height={scale(44)} />
        </TouchableOpacity>
      </Link>

      <PostPopup 
        visible={isPostPopUpVisible} 
        onClose={handleClosePostPopUp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 0, 
    width: '100%',
    height: scale(60), 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000', 
  },
  tab: {
    alignItems: 'center',
    flex: 1, 
},
});

export default NavigationBar;