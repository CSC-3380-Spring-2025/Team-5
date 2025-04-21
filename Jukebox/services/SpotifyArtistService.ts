import { SpotifyAuth } from '../auth/spotifyAuth';


// This is the data structure of an artist from the Spotify API (we don't need all of it)
export interface SpotifyArtist {
    id: string; 
    name: string;    
    images: Array<{
        url: string;  
        height: number;
        width: number; 
    }>;
    genres: string[]; 
    popularity: number;  
    followers: {    
        total: number;  
    };
}

// This is the response from the Spotify API when we search for an artist
export interface SpotifySearchResponse {
    artists: {
        items: SpotifyArtist[];  
        total: number;
    };
}

/**
 * SpotifyService is for interacting with Spotify's API.
 * This Handles all artist-related API calls and uses SpotifyAuth for authentication.
 */
export class SpotifyService {

    private static instance: SpotifyService;
    private spotifyAuth: SpotifyAuth;

    
    private constructor() {
        this.spotifyAuth = SpotifyAuth.getInstance();
    }

    // This gets the instance of SpotifyAuth and makes sure there is only one instance at a time
    // Also makes a new instance if there is no instance
    public static getInstance(): SpotifyService {
        if (!SpotifyService.instance) {
            SpotifyService.instance = new SpotifyService();
        }
        return SpotifyService.instance;
    }

    // This searches for artists using the Spotify API
    public async searchArtists(query: string): Promise<SpotifyArtist[]> {   // (query is the user's search query)
        try {
            // Get a valid access token for the API request
            const accessToken = await this.spotifyAuth.getAccessToken();
            
            // Make the API request to search for artists
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10&market=US`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse and return the search results
            const data: SpotifySearchResponse = await response.json();
            return data.artists.items;

        } catch (error) {
            console.error('Error searching artists:', error);
            throw error;
        }
    }

    //  This gets the details of an artist using the Spotify API
    public async getArtistDetails(artistId: string): Promise<SpotifyArtist> {
        try {
            // Get a valid access token for the API request
            const accessToken = await this.spotifyAuth.getAccessToken();
            
            // Make the API request to get artist details
            const response = await fetch(
                `https://api.spotify.com/v1/artists/${artistId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                }
            );

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse and return the artist details
            return await response.json();
        } catch (error) {
            console.error('Error fetching artist details:', error);
            throw error;
        }
    }
} 