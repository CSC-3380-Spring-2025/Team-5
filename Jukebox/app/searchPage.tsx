import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Pressable } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { WeatherButton } from '@/components/WeatherButton'; // ✅ ADD THIS LINE

type SearchCategory = 'Artists' | 'Songs' | 'Albums';

export default function SearchPage() {
  const [category, setCategory] = useState<SearchCategory>('Artists');
  const [results, setResults] = useState<string[]>([]);

  const fakeData = {
    Artists: ['Taylor Swift', 'Drake', 'Kendrick Lamar'],
    Songs: ['Blinding Lights', 'Bad Habits', 'Peaches'],
    Albums: ['1989', 'Scorpion', 'DAMN.'],
  };

  const handleSearch = (query: string) => {
    const categoryData = fakeData[category];
    if (!categoryData) {
      setResults([]);
      return;
    }

    const filtered = categoryData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filtered);
  };

  const handleWeatherPress = (weather: string, message: string) => {
    console.log(message);
  };

  const categories: SearchCategory[] = ['Artists', 'Songs', 'Albums'];

  return (
    <View style={styles.container}>
      {/* ✅ Weather Display */}
      <View style={styles.weatherContainer}>
        <WeatherButton onPress={handleWeatherPress} />
      </View>

      {/* Category Buttons */}
      <View style={styles.buttonGroup}>
        {categories.map((cat) => (
          <Pressable
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={styles.categoryButtonText}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} selectedCategory={category} />

      {/* Results */}
      <Text style={styles.resultsTitle}>Results in {category}:</Text>
      <FlatList
        data={results}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <Text style={styles.resultItem}>{item}</Text>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No results found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#000',
  },
  weatherContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#333',
    borderRadius: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#555',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  resultsTitle: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  resultItem: {
    fontSize: 16,
    color: '#ccc',
    paddingVertical: 6,
  },
  emptyText: {
    color: '#555',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
