import React from "react";
import { View, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <SearchBar onSearch={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
  },
});

export default SearchPage;
