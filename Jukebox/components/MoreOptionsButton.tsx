import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const MoreOptionsButton: React.FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    return (
        <View>
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => setShowPopup(!showPopup)}
            >
                <Text style={styles.buttonText}>•••</Text>
            </TouchableOpacity>
            
            {/* Later on we can add onPress functions to each of the buttons */}
            {showPopup && ( 
                <View style={styles.popup}>
                    <TouchableOpacity style={[styles.popupItem, styles.border]}>
                        <Text style={styles.popupText}>Rate</Text>
                        <FontAwesome name="star" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.popupItem, styles.border]}>
                        <Text style={styles.popupText}>Post</Text>
                        <MaterialIcons name="post-add" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.popupItem, styles.border]}>
                        <Text style={styles.popupText}>View on Spotify</Text>
                        <Entypo name="spotify" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.popupItem}>
                        <Text style={styles.popupText}>Add to List</Text>
                        <MaterialCommunityIcons name="playlist-plus" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    popup: {
        position: 'absolute',
        top: 50,
        right: 0,
        backgroundColor: 'black',
        borderRadius: 12,
        padding: 0,
        minWidth: 200,
        elevation: 5,
    },
    popupItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    popupText: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    border: {
        borderBottomWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.7)',
    },
});

export default MoreOptionsButton;
