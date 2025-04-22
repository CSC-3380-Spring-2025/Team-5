import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";

const placeholderImage = "https://via.placeholder.com/100";
const placeholderAlbum = "https://via.placeholder.com/150";

const favoriteArtists = [
  { id: "1", name: "Artist 1", image: placeholderImage },
  { id: "2", name: "Artist 2", image: placeholderImage },
  { id: "3", name: "Artist 3", image: placeholderImage },
  { id: "4", name: "Artist 4", image: placeholderImage },
];

const favoriteSongs = [
  { id: "1", name: "Song 1", artist: "Artist 1", image: placeholderAlbum },
  { id: "2", name: "Song 2", artist: "Artist 2", image: placeholderAlbum },
  { id: "3", name: "Song 3", artist: "Artist 3", image: placeholderAlbum },
  { id: "4", name: "Song 4", artist: "Artist 4", image: placeholderAlbum },
];

const favoriteAlbums = [
  { id: "1", name: "Album 1", artist: "Artist 1", image: placeholderAlbum },
  { id: "2", name: "Album 2", artist: "Artist 2", image: placeholderAlbum },
  { id: "3", name: "Album 3", artist: "Artist 3", image: placeholderAlbum },
  { id: "4", name: "Album 4", artist: "Artist 4", image: placeholderAlbum },
];

const ListItem = ({ title, onPress }: { title: string, onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={{ paddingVertical: 10 }}>
    <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>{title}</Text>
  </TouchableOpacity>
);

const ListsScreen = () => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#000" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>Lists</Text>
        <TouchableOpacity onPress={() => console.log("Create List Pressed")} style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}>
          <Text style={{ fontSize: 18, color: "black" }}>Create List</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <ListItem title="Favorite Artists" onPress={() => console.log("Favorite Artists Pressed")} />
        <FlatList
          horizontal
          data={favoriteArtists}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log(`${item.name} Pressed`)} style={{ marginRight: 15, backgroundColor: "#333", padding: 10, borderRadius: 10 }}>
              <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 40 }} />
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <ListItem title="Favorite Songs" onPress={() => console.log("Favorite Songs Pressed")} />
        <FlatList
          horizontal
          data={favoriteSongs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log(`${item.name} Pressed`)} style={{ marginRight: 15, alignItems: "center", backgroundColor: "#333", padding: 10, borderRadius: 10 }}>
              <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 5 }} />
              <Text style={{ fontSize: 14, textAlign: "center", color: "white" }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>{item.artist}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />

        <ListItem title="Favorite Albums" onPress={() => console.log("Favorite Albums Pressed")} />
        <FlatList
          horizontal
          data={favoriteAlbums}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log(`${item.name} Pressed`)} style={{ marginRight: 15, alignItems: "center", backgroundColor: "#333", padding: 10, borderRadius: 10 }}>
              <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: 5 }} />
              <Text style={{ fontSize: 14, textAlign: "center", color: "white" }}>{item.name}</Text>
              <Text style={{ fontSize: 12, color: "gray", textAlign: "center" }}>{item.artist}</Text>
            </TouchableOpacity>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
    </View>
  );
};

export default ListsScreen;