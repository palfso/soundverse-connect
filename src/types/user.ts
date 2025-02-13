
export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  followers: number;
  following: number;
  playlists: number;
  joinedDate: string;
  posts: MusicPost[];
  badges: Badge[];
  expertise: {
    sharedMusic: number;
    interactions: number;
  };
}

export interface MusicPost {
  id: number;
  title: string;
  artist: string;
  coverUrl: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  level: 'bronze' | 'silver' | 'gold';
}
