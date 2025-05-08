import React, { useState, useEffect } from 'react';
import { Pressable, Text, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove, getDoc, writeBatch } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

interface FollowButtonProps {
  userId: string;
}

export default function FollowButton({ userId }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!auth.currentUser) return;
      
      try {
        const currentUserDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (currentUserDoc.exists()) {
          const userData = currentUserDoc.data();
          if (userData.following && userData.following.includes(userId)) {
            setIsFollowing(true);
          }
        }
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };
    
    checkFollowStatus();
  }, [userId, auth.currentUser]);

  const handleFollow = async () => {
    if (!auth.currentUser) {
      console.log("User not authenticated");
      return;
    }
    
    const currentUserId = auth.currentUser.uid;
    
    try {
      if (isFollowing) {
        await updateDoc(doc(db, 'users', currentUserId), {
          following: arrayRemove(userId)
        });

        await updateDoc(doc(db, 'users', userId), {
          followers: arrayRemove(currentUserId)
        });
        
        console.log(`Unfollowed user: ${userId}`);
      } else {
        await updateDoc(doc(db, 'users', currentUserId), {
          following: arrayUnion(userId)
        });
        await updateDoc(doc(db, 'users', userId), {
          followers: arrayUnion(currentUserId)
        });
        
        console.log(`Followed user: ${userId}`);
      }
      
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status: ", error);
    }
  };

  return (
    <Pressable 
      onPress={handleFollow}
      style={({ pressed }) => [
        styles.button, 
        isFollowing ? styles.following : styles.notFollowing,
        pressed && styles.buttonPressed
      ]}
    >
      <Text style={styles.buttonText}>
        {isFollowing ? 'Following' : 'Follow'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#B57EDC',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  following: {
    backgroundColor: '#555',
  },
  notFollowing: {
    backgroundColor: '#1DB954',
  },
  buttonPressed: {
    opacity: 0.8,
  },
}); 