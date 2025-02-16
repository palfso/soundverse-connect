
import { getMusicKitInstance, getAppleMusicToken } from './config';

interface AppleMusicPlaylist {
  id: string;
  name: string;
  description: string;
  trackCount: number;
}

interface AppleMusicProfile {
  id: string;
  name: string;
  image?: string;
}

class AppleMusicApiService {
  private music: any;

  async initialize() {
    if (!this.music) {
      this.music = await getMusicKitInstance();
    }
    return this.music;
  }

  async authorize() {
    const music = await this.initialize();
    try {
      const token = await music.authorize();
      return token;
    } catch (error) {
      console.error('Apple Music authorization error:', error);
      throw error;
    }
  }

  async getProfile(): Promise<AppleMusicProfile> {
    await this.initialize();
    const token = getAppleMusicToken();
    if (!token) {
      throw new Error('Not authenticated with Apple Music');
    }
    
    // Implement profile fetching once authorized
    return {
      id: 'placeholder',
      name: 'Apple Music User',
    };
  }

  async getPlaylists(): Promise<AppleMusicPlaylist[]> {
    await this.initialize();
    const token = getAppleMusicToken();
    if (!token) {
      throw new Error('Not authenticated with Apple Music');
    }

    try {
      const response = await this.music.api.library.playlists();
      return response.map((playlist: any) => ({
        id: playlist.id,
        name: playlist.attributes.name,
        description: playlist.attributes.description?.standard || '',
        trackCount: playlist.attributes.trackCount,
      }));
    } catch (error) {
      console.error('Error fetching Apple Music playlists:', error);
      throw error;
    }
  }
}

export const appleMusicApi = new AppleMusicApiService();
