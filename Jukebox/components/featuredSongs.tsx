import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

interface FeaturedSong {
    id: string;
    title: string;
    rating: number;
    albumCover: string;
}

const FeaturedSongs: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    
    const songs: FeaturedSong[] = [
        { id: '1', title: 'Song 1', rating: 4.5, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '2', title: 'Song 2', rating: 4.8, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '3', title: 'Song 3', rating: 4.2, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '4', title: 'Song 4', rating: 4.9, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '5', title: 'Song 5', rating: 4.6, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '6', title: 'Song 6', rating: 4.3, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '7', title: 'Song 7', rating: 4.7, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '8', title: 'Song 8', rating: 4.4, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '9', title: 'Song 9', rating: 4.1, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
        { id: '10', title: 'Song 10', rating: 4.8, albumCover: 'https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png' },
    ];

    const displayedSongs = showAll ? songs : songs.slice(0, 5);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FEATURED</Text>
            <View style={styles.listContainer}>
                <View style={styles.songList}>
                    {displayedSongs.map((song) => (
                        <View key={song.id} style={styles.songRow}>
                            <Image 
                                source={{ uri: song.albumCover }} 
                                style={styles.albumCover}
                            />
                            <Text style={styles.songTitle}>{song.title}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>{song.rating} ★</Text>
                            </View>
                        </View>
                    ))}
                </View>
                {!showAll && songs.length > 5 ? ( 
                    <TouchableOpacity 
                        style={styles.seeMoreButton}
                        onPress={() => setShowAll(true)}
                    >
                        <Text style={styles.seeMoreText}>See More ↓</Text>
                    </TouchableOpacity>
                ) : songs.length > 5 && (
                    <TouchableOpacity 
                        style={styles.seeMoreButton}
                        onPress={() => setShowAll(false)}
                    >
                        <Text style={styles.seeMoreText}>See Less ↑</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#000',
    },
    title: {
        color: 'white',
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 5,
        marginBottom: 15,
    },
    listContainer: {
        flex: 1,
    },
    songList: {
        flex: 1,
        gap: 20,
    },
    songRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    albumCover: {
        width: 32,
        height: 32,
        borderRadius: 4,
        marginRight: 12,
    },
    songTitle: {
        color: 'hsl(0, 0%, 70%)',
        fontSize: 16,
        flex: 1,
        marginRight: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        color: 'hsl(0, 0%, 70%)',
        fontSize: 16,
    },
    seeMoreButton: {
        marginVertical: 5,
        alignItems: 'flex-end',
    },
    seeMoreText: {
        color: 'hsl(0, 0%, 70%)',
        fontSize: 16,
    },
});

export default FeaturedSongs;