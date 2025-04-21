import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from "react-native";

const placeholderImage = "https://via.placeholder.com/150";

const placeholderData = [
  { id: "1", name: "Placeholder 1", image: placeholderImage },
  { id: "2", name: "Placeholder 2", image: placeholderImage },
  { id: "3", name: "Placeholder 3", image: placeholderImage },
  { id: "4", name: "Placeholder 4", image: placeholderImage },
  { id: "5", name: "Placeholder 5", image: placeholderImage },
  { id: "6", name: "Placeholder 6", image: placeholderImage },
];

const screenWidth = Dimensions.get("window").width;
const itemMargin = 15;
const ITEM_SIZE = (screenWidth - itemMargin * 4) / 3;

const ListViewPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "#000", paddingHorizontal: itemMargin, paddingTop: 20 }}>
\      <TouchableOpacity
        onPress={() => console.log("Back to List pressed")}
        style={{ marginBottom: 20 }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>⟵ Back to List</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold", color: "white", marginBottom: 20 }}>
        Your List
      </Text>

      <FlatList
        data={placeholderData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log(`${item.name} pressed`)}
            style={{
              alignItems: "center",
              backgroundColor: "#333",
              padding: 10,
              borderRadius: 10,
              width: ITEM_SIZE
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: ITEM_SIZE - 20, height: ITEM_SIZE - 20, borderRadius: 10, marginBottom: 10 }}
            />
            <Text style={{ fontSize: 14, color: "white", textAlign: "center" }}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ListViewPage;