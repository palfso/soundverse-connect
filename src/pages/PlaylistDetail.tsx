
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MusicCard } from "@/components/MusicCard";
import {
  MoreVertical,
  Share2,
  Heart,
  Clock,
  Users,
  Music,
  Plus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Playlist } from "@/types/playlist";

// Mock data
const mockPlaylist: Playlist = {
  id: "1",
  name: "Mes favoris",
  description: "Une collection de mes morceaux préférés",
  coverUrl: "/lovable-uploads/5259fc9c-304a-4272-a957-f87c06a2e81b.png",
  isPublic: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: "1",
  tracks: [
    {
      id: 1,
      title: "Starboy",
      artist: "The Weeknd",
      coverUrl: "/lovable-uploads/5259fc9c-304a-4272-a957-f87c06a2e81b.png",
      likes: 2345,
      comments: 156,
      shares: 89
    }
  ],
  followers: 23,
  totalDuration: 3600
};

const PlaylistDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Playlist retirée" : "Playlist suivie",
      description: isFollowing
        ? "Vous ne suivez plus cette playlist"
        : "Cette playlist a été ajoutée à votre bibliothèque",
    });
  };

  const handleShare = () => {
    toast({
      title: "Lien copié",
      description: "Le lien de la playlist a été copié dans le presse-papier",
    });
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 aspect-square relative rounded-lg overflow-hidden bg-accent">
          {mockPlaylist.coverUrl ? (
            <img
              src={mockPlaylist.coverUrl}
              alt={mockPlaylist.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Music className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="flex-1 space

-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{mockPlaylist.name}</h1>
            <p className="text-muted-foreground">{mockPlaylist.description}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {Math.floor(mockPlaylist.totalDuration / 60)} min
            </span>
            <span className="flex items-center">
              <Music className="w-4 h-4 mr-1" />
              {mockPlaylist.tracks.length} titres
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {mockPlaylist.followers} followers
            </span>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button onClick={handleFollow}>
              <Heart className={`w-4 h-4 mr-2 ${isFollowing ? "fill-current" : ""}`} />
              {isFollowing ? "Suivi" : "Suivre"}
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Partager
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Modifier la playlist</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  Supprimer la playlist
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Morceaux</h2>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Ajouter des morceaux
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlaylist.tracks.map((track) => (
            <MusicCard
              key={track.id}
              {...track}
              user={{ username: "artist", avatarUrl: "" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
