import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import MoreOptionsButton from "./MoreOptionsButton";
import AntDesign from '@expo/vector-icons/AntDesign';

const InfoPageBanner = () => {
    return (
        <View style={styles.banner}>
            <ImageBackground source={{ uri: 'https://i.scdn.co/image/ab6761610000f1789e528993a2820267b97f6aae' }} style={styles.banner} resizeMode="cover"></ImageBackground>

            <View style={styles.bannerContent}>
                <View style={styles.bannerButtons}>
                    <AntDesign name="arrowleft" size={32} color="white" />
                    <MoreOptionsButton />
                </View>
                <View style={styles.bannerText}>
                    <Text style={styles.title}>The Weeknd</Text>
                    <Text style={styles.type}>ARTIST</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        height: 250,
        width: "100%",
    },
    bannerContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    bannerText: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "white",
    },
    type: {
        fontSize: 24,
        color: "hsla(0, 0.00%, 100.00%, 0.50)",
    },
    bannerButtons: {
        position: "absolute",
        flexDirection: "row",
        justifyContent: "space-between",
        bottom: 150,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
    },
});

export default InfoPageBanner;
