import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native'; 
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
import { useUser } from '@/context/UserContext';
import { db } from '@/config/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';


export default function ProfilePage() {
const [showModal, setShowModal] = useState(false);
const [profilePicture, setProfilePicture] = useState('defualtPFP.jpeg');
const { user, setUser } = useUser();
const [showBio, setShowBio] = useState(false);
const [editingBio, setEditingBio] = useState(false);
const [bioText, setBioText] = useState(user?.bio || '');
const [featuredSongs, setFeaturedSongs] = useState<FeaturedItem[]>([]);
const [featuredAlbums, setFeaturedAlbums] = useState<FeaturedItem[]>([]);
const [featuredArtists, setFeaturedArtists] = useState<FeaturedItem[]>([]);



type FeaturedItem = {
  id: string;
  image: string;
};


useEffect(() => {
  if (user?.bio) {
    setBioText(user.bio);
  }
}, [user?.bio]);
useEffect(() => {
  const fetchFeaturedMedia = async () => {
    if (!user?.userId) return;

    try {
      const userRef = doc(db, 'users', user.userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFeaturedSongs((data.featuredSongs || []).slice(0, 4));
        setFeaturedArtists((data.featuredArtists || []).slice(0, 4));
        setFeaturedAlbums((data.featuredAlbums || []).slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching featured media:', error);
    }
  };

  fetchFeaturedMedia();
}, [user?.userId]);

const handleSaveBio = async () => {
  if (!user) return;

  try {
    const userRef = doc(db, 'users', user.userId);
    await updateDoc(userRef, { bio: bioText });

    
    setUser({ ...user, bio: bioText });
    setEditingBio(false);
  } catch (error) {
    console.error('Error saving bio:', error);
  }
};


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
  'pfp.jpeg': require('@/assets/PFP/defaultPFP.jpeg'), 
};



  return (
    <>
      <Stack.Screen options={{ title: `Welcome ${user?.username || ''}` }} />
      <View style={styles.container}>
        {}
        <View style={styles.textRow}>
          <Text style={styles.textF}>Followers</Text>
          <Text style={styles.textF}>Following</Text>
      </View>

      {}
        <View style={styles.numberRow}>
        <Text style={styles.number}>{user?.followers?.length || 0}</Text> 
        <Text style={styles.number}>{user?.following?.length || 0}</Text>
        </View>

      {}
      <View style={styles.bioContainer}>
  {editingBio ? (
    <>
      <TextInput
        style={styles.bioText}
        value={bioText}
        onChangeText={setBioText}
        placeholder="Write something about yourself"
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={handleSaveBio}>
        <Text style={{ color: 'white', marginTop: 10 }}>Save</Text>
      </TouchableOpacity>
    </>
  ) : (
    <>
      <Text style={styles.bioText}>
        {user?.bio
          ? user.bio.length > 10
            ? user.bio.substring(0, 5) + '...'
            : user.bio
          : 'No bio yet.'}
      </Text>

      {(user?.bio?.length ?? 0) > 10 && ( 
        <TouchableOpacity onPress={() => setShowBio(true)}> 
          <Text style={{ color: '#aaa', fontSize: 14, marginTop: 5 }}> 
            Show more 
          </Text> 
        </TouchableOpacity> 
      )} 
     {getAuth().currentUser?.uid === user?.userId && ( 
  <TouchableOpacity onPress={() => {
    setEditingBio(true); 
    setShowBio(true);             
  }}>
    <Text style={{ color: 'white', marginTop: 10 }}>Edit Bio</Text>
  </TouchableOpacity>
)}

    </>
  )}
</View>
<Modal
  visible={showBio}
  transparent
  animationType="slide"
  onRequestClose={() => {
    setShowBio(false);
    setEditingBio(false);
  }}
>
  <View style={styles.modalBackground}>
    <View style={styles.bioModalBox}>
      {editingBio ? (
        <>
          <Text style={styles.fullBioText}>Edit your bio</Text>

          <TextInput
            style={styles.bioInput}
            value={bioText}
            onChangeText={(text) => {
              if (text.length <= 100) setBioText(text);
            }}
            placeholder="Write something about yourself"
            placeholderTextColor="#888"
            multiline
            maxLength={100}
          />

          <Text style={{ color: '#ccc', fontSize: 12 }}>{bioText.length}/100</Text>

          <TouchableOpacity onPress={handleSaveBio}>
            <Text style={styles.closeModal}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowBio(false);
              setEditingBio(false);
            }}
          >
            <Text style={[styles.closeModal, { color: '#888' }]}>Cancel</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.fullBioText}>{user?.bio || 'No bio yet.'}</Text>
          <TouchableOpacity onPress={() => setShowBio(false)}>
            <Text style={styles.closeModal}>Close</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  </View>
</Modal>






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
                source={imageMap[profilePicture] || imageMap['defaultPFP.jpeg']}
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
  {featuredAlbums.map((album, index) => (
    <View key={index} style={styles.rectangle}>
      <Image source={{ uri: album.image }} style={styles.rankImage} />
    </View>
  ))}
</View>

<View style={styles.rectangleRow}>
  {featuredSongs.map((song, index) => (
    <View key={index} style={styles.rectangle}>
      <Image source={{ uri: song.image }} style={styles.rankImage} />
    </View>
  ))}
</View>

<View style={styles.circleRow}>
  {featuredArtists.map((artist, index) => (
    <View key={index} style={styles.circle}>
      <Image source={{ uri: artist.image }} style={styles.rankImage} />
    </View>
  ))}
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
      setProfilePicture(filename); 
    
      const auth = getAuth();
      const user = auth.currentUser;
    
      if (user) {
        await updateProfile(user, {
          photoURL: filename, 
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
    height: scale(110),
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

  modalBackground: { 
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bioModalBox: { 
    backgroundColor: '#1e1e1e',
    padding: 30,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  fullBioText: { 
    fontSize: scale(16),
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeModal: { 
    color: '#B57EDC',
    fontWeight: 'bold',
    marginTop: 10,
  },
  
  bioContainer: {
    position: 'absolute',
    alignItems: 'center', 
    marginTop: scale(149), 
    width: '85%',
    paddingHorizontal: scale(20), 
    marginLeft: scale(30),
    
  },
  bioInput: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: scale(15),
    width: '100%',
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 10,
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