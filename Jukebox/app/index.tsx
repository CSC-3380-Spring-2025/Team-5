import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, RefreshControl } from "react-native";
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
  username?: string;
  songTitle?: string;
  songArtist?: string;
  likes: number;
}

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchPosts = useCallback(async () => {
    if (!currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      const userData = userDoc.data();
      const following = userData?.following || [];

      let postsQuery;
      
      if (following.length > 0) {
        postsQuery = query(
          collection(db, "posts"),
          where("userID", "in", [...following, currentUser.uid]),
          orderBy("createdAt", "desc"),
          limit(20)
        );
      } else {
        postsQuery = query(
          collection(db, "posts"),
          where("userID", "==", currentUser.uid),
          orderBy("createdAt", "desc"),
          limit(20)
        );
      }

      const querySnapshot = await getDocs(postsQuery);
      const postsData = await Promise.all(querySnapshot.docs.map(async (postDoc) => {
        const postData = postDoc.data();
        
        let username = "Unknown User";
        try {
          const userDocRef = doc(db, "users", postData.userID);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            username = userDocSnap.data().username || "Unknown User";
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
        
        return {
          postID: postDoc.id,
          ...postData,
          username,
          createdAt: postData.createdAt?.toDate() || new Date()
        };
      })) as Post[];

      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser, fetchPosts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = async (postID: string) => {
    console.log("Liked post:", postID);
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
          />
        }
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <UserPost
              key={post.postID}
              post={post}
              onLike={handleLike}
              onProfilePress={handleProfilePress}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No posts to show.</Text>
            <Text style={styles.emptySubtext}>
              Follow more users or create your first post!
            </Text>
          </View>
        )}
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
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 300,
  },
  emptyText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubtext: {
    color: "#888",
    textAlign: "center",
  },
});
