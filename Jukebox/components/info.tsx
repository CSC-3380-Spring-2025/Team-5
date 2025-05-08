import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 16,
        gap: 20,
    },
    infoText: {
        color: 'hsl(0, 0%, 70%)',
        fontSize: 16,
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
        paddingBottom: 5,
        fontSize: 16,
    }
});

export default Info;
