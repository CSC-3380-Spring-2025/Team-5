# Jukebox : Team 5
# Aidan McNamara, Caleb Zeringue, Mason Bourgeois, Darrion Paul, Sergio Zuniga, Behrens Richeson 
Project Manager: Mason (boug1e)\
Communications Lead: Sergio (snunoz)\
Git Master: Darrion (NukeApprentice)\
Design Lead: Caleb (Yeleb)\
Quality Assurance Tester: Aidan (aidanMCNAM)/ Behrens Richeson (Behr) 

# About Our Software
Jukebox is a social media app focused on music interests. On this app, users can express their music taste through a blend of social media elements alongside a rating system similar to Letterbox. Jukebox comes with a lot of features for music lovers, such as:
- Posting music-related things
- Albumy, Artistly, and Songly, 3 unique and fun games where users guess the correct answer.
- Spotify search bar
- Weather-based playlist recommendation
- Ratings for songs, artists, and albums
- Ability to add friends to see their profiles and ratings
- A profile to showcase your ratings to other people
  
## Platforms Tested on
- Android (using Android Studio Virtual Device Manager)
- iOS (using XCode Simulator)
# Important Links
Kanban Board: [[link](https://github.com/orgs/CSC-3380-Spring-2025/projects/14)]\
Designs: [[link](https://www.figma.com/design/8XBJ7Dy6Tnmb4v5FzBzqBX/OO-App-Layout?node-id=0-1&t=8oLFgOeiimzbRWJR-1)]\
Styles Guide(s): [link]

# How to Run Dev and Test Environment

## Dependencies
- Node.js & Node Package Manager (NPM) (All Latest Version)
- Git (Latest Version)
- Android Studio if simulating on Windows. (Latest Version)
- XCode if simulating on macOS. (Latest Version)
- (Optional) An IDE such as VScode.

Through XCode or Android Studio, install a simulation device to run the app.

### Downloading Dependencies
- Node.js can be downloaded [here](https://nodejs.org/en/download). Make sure to download with npm.
- Git can be downloaded [here](https://git-scm.com/downloads). Make sure to download the compatible installer for your platform.
- [Android Studio](https://developer.android.com/studio) for Windows only.
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12/) for macOS only.
- [Visual Studio Code](https://code.visualstudio.com/) can be found here if you want to run it in an IDE.

## Commands
To run Jukebox, follow these steps:
1. Create a folder to store the project and enter it. Open the terminal in that directory and enter:
```sh
git clone https://github.com/CSC-3380-Spring-2025/Team-5.git
```

2. Navigate to the Jukebox Directory in the terminal via:
```
cd Team-5/Jukebox
```

3. Install all dependencies through Node Package Manager in terminal:
```sh
npm i
```
3. Now launch the app using the following command:
```sh
npx expo start
```
4. Make sure to have your simulation device open before launching the app (Android Studio or XCode). Once the app is started and you are prompted with a menu, type **a** if on Windows, or **i** if on macOS to launch the simulator. If you want to select the specific simulator (phone model) you want to open, pressing `shift + (i or a)` will open a selection screen where you can choose which simulator you want to open.

If the app freezes or crashes, in the terminal type `r` to restart the app.

Make sure to follow the `.env.example` file, and create your own `.env` file in the Jukebox directory.
