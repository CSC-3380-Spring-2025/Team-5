import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '@/components/SearchBar'; // Ensure this path is correct

export default function SearchPage() {
  const handleSearch = (query: string) => {
    console.log('Search Query:', query); // Handle the search query
  };

  return (
    <View style={styles.container}>
      {/* Pass the onSearch prop */}
      <SearchBar onSearch={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
  },
});

export default SearchPage;
