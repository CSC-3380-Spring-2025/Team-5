# [Jukebox] : [Team 5]
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
- Android (Windows)
- iOS (macOS)
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
### Downloading Dependencies
Describe where to download the dependencies here. Some will likely require a web download. Provide links here. For IDE extensions, make sure your project works with the free version of them, and detail which IDE(s) these are available in. 
- Node.js can be downloaded [here](https://nodejs.org/en/download). Make sure to download with npm.
- Git can be downloaded [here](https://git-scm.com/downloads). Make sure to download the compatible installer for your platform.
- [Android Studio](https://developer.android.com/studio) for Windows only.
- [Xcode](https://apps.apple.com/us/app/xcode/id497799835?mt=12/) for macOS only.
## Commands
Describe how the commands and process to launch the project on the main branch in such a way that anyone working on the project knows how to check the affects of any code they add.

1. Create a folder to store the project and enter it. Then, in the terminal type:
```sh
git clone https://github.com/CSC-3380-Spring-2025/Team-5.git
```
2. Navigate to the Jukebox Directory, then install all dependencies through Node Package Manager:
```sh
npm i
```
3. Now launch the app using the following command:
```sh
npx expo start
```
4. Once the app is started and you are prompted with a menu, type **a** if on Windows, or **i** if on macOS. If you want to select the specific simulator you want to open, pressing `shift + (i or a)` will open a selection screen where you can choose what simulator want to open.
   
It is very common in these sections to see code in peculiar boxes to help them stand out. Check the markdown section of the Project Specifications to see how to add more / customize these.

```python
def code_highlight_example(m: int, m: float, s: str) -> str:
	return s + str(n*m)
```

```java
public static void main(String[] args){
	System.out.println("Hello, World!");
}
```

```c#
static void Main(){
	Console.WriteLine("Hello, World!");
}
```
