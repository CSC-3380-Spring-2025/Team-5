import React from "react";
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import ExampleFeaturedList from "@/components/FeaturedList";
import Info from "@/components/info";

export default function Index() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "stretch",
        backgroundColor: "black",
      }}
    >
      <Info type="album" data={{
        artists: ["The Weeknd"],
        tracks: 14,
        releaseDate: "2015-08-28",
        label: "Universal Republic Record",
      }} />
      <Info type="song" data={{
        artists: ["The Weeknd", "Daft Punk"],
        album: "Starboy",
        releaseDate: "2015-08-28",
        duration: "4:29",
        trackNumber: 18,
      }} />
    </View>
  );
}

