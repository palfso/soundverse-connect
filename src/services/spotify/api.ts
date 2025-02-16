
import { getSpotifyAccessToken } from './config';

const BASE_URL = 'https://api.spotify.com/v1';

interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  tracks: {
    total: number;
  };
}

interface SpotifyProfile {
  id: string;
  display_name: string;
  images: { url: string }[];
}

class SpotifyApiService {
  private async fetchSpotify(endpoint: string, options: RequestInit = {}) {
    const token = getSpotifyAccessToken();
    if (!token) {
      throw new Error('No Spotify access token available');
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProfile(): Promise<SpotifyProfile> {
    return this.fetchSpotify('/me');
  }

  async getPlaylists(): Promise<SpotifyPlaylist[]> {
    const response = await this.fetchSpotify('/me/playlists');
    return response.items;
  }

  async importPlaylist(playlistId: string) {
    const response = await this.fetchSpotify(`/playlists/${playlistId}`);
    return response;
  }
}

export const spotifyApi = new SpotifyApiService();
