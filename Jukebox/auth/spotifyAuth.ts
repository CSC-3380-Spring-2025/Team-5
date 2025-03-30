/**
 * This file handles Spotify API authentication. It should be used for the other files that need to access the Spotify API.
 * (For example when we search for artists or albums or whatever features we add in the future)
 */

import Constants from 'expo-constants';

export class SpotifyAuth {

    private static instance: SpotifyAuth;

    // Current access token for API requests
    private accessToken: string | null = null;
    // Timestamp when the current token expires
    private tokenExpirationTime: number | null = null;

    private constructor() {}

    /**
     * This returns the instance of SpotifyAuth.
     * If there is no instance, it creates one.
     */
    public static getInstance(): SpotifyAuth {
        if (!SpotifyAuth.instance) {
            SpotifyAuth.instance = new SpotifyAuth();
        }
        return SpotifyAuth.instance;
    }

    /**
     * Retrieves a valid access token for Spotify API requests.
     * If the current token is valid, returns it immediately.
     * If the token is expired or doesn't exist, requests a new one.
     */

    public async getAccessToken(): Promise<string> {

        // Return existing token if it's still valid
        if (this.accessToken && this.tokenExpirationTime && Date.now() < this.tokenExpirationTime) {
            return this.accessToken;
        }
        
        const clientId = Constants.expoConfig?.extra?.spotifyClientId;
        const clientSecret = Constants.expoConfig?.extra?.spotifyClientSecret;

        //  Makes sure that the credentials are valid
        if (!clientId || !clientSecret) {
            throw new Error('Spotify credentials not found in environment variables');
        }

        try {
            // Request new access token from Spotify
            const response = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            });

            // If request wasn't successful throw an error
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Parse response and store token
            const data = await response.json();
            this.accessToken = data.access_token;

            // Calculate expiration time since Spotify's tokens expire in 1 hour
            this.tokenExpirationTime = Date.now() + (data.expires_in * 1000);

            // Makes sure that the token is correct
            if (!this.accessToken) {
                throw new Error('Failed to get access token');
            }
            
            return this.accessToken;

        } catch (error) {
            // Incase it fails for some reason (pray to god it doesn't)
            console.error('Error getting Spotify access token:', error);
            throw error;
        }
    }
}
