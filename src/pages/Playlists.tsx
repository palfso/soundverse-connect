
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, Clock, Users, PlayCircle, Info } from "lucide-react";
import { Playlist } from "@/types/playlist";
import { PlaylistTag } from "@/components/PlaylistTag";
import { ListeningHistory } from "@/components/ListeningHistory";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data
const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Mes favoris",
    description: "Une collection de mes morceaux préférés",
    coverUrl: "/lovable-uploads/5259fc9c-304a-4272-a957-f87c06a2e81b.png",
    isPublic: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: "1",
    tracks: [],
    followers: 23,
    totalDuration: 3600
  }
];

const Playlists = () => {
  return (
    <div className="container py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Mes Playlists</h1>
              <div className="flex items-center gap-2">
                <PlaylistTag 
                  name="Pop" 
                  color="primary"
                  description="Musique pop contemporaine"
                />
                <PlaylistTag 
                  name="Favoris" 
                  color="warning"
                  description="Vos morceaux préférés"
                />
                <PlaylistTag 
                  name="Découvertes" 
                  color="success"
                  description="Nouveaux artistes et morceaux"
                />
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/playlists/create">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Créer une playlist
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Créez une nouvelle playlist personnalisée</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPlaylists.map((playlist) => (
              <Link
                key={playlist.id}
                to={`/playlists/${playlist.id}`}
                className="group relative overflow-hidden rounded-lg aspect-square bg-accent hover-scale"
              >
                {playlist.coverUrl ? (
                  <img
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <PlayCircle className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end text-white">
                  <h3 className="text-lg font-semibold">{playlist.name}</h3>
                  <p className="text-sm text-white/80">{playlist.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {Math.floor(playlist.totalDuration / 60)} min
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Durée totale de la playlist</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {playlist.followers}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Nombre de followers</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <ListeningHistory />
        </div>
      </div>
    </div>
  );
};

export default Playlists;
