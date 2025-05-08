import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Post {
  postID: string;
  content: string;
  createdAt: Date;
  userID: string;
  username?: string;
  likes: number;
}

interface UserPostProps {
  post: Post;
  onLike: (postID: string) => void;
  onProfilePress: (userID: string) => void;
}

const UserPost: React.FC<UserPostProps> = ({ post, onLike, onProfilePress }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(post.postID);
    if (liked) {
      post.likes--;
    } else {
      post.likes++;
    }
  };

  const handleProfilePress = () => {
    onProfilePress(post.userID);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
        <View>
          <TouchableOpacity onPress={handleProfilePress}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>{post.username}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 12, color: 'gray' }}>{formatDate(post.createdAt)}</Text>
        </View>
      </View>
      
      <Text style={{ fontSize: 14, marginBottom: 10, color: 'white' }}>{post.content}</Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <FontAwesome name={liked ? 'heart' : 'heart-o'} size={20} color={liked ? 'red' : 'white'} />
            <Text style={{ marginLeft: 5, color: 'white' }}>{post.likes}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserPost;
