import { GameStats, UserRatings, RatedSong, RatedAlbum, RatedArtist } from './music';
import { User, Post } from './social';

export interface UserData {
  username: string;
  email: string;
  createdAt: string;
  userId: string;
  artistly: GameStats;
  albumly: GameStats;
  songly: GameStats;
  ratings: UserRatings;
  userSongLists: RatedSong[];
  userAlbumLists: RatedAlbum[];
  userArtistLists: RatedArtist[];
  following: User[];
  followers: User[];
  bio: string;
  profilePicture: string;
  posts: Post[];
  likedPosts: Post[];
  featuredSongs: RatedSong[];
  featuredAlbums: RatedAlbum[];
  featuredArtists: RatedArtist[];
} 