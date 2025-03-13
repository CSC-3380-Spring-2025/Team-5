import React from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import ExampleFeaturedList from "@/components/FeaturedList";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ExampleFeaturedList />
    
    </View>
  );
}

