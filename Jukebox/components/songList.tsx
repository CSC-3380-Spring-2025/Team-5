import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
/*
    This component is used to display a list of songs under an album page.
    Currently using placeholders for the song list.
*/

interface AlbumSong {
    id: string;
    title: string;
    rating: number;
    trackNumber: number;
}

const SongList: React.FC = () => {
    
    const songs: AlbumSong[] = [
        { id: '1', trackNumber: 1, title: 'Pornography', rating: 4.5 },
        { id: '2', trackNumber: 2, title: 'Oh My Dis Side (feat. Quavo)', rating: 4.8 },
        { id: '3', trackNumber: 3, title: '3500 (feat. Future & 2 Chainz)', rating: 4.2 },
        { id: '4', trackNumber: 4, title: 'Wasted (feat. Juicy J)', rating: 4.9 },
        { id: '5', trackNumber: 5, title: '90210 (feeat. Kacy Hill)', rating: 4.6 },
        { id: '6', trackNumber: 6, title: 'Pray 4 Love (feat. The Weeknd)', rating: 4.3 },
        { id: '7', trackNumber: 7, title: 'Nightcrawler (feat. Swae Lee & Chief Keef)', rating: 4.7 },
        { id: '8', trackNumber: 8, title: 'Piss On Your Grave (feat. Kanye West)', rating: 4.4 },
        { id: '9', trackNumber: 9, title: 'Antidote', rating: 4.1 },
        { id: '10', trackNumber: 10, title: 'Impossible', rating: 4.8 },
        { id: '11', trackNumber: 11, title: "Maria I'm Drunk (feat. Justin Bieber & Young Thug", rating: 4.7 },
        { id: '12', trackNumber: 12, title: 'Flying High (feat. Toro y Moi)', rating: 4.4 },
        { id: '13', trackNumber: 13, title: 'I Can Tell', rating: 4.1 },
        { id: '14', trackNumber: 14, title: 'Apple Pie', rating: 4.8 },
        { id: '15', trackNumber: 15, title: 'Ok Alright (feat. ScHoolboy Q)', rating: 4.1 },
        { id: '16', trackNumber: 16, title: 'Never Catch Me', rating: 4.8 },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.titleRow}>
                <Text style={styles.title}>SONGS</Text>
                <Text style={styles.ratingText}>{songs.length}</Text>
            </View>
            <View style={styles.listContainer}>
                <View style={styles.songList}>
                    {songs.map((song) => (
                        <View key={song.id} style={styles.songRow}>
                            <Text style={styles.songTitle} numberOfLines={1} ellipsizeMode="tail">{song.trackNumber} • {song.title}</Text>
                            <View style={styles.ratingContainer}>
                                <Text style={styles.ratingText}>{song.rating}</Text>
                                <FontAwesome name="star" size={16} color="hsl(0, 0%, 70%)" />
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        color: 'white',
        fontSize: 16,
    },
    listContainer: {
        flex: 1,
    },
    songList: {
        flex: 1,
        gap: 25,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        paddingBottom: 5,
        marginBottom: 15,
    },
    songRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
});

export default SongList;