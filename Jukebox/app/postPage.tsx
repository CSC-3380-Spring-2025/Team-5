
import React from 'react';
import { Text, View } from 'react-native';
import { Stack } from 'expo-router';
export default function PostPage() {
  return (
    <View >
      <Stack.Screen options={{ title: "Post" }} />
      <Text>Post Page</Text>
    </View>
  );
}