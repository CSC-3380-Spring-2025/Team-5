import React from "react";
import { View, Text } from "react-native";
import SignIn from "@/components/SignIn";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "black" }}>
      <SignIn />
    </View>
  );
}
