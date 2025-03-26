
import React from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import ExampleFeaturedList from "@/components/FeaturedList";
import Info from "@/components/info";
import { View, Text } from "react-native";
import SignIn from "@/components/SignIn";


export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
      <SignIn />
    </View>
  );
}
