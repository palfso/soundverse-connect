
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSpotifyAccessToken } from '@/services/spotify/config';
import { Loader2 } from "lucide-react";

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get('access_token');

      if (accessToken) {
        setSpotifyAccessToken(accessToken);
        navigate('/profile');
      } else {
        // Gérer l'erreur
        console.error('No access token received');
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Connexion à Spotify en cours...</span>
    </div>
  );
};

export default SpotifyCallback;
