import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import AlbumButton from '@/assets/profilePage_Icons/AlbumButton.svg'; 
import ArtistsButton from '@/assets/profilePage_Icons/ArtistsButton.svg'; 
import ListButton from '@/assets/profilePage_Icons/ListButton.svg'; 
import SongsButton from '@/assets/profilePage_Icons/SongsButton.svg'; 
import Line from '@/components/HorizontalLine';
import { useEffect, useState } from 'react';
import ProfilePicture from '@/components/ProfilePicture';
import {getAuth, updateProfile} from 'firebase/auth';







export default function ProfilePage() {
const [showModal, setShowModal] = useState(false);
const [profilePicture, setProfilePicture] = useState('pfp.jpeg');
useEffect(() => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user?.photoURL) {
    setProfilePicture(user.photoURL);
  }
}, []);

const imageMap: { [key: string]: any } = {
  'pfp1.jpeg': require('@/assets/PFP/pfp1.jpeg'),
  'pfp2.jpeg': require('@/assets/PFP/pfp2.jpeg'),
  'pfp3.jpeg': require('@/assets/PFP/pfp3.jpeg'),
  'pfp4.jpeg': require('@/assets/PFP/pfp4.jpeg'),
  'pfp.jpeg': require('@/assets/PFP/pfp.jpeg'), 
};



  return (
    <>
      <Stack.Screen options={{ title: "Username" }} />
      <View style={styles.container}>
        {}
        <View style={styles.textRow}>
          <Text style={styles.textF}>Followers</Text>
          <Text style={styles.textF}>Following</Text>
      </View>

      {}
        <View style={styles.numberRow}>
          <Text style={styles.number}>1.2m</Text>
          <Text style={styles.number}>5</Text>
        </View>

      {}
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
          This is a sample bio. It is centered and limited to 100 characters.
        </Text>
      </View>



      {}
      <View style={styles.textColumn}>
        <Text style={styles.textTitle}>Songs</Text>
        <Text style={styles.textTitle}>Artists</Text>
        <Text style={styles.textTitle}>Albums</Text>
      </View>

        {/* Profile Picture */}     
       <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View style={styles.profilePicture}>
            <Image
                source={imageMap[profilePicture] || imageMap['pfp.jpeg']}
                style={styles.profileImage}
            />
          </View>
        </TouchableOpacity>
     </View>




        
        {}
        <View style={styles.linecontainer}>
          <Line />
          <View style={styles.lines} />
          <Line />
          <View style={styles.lines} />
          <Line />
          <View style={styles.lines} />
          <Line />
        </View>

        {}
        <View style={styles.rectangleRow2}>
          <View style={styles.rectangleGolden}>
            <Image
              source={require('@/assets/r21.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleSilver}>
            <Image
              source={require('@/assets/r22.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleBronze}>
            <Image
              source={require('@/assets/r23.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangle}>
            <Image
              source={require('@/assets/r24.jpeg')}
              style={styles.rankImage}
            />
          </View>
        </View>

        {}
        <View style={styles.rectangleRow}>
          <View style={styles.rectangleGolden}>
            <Image
              source={require('@/assets/Top4Songs/r1.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleSilver}>
            <Image
              source={require('@/assets/Top4Songs/r2.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleBronze}>
            <Image
              source={require('@/assets/Top4Songs/r3.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangle}>
            <Image
              source={require('@/assets/Top4Songs/r4.jpeg')}
              style={styles.rankImage}
            />
          </View>
        </View>

        
        <View style={styles.circleRow}>
          <View style={styles.circleGolden}>
            <Image
              source={require('@/assets/Top4Artists/c1.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.circleSilver}>
            <Image
              source={require('@/assets/Top4Artists/c2.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.circleBronze}>
            <Image
              source={require('@/assets/Top4Artists/c3.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={require('@/assets/Top4Artists/c4.jpeg')}
              style={styles.rankImage}
            />
          </View>
        </View>

     
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <Link href="/List" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <ListButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
            <Link href="/Songs" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <SongsButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
            <Link href="/Artists" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <ArtistsButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
            <Link href="/Album" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <AlbumButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
        <ProfilePicture
  visible={showModal}
  onClose={() => setShowModal(false)}
  onSave={async (filename) => {
      setProfilePicture(filename); // update image in UI
    
      const auth = getAuth();
      const user = auth.currentUser;
    
      if (user) {
        await updateProfile(user, {
          photoURL: filename, // save to Firebase
        });
      }
    
      setShowModal(false);
    }}
    
/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  buttonContainer: {
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
  },
  buttons: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingBottom: scale(40), 
  },
  linecontainer: {
    position: 'absolute', 
    top: scale(210), 
    width: '100%', 
  },
  lines: {
    height: scale(105), 
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: scale(-500),
    marginLeft: scale(-110),
  },
  profilePicture: {
    position: 'absolute',
    width: scale(119),
    height: scale(119),
    borderRadius: scale(119 / 2),
    overflow: 'hidden',
    borderWidth: scale(2),
    borderColor: '#FFFFFF',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bioContainer: {
    position: 'absolute',
    alignItems: 'center', 
    marginTop: scale(160), 
    paddingHorizontal: scale(20), 
    marginLeft: scale(30),
  },
  bioText: {
    fontSize: scale(15), 
    color: '#FFFFFF', 
    textAlign: 'center', 
    maxWidth: scale(300), 
  },
  textRow: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: scale(350), 
  },
  textF: {
    fontSize: 20,
    color: '#FFFFFF',
    marginHorizontal: scale(80), 
    marginTop: scale(115), 
  },
  textColumn: {
    marginLeft: scale(0),
    marginTop: scale(55), 
  },
  textTitle: {
    fontSize: 15,
    color: '#FFFFFF',
    height: scale(107), 
  },
  numberRow: {
    flexDirection: 'row', 
    marginLeft: scale(-66), 
  },
  number: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: scale(0), 
    marginHorizontal: scale(106),
  },
  rectangleRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 30, 
    marginTop: scale(-295), 
    marginLeft: scale(17), 
  },
  rectangleRow2: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 30, 
    marginTop: scale(410), 
    marginLeft: scale(17), 
  },
  rectangle: {
    width: scale(70) - 4, 
    height: scale(85) - 4, 
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, 
    borderColor: 'transparent', 
    marginRight: scale(8),
  },
  rectangleGolden: {
    width: scale(70) - 4, 
    height: scale(85) - 4, 
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, 
    borderColor: 'gold', 
    marginRight: scale(8), 
  },
  rankImage: {
    width: '100%',
    height: '100%', 
    resizeMode: 'cover', 
  },
  rectangleSilver: {
    width: scale(70) - 4, 
    height: scale(85) - 4, 
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, 
    borderColor: 'silver', 
    marginRight: scale(8), 
  },
  rectangleBronze: {
    width: scale(70) - 4, 
    height: scale(85) - 4, 
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, 
    borderColor: '#9E7015',
    marginRight: scale(8), 
  },
  circleRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 30, 
    marginTop: scale(32), 
    marginLeft: scale(10), 
  },
  circle: {
    width: scale(76) - 4, 
    height: scale(76) - 4, 
    borderRadius: scale(76 / 2), 
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: 'transparent', 
    marginRight: scale(3), 
  },
  circleGolden: {
    width: scale(78) - 4, 
    height: scale(78) - 4, 
    borderRadius: scale(78 / 2), 
    overflow: 'hidden',
    borderWidth: 3, 
    borderColor: 'gold', 
    marginRight: scale(3), 
  },
  circleSilver: {
    width: scale(78) - 4, 
    height: scale(78) - 4, 
    borderRadius: scale(78 / 2),
    overflow: 'hidden',
    borderWidth: 3, 
    borderColor: 'silver', 
    marginRight: scale(3), 
  },
  circleBronze: {
    width: scale(78) - 4, 
    height: scale(78) - 4, 
    borderRadius: scale(78 / 2), 
    overflow: 'hidden',
    borderWidth: 3, 
    borderColor: '#9E7015', 
    marginRight: scale(3),
  },
});