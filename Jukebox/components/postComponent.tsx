import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const UserPost = () => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleCommentPress = () => {
    console.log('Comment button pressed');
  };

  const handleAddToLibrary = () => {
    console.log('Added to library');
  };

  const handlePlayPress = () => {
    console.log('Play button pressed');
  };

  const album = {
    title: "Random Access Memories",
    artist: "Daft Punk",
    cover: "https://upload.wikimedia.org/wikipedia/en/2/26/Daft_Punk_-_Random_Access_Memories.png?20230908180703"
  };

  return (
    <View style={{ padding: 15, borderBottomWidth: 1, borderColor: '#ddd', backgroundColor: 'black' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image 
            source={{ uri: 'https://dummyimage.com/50/000/fff&text=P' }} 
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>Username</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, borderColor: 'grey', borderWidth: .5, flexDirection: 'row', alignItems: 'center', marginBottom: 10, position: 'relative' }}>
        <Image 
          source={{ uri: album.cover }} 
          style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10, resizeMode: 'contain' }} 
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>{album.title}</Text>
          <Text style={{ fontSize: 14, color: 'gray' }}>{album.artist}</Text>
        </View>
        <TouchableOpacity onPress={handlePlayPress} style={{ position: 'absolute', bottom: 10, right: 10 }}>
          <FontAwesome name="play" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <Text style={{ fontSize: 14, marginBottom: 10, color: 'white' }}>This is a placeholder for the post description. It can be multiple lines long.</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <FontAwesome name={liked ? 'heart' : 'heart-o'} size={20} color={liked ? 'red' : 'white'} />
            <Text style={{ marginLeft: 5, color: 'white' }}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCommentPress} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <FontAwesome name="comment-o" size={20} color="white" />
            <Text style={{ marginLeft: 5, color: 'white' }}>0</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleAddToLibrary}>
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserPost;
