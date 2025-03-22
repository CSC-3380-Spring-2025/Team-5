/*
* So uh when you switch tabs the whole app breaks but @Aidan you got that ;)
*/

import React, { useState, useCallback } from 'react';
import { Image, View, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import SearchBar from './SearchBar';
import { SpotifyService, SpotifyArtist } from '../services/SpotifyArtistService';
import debounce from 'lodash/debounce'; // This is used to avoid too many API calls

const SpotifyArtistSearch: React.FC = () => {
    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const spotifyService = SpotifyService.getInstance();

    /*
    * This is used to avoid too many API calls
    * It basically waits for the user to stop typing for 500ms before calling the API
    */
    const debouncedSearch = useCallback(
        debounce(async (query: string) => {
            if (!query.trim()) {
                setArtists([]);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const results = await spotifyService.searchArtists(query);
                setArtists(results);
            } catch (err) {
                setError('Failed to search artists. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }, 500),
        []
    );

    // Calls the debounced search function when the user types
    const handleSearch = (query: string) => {
        debouncedSearch(query);
    };

    const renderArtist = ({ item }: { item: SpotifyArtist }) => (
        <View style={styles.artistItem}>
            <Image source={{ uri: item.images[0].url }} style={styles.artistImage} />
            <Text style={styles.artistName}>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search for artists..."
                onSearch={handleSearch} // Searches the artist when the user types and debounces the search (from earlier)
            />

            {error && (
                <Text style={styles.error}>{error}</Text>
            )}
            
            <FlatList
                data={artists}
                renderItem={renderArtist}
                keyExtractor={item => item.id}
                style={styles.list}
                ListEmptyComponent={
                    loading || error ? null : (
                        <Text style={styles.emptyText}>Search for an artist</Text>
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: 10,
    },
    list: {
        flex: 1,
    },
    artistItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
    },
    artistName: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 11,
    },
    artistImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    loader: {
        marginTop: 20,
    },
    error: {
        color: 'red',
        padding: 10,
        textAlign: 'center',
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
    },
});

export default SpotifyArtistSearch; 