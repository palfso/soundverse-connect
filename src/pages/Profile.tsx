
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/types/user";
import { CalendarDays, Music, Users } from "lucide-react";

// Données de test
const mockProfile: UserProfile = {
  id: "1",
  username: "musiclover",
  displayName: "Music Lover",
  bio: "Passionate about music and sharing great tunes with the community! 🎵",
  avatarUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  followers: 1234,
  following: 567,
  playlists: 23,
  joinedDate: "2023-01-15"
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        {/* En-tête du profil */}
        <div className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <UserAvatar user={mockProfile} size="lg" />
            <div className="text-center">
              <h1 className="text-2xl font-bold">{mockProfile.displayName}</h1>
              <p className="text-muted-foreground">@{mockProfile.username}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <p className="text-2xl font-bold">{mockProfile.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{mockProfile.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{mockProfile.playlists}</p>
              <p className="text-sm text-muted-foreground">Playlists</p>
            </div>
          </div>

          {/* Bio */}
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground">{mockProfile.bio}</p>
            <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4 mr-1" />
              <span>Joined {new Date(mockProfile.joinedDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </div>

          {/* Onglets */}
          <Tabs defaultValue="posts" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="posts" className="flex items-center">
                <Music className="w-4 h-4 mr-2" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="playlists" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Playlists
              </TabsTrigger>
              <TabsTrigger value="liked" className="flex items-center">
                <Music className="w-4 h-4 mr-2" />
                Liked
              </TabsTrigger>
            </TabsList>
            <TabsContent value="posts" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Nous utiliserons les mêmes MusicCard ici plus tard */}
                <div className="h-48 bg-accent rounded-lg flex items-center justify-center">
                  Post content coming soon
                </div>
              </div>
            </TabsContent>
            <TabsContent value="playlists" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="h-48 bg-accent rounded-lg flex items-center justify-center">
                  Playlists coming soon
                </div>
              </div>
            </TabsContent>
            <TabsContent value="liked" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="h-48 bg-accent rounded-lg flex items-center justify-center">
                  Liked content coming soon
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
