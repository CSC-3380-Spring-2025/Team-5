import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/*  This component is used to display information about an album or a song.
    Issue: The line below the info title doesn't extend the full width of the container. I think this might be an issue with the index.tsx file.
    This can be fixed later.
*/

interface InfoProps {
  type: 'album' | 'song';
  data: {
    artists?: string[];
    tracks?: number;
    releaseDate?: string;
    label?: string;
    duration?: string;
    album?: string;
    trackNumber?: number;
  };
}

const Info: React.FC<InfoProps> = ({ type, data }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.infoTitle}>INFO</Text>

            <Text style={styles.infoText}>
                Artists: <Text style={styles.infoTextBold}>{data.artists?.join(', ')}</Text>
            </Text>

            {/* Album specific info */}
            {type === 'album' && (
                <>
                    <Text style={styles.infoText}>
                        Tracks: <Text style={styles.infoTextBold}>{data.tracks}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Label: <Text style={styles.infoTextBold}>{data.label}</Text>
                    </Text>
                </>
            )}

            {/* Song specific info */}
            {type === 'song' && (
                <>
                    <Text style={styles.infoText}>
                        Album: <Text style={styles.infoTextBold}>{data.album}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Duration: <Text style={styles.infoTextBold}>{data.duration}</Text>
                    </Text>
                    <Text style={styles.infoText}>
                        Track Number: <Text style={styles.infoTextBold}>{data.trackNumber}</Text>
                    </Text>
                    
                </>
            )}

            <Text style={styles.infoText}>
                Release Date: <Text style={styles.infoTextBold}>{data.releaseDate}</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontSize: 16,
        margin: 20,
        gap: 10,
    },
    infoText: {
        color: 'hsl(0, 0%, 70%)',
    },
    infoTextBold: {
        fontWeight: 'bold',
    },
    infoTitle: {
        textAlign: 'left',
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        color: 'white',
        // fontWeight: 'bold', still deciding if I want this bold or not
    }
});

export default Info;
