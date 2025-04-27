import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Link, Stack } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import AlbumButton from '@/assets/profilePage_Icons/AlbumButton.svg'; 
import ArtistsButton from '@/assets/profilePage_Icons/ArtistsButton.svg'; 
import ListButton from '@/assets/profilePage_Icons/ListButton.svg'; 
import SongsButton from '@/assets/profilePage_Icons/SongsButton.svg'; 
import Line from '@/components/HorizontalLine';



export default function ProfilePage() {
  return (
    <>
      <Stack.Screen options={{ title: "Username" }} />
      <View style={styles.container}>
        {/*Following / Followers*/}
        <View style={styles.textRow}>
          <Text style={styles.textF}>Followers</Text>
          <Text style={styles.textF}>Following</Text>
      </View>

      {/* Following # / Followers # */}
        <View style={styles.numberRow}>
          <Text style={styles.number}>1.2m</Text>
          <Text style={styles.number}>5</Text>
        </View>

      {/* Bio Text Box */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>
          This is a sample bio. It is centered and limited to 100 characters.
        </Text>
      </View>



      {/*Rank Category*/}
      <View style={styles.textColumn}>
        <Text style={styles.textTitle}>Songs</Text>
        <Text style={styles.textTitle}>Artists</Text>
        <Text style={styles.textTitle}>Albums</Text>
      </View>

        {/* Profile Picture */}
        <View style={styles.profilePictureContainer}>
          <View style={styles.profilePicture}>
            <Image
              source={require('@/assets/PFP/pfp.jpeg')}
              style={styles.profileImage}
            />
          </View>
        </View>
        
        {/* Lines */}
        <View style={styles.linecontainer}>
          <Line />
          <View style={styles.lines} />
          <Line />
          <View style={styles.lines} />
          <Line />
          <View style={styles.lines} />
          <Line />
        </View>

        {/* Rectangles with Albums */}
        <View style={styles.rectangleRow2}>
          <View style={styles.rectangleGolden}>
            <Image
              source={require('@/assets/r21.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleSilver}>
            <Image
              source={require('@/assets/r22.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleBronze}>
            <Image
              source={require('@/assets/r23.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangle}>
            <Image
              source={require('@/assets/r24.jpeg')}
              style={styles.rankImage}
            />
          </View>
        </View>

        {/* Rectangles with Images */}
        <View style={styles.rectangleRow}>
          <View style={styles.rectangleGolden}>
            <Image
              source={require('@/assets/Top4Songs/r1.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleSilver}>
            <Image
              source={require('@/assets/Top4Songs/r2.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangleBronze}>
            <Image
              source={require('@/assets/Top4Songs/r3.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.rectangle}>
            <Image
              source={require('@/assets/Top4Songs/r4.jpeg')}
              style={styles.rankImage}
            />
          </View>
        </View>

        {/* Circles with Images */}
        <View style={styles.circleRow}>
          <View style={styles.circleGolden}>
            <Image
              source={require('@/assets/Top4Artists/c1.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.circleSilver}>
            <Image
              source={require('@/assets/Top4Artists/c2.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.circleBronze}>
            <Image
              source={require('@/assets/Top4Artists/c3.jpeg')}
              style={styles.rankImage}
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={require('@/assets/Top4Artists/c4.jpeg')}
              style={styles.rankImage}
            />
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <Link href="/List" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <ListButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
            <Link href="/Songs" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <SongsButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
            <Link href="/Artists" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <ArtistsButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
            <Link href="/Album" asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <AlbumButton width={scale(87)} height={scale(40)} />
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808080',
  },
  buttonContainer: {
    position: 'absolute', // Position the buttons absolutely
    bottom: 0, // Stick to the bottom
    width: '100%', // Full width
  },
  buttons: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'space-around', // Add equal spacing around buttons
    alignItems: 'center', // Center buttons vertically
    paddingBottom: scale(40), // Add padding at the bottom
  },
  linecontainer: {
    position: 'absolute', // Position the lines absolutely
    top: scale(210), // Adjust this value to move lines up or down
    width: '100%', // Ensure the container spans the full width
  },
  lines: {
    height: scale(105), // Space between lines
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginTop: scale(-500),
  },
  profilePicture: {
    position: 'absolute',
    width: scale(119),
    height: scale(119),
    borderRadius: scale(119 / 2),
    overflow: 'hidden',
    borderWidth: scale(2),
    borderColor: '#FFFFFF',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bioContainer: {
    position: 'absolute',
    alignItems: 'center', // Center horizontally
    marginTop: scale(160), // Adjust spacing as needed
    paddingHorizontal: scale(20), // Add padding to prevent text from touching edges
    marginLeft: scale(30),
  },
  bioText: {
    fontSize: scale(15), // Font size 20
    color: '#FFFFFF', // White text color
    textAlign: 'center', // Center text horizontally
    maxWidth: scale(300), // Limit width to prevent overflow
  },
  textRow: {
    flexDirection: 'row', // Arrange text elements horizontally
    justifyContent: 'center', // Add space between text elements
    width: scale(350), // DONT CHANGE
  },
  textF: {
    fontSize: 20,
    color: '#FFFFFF',
    marginHorizontal: scale(80), // Add horizontal spacing
    marginTop: scale(115), // DONT CHANGE
  },
  textColumn: {
    marginLeft: scale(0),
    marginTop: scale(55), // Add vertical spacing
  },
  textTitle: {
    fontSize: 15,
    color: '#FFFFFF',
    height: scale(107), // DONT CHANGE
  },
  numberRow: {
    flexDirection: 'row', // Arrange numbers horizontally
    marginLeft: scale(-66), // Move the entire row to the left
  },
  number: {
    fontSize: 20,
    color: '#FFFFFF',
    marginTop: scale(0), // Adjust vertical spacing if needed
    marginHorizontal: scale(106),
  },
  rectangleRow: {
    flexDirection: 'row', // Arrange rectangles horizontally
    justifyContent: 'space-between', // Add space between rectangles
    paddingHorizontal: 30, // Add padding on the sides
    marginTop: scale(-295), // Adjust this value to position the row
    marginLeft: scale(17), // Move the entire row to the right
  },
  rectangleRow2: {
    flexDirection: 'row', // Arrange rectangles horizontally
    justifyContent: 'space-between', // Add space between rectangles
    paddingHorizontal: 30, // Add padding on the sides
    marginTop: scale(410), // Adjust this value to position the row
    marginLeft: scale(17), // Move the entire row to the right
  },
  rectangle: {
    width: scale(70) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(85) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, // Add a border
    borderColor: 'transparent', // Golden border color
    marginRight: scale(8), // Keep the same spacing
  },
  rectangleGolden: {
    width: scale(70) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(85) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, // Add a border
    borderColor: 'gold', // Golden border color
    marginRight: scale(8), // Keep the same spacing
  },
  rankImage: {
    width: '100%', // Fill the rectangle width
    height: '100%', // Fill the rectangle height
    resizeMode: 'cover', // Ensure the image covers the rectangle without distortion
  },
  rectangleSilver: {
    width: scale(70) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(85) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, // Add a border
    borderColor: 'silver', // Golden border color
    marginRight: scale(8), // Keep the same spacing
  },
  rectangleBronze: {
    width: scale(70) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(85) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 3, // Add a border
    borderColor: '#9E7015', // Golden border color
    marginRight: scale(8), // Keep the same spacing
  },
  circleRow: {
    flexDirection: 'row', // Arrange rectangles horizontally
    justifyContent: 'space-between', // Add space between rectangles
    paddingHorizontal: 30, // Add padding on the sides
    marginTop: scale(32), // Adjust this value to position the row
    marginLeft: scale(10), // Move the entire row to the right
  },
  circle: {
    width: scale(76) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(76) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: scale(76 / 2), // Half of width/height to make it a circle
    overflow: 'hidden',
    borderWidth: 0, // Add a border
    borderColor: 'transparent', // Golden border color
    marginRight: scale(3), // Keep the same spacing
  },
  circleGolden: {
    width: scale(78) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(78) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: scale(78 / 2), // Half of width/height to make it a circle
    overflow: 'hidden',
    borderWidth: 3, // Add a border
    borderColor: 'gold', // Golden border color
    marginRight: scale(3), // Keep the same spacing
  },
  circleSilver: {
    width: scale(78) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(78) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: scale(78 / 2), // Half of width/height to make it a circle
    overflow: 'hidden',
    borderWidth: 3, // Add a border
    borderColor: 'silver', // Golden border color
    marginRight: scale(3), // Keep the same spacing
  },
  circleBronze: {
    width: scale(78) - 4, // Subtract borderWidth * 2 (2 on each side)
    height: scale(78) - 4, // Subtract borderWidth * 2 (2 on each side)
    borderRadius: scale(78 / 2), // Half of width/height to make it a circle
    overflow: 'hidden',
    borderWidth: 3, // Add a border
    borderColor: '#9E7015', // Golden border color
    marginRight: scale(3), // Keep the same spacing
  },
});