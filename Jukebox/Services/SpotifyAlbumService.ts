import { SpotifyAuth } from '../auth/spotifyAuth';

// This is the data structure of a album from the Spotify API
export interface SpotifyAlbum {
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
    popularity: number;
}

// This is the response from the Spotify API when we search for albums
export interface SpotifySearchResponse {
    albums: {
        items: SpotifyAlbum[];
        total: number;
    };
}

/**
 * SpotifyAlbumService is for interacting with Spotify's API.
 * This handles all album-related API calls and uses SpotifyAuth for authentication.
 */
export class SpotifyAlbumService {
    static searchAlbums(query: string) {
      throw new Error('Method not implemented.');
    }
    private static instance: SpotifyAlbumService;
    private spotifyAuth: SpotifyAuth;

    private constructor() {
        this.spotifyAuth = SpotifyAuth.getInstance();
    }

    public static getInstance(): SpotifyAlbumService {
        if (!SpotifyAlbumService.instance) {
            SpotifyAlbumService.instance = new SpotifyAlbumService();
        }
        return SpotifyAlbumService.instance;
    }

    // This searches for albums using the Spotify API
    public async searchAlbums(query: string): Promise<SpotifyAlbum[]> {
        try {
            const accessToken = await this.spotifyAuth.getAccessToken();
            
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=10&market=US`,
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
            return data.albums.items;

        } catch (error) {
            console.error('Error searching albums:', error);
            throw error;
        }
    }

    // This gets the details of a specific album using the Spotify API
    public async getAlbumDetails(albumId: string): Promise<SpotifyAlbum> {
        try {
            const accessToken = await this.spotifyAuth.getAccessToken();
            
            const response = await fetch(
                `https://api.spotify.com/v1/albums/${albumId}`,
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
            console.error('Error fetching album details:', error);
            throw error;
        }
    }
} 