import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConnectedService } from "@/types/user";
import { CalendarClock, Music2, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateSpotifyAuthUrl, getSpotifyAccessToken } from '@/services/spotify/config';
import { spotifyApi } from '@/services/spotify/api';
import { useState, useEffect } from 'react';

interface ConnectedServicesProps {
  services: ConnectedService[];
  onConnect: (serviceName: ConnectedService['name']) => void;
  onSync: (serviceId: string) => void;
}

export function ConnectedServices({ services, onConnect, onSync }: ConnectedServicesProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSpotifyAuth = async () => {
    window.location.href = generateSpotifyAuthUrl();
  };

  const handleConnect = async (serviceName: ConnectedService['name']) => {
    if (serviceName === 'spotify') {
      handleSpotifyAuth();
    } else {
      onConnect(serviceName);
    }
  };

  const handleSync = async (service: ConnectedService) => {
    setIsLoading(true);
    try {
      if (service.name === 'spotify') {
        const playlists = await spotifyApi.getPlaylists();
        console.log('Playlists synchronisées:', playlists);
        toast({
          title: "Synchronisation réussie",
          description: `${playlists.length} playlists importées depuis Spotify`,
        });
      }
      onSync(service.id);
    } catch (error) {
      console.error('Erreur de synchronisation:', error);
      toast({
        title: "Erreur de synchronisation",
        description: "Une erreur est survenue lors de la synchronisation",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getServiceIcon = (name: ConnectedService['name']) => {
    switch (name) {
      case 'spotify':
        return "/spotify-icon.png";
      case 'apple_music':
        return "/apple-music-icon.png";
      case 'deezer':
        return "/deezer-icon.png";
      default:
        return null;
    }
  };

  const getServiceColor = (name: ConnectedService['name']) => {
    switch (name) {
      case 'spotify':
        return "bg-[#1DB954]/10 text-[#1DB954]";
      case 'apple_music':
        return "bg-[#FC3C44]/10 text-[#FC3C44]";
      case 'deezer':
        return "bg-[#00C7F2]/10 text-[#00C7F2]";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Services connectés</h2>
        <Button variant="outline" size="sm">
          <Music2 className="w-4 h-4 mr-2" />
          Importer une playlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <Card key={service.id} className={`${getServiceColor(service.name)} border-none`}>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <div className="flex items-center space-x-2 flex-1">
                {getServiceIcon(service.name) && (
                  <img
                    src={getServiceIcon(service.name)}
                    alt={service.name}
                    className="w-6 h-6"
                  />
                )}
                <CardTitle className="capitalize">
                  {service.name.replace('_', ' ')}
                </CardTitle>
              </div>
              {service.connected ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSync(service)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Sync
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleConnect(service.name)}
                  disabled={isLoading}
                >
                  Connecter
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {service.connected ? (
                <div className="text-sm space-y-2">
                  <p className="text-muted-foreground">
                    Connecté en tant que {service.username}
                  </p>
                  {service.lastSync && (
                    <p className="flex items-center text-xs">
                      <CalendarClock className="w-3 h-3 mr-1" />
                      Dernière sync : {new Date(service.lastSync).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ) : (
                <CardDescription>
                  Connectez-vous pour synchroniser vos playlists
                </CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
