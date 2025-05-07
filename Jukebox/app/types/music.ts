export interface RatedArtist {
  artistId: string;
  artistName: string;
  rating: number;
  dateRated: string;
}

export interface RatedAlbum {
  albumId: string;
  albumName: string;
  artistId: string;
  rating: number;
  dateRated: string;
}

export interface RatedSong {
  songId: string;
  songName: string;
  artistId: string;
  albumId: string;
  rating: number;
  dateRated: string;
}

export interface GameStats {
  played: number;
  won: number;
}

export interface UserRatings {
  artists: RatedArtist[];
  albums: RatedAlbum[];
  songs: RatedSong[];
} 