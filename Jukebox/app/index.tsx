import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Redirect, Stack } from "expo-router";
import UserPost from "@/components/postComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function Index() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  if (!isAuthenticated) {
    return <Redirect href="/SignUpScreen" />;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      <ScrollView>
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
        <UserPost />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
