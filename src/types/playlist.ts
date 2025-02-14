
import { MusicPost } from "./user";

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tracks: MusicPost[];
  collaborators?: string[];
  followers: number;
  totalDuration: number;
}

export interface CreatePlaylistDTO {
  name: string;
  description?: string;
  coverUrl?: string;
  isPublic: boolean;
}
