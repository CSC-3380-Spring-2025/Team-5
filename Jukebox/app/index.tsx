import React from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Stack } from "expo-router";

export default function Index() {

  return (
    <View style={styles.container}>
      <Text>Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

