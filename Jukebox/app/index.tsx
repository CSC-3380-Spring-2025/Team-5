import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import UserPost from "@/components/postComponent";

export default function Index() {

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
