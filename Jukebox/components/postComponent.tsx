import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface Post {
  postID: string;
  content: string;
  createdAt: Date;
  userID: string;
  likes: number;
  comments: any[];
}

interface UserPostProps {
  post: Post;
  onLike: (postID: string) => void;
  onComment: (postID: string) => void;
  onProfilePress: (userID: string) => void;
}

const UserPost: React.FC<UserPostProps> = ({ post, onLike, onComment, onProfilePress }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    onLike(post.postID);
  };

  const handleCommentPress = () => {
    onComment(post.postID);
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
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white' }}>User {post.userID}</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 12, color: 'gray' }}>{formatDate(post.createdAt)}</Text>
        </View>
      </View>
      
      {/* <View style={{ backgroundColor: 'black', padding: 10, borderRadius: 10, borderColor: 'grey', borderWidth: .5, flexDirection: 'row', alignItems: 'center', marginBottom: 10, position: 'relative' }}>
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
      </View> */}
      <Text style={{ fontSize: 14, marginBottom: 10, color: 'white' }}>{post.content}</Text>
      
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleLike} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <FontAwesome name={liked ? 'heart' : 'heart-o'} size={20} color={liked ? 'red' : 'white'} />
            <Text style={{ marginLeft: 5, color: 'white' }}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCommentPress} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <FontAwesome name="comment-o" size={20} color="white" />
            <Text style={{ marginLeft: 5, color: 'white' }}>{post.comments.length}</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={handleAddToLibrary}>
          <FontAwesome name="plus" size={20} color="white" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default UserPost;
