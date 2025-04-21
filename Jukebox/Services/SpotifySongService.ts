import { SpotifyAuth } from '../auth/spotifyAuth';

// This is the data structure of a song from the Spotify API
export interface SpotifySong {
    id: string;
    name: string;
    artists: Array<{
        id: string;
        name: string;
    }>;
    album: {
        id: string;
        name: string;
        images: Array<{
            url: string;
            height: number;
            width: number;
        }>;
    };
    duration_ms: number;
    popularity: number;
    preview_url: string | null;
}

// This is the response from the Spotify API when we search for songs
export interface SpotifySearchResponse {
    tracks: {
        items: SpotifySong[];
        total: number;
    };
}

/**
 * SpotifySongService is for interacting with Spotify's API.
 * This handles all song-related API calls and uses SpotifyAuth for authentication.
 */
export class SpotifySongService {
    static searchSongs(query: string) {
      throw new Error('Method not implemented.');
    }
    private static instance: SpotifySongService;
    private spotifyAuth: SpotifyAuth;

    private constructor() {
        this.spotifyAuth = SpotifyAuth.getInstance();
    }

    public static getInstance(): SpotifySongService {
        if (!SpotifySongService.instance) {
            SpotifySongService.instance = new SpotifySongService();
        }
        return SpotifySongService.instance;
    }

    // This searches for songs using the Spotify API
    public async searchSongs(query: string): Promise<SpotifySong[]> {
        try {
            const accessToken = await this.spotifyAuth.getAccessToken();
            
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10&market=US`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: SpotifySearchResponse = await response.json();
            return data.tracks.items;

        } catch (error) {
            console.error('Error searching songs:', error);
            throw error;
        }
    }

    // This gets the details of a specific song using the Spotify API
    public async getSongDetails(songId: string): Promise<SpotifySong> {
        try {
            const accessToken = await this.spotifyAuth.getAccessToken();
            
            const response = await fetch(
                `https://api.spotify.com/v1/tracks/${songId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching song details:', error);
            throw error;
        }
    }
} 