import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Stack } from "expo-router";
import UserPost from "@/components/postComponent";
import { db, auth } from "../config/firebase";
import { collection, query, where, orderBy, limit, getDocs, getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

interface Post {
  postID: string;
  content: string;
  createdAt: Date;
  userID: string;
  likes: number;
  comments: any[];
}

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!currentUser) return;

      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.data();
        const following = userData?.following || [];

        const postsQuery = query(
          collection(db, "posts"),
          where("userID", "in", [...following, currentUser.uid]), 
          orderBy("createdAt", "desc"),
          limit(10)
        );

        const querySnapshot = await getDocs(postsQuery);
        const postsData = querySnapshot.docs.map(doc => ({
          postID: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        })) as Post[];

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser]);

  const handleLike = async (postID: string) => {
    console.log("Liked post:", postID);
  };

  const handleComment = (postID: string) => {
    console.log("Comment on post:", postID);
  };

  const handleProfilePress = (userID: string) => {
    console.log("View profile:", userID);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      <ScrollView>
        {posts.map((post) => (
          <UserPost
            key={post.postID}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
            onProfilePress={handleProfilePress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});
