
export const SPOTIFY_AUTH_CONFIG = {
  authEndpoint: 'https://accounts.spotify.com/authorize',
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  redirectUri: `${window.location.origin}/callback`,
  scopes: [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
  ],
};

export const generateSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_AUTH_CONFIG.clientId,
    redirect_uri: SPOTIFY_AUTH_CONFIG.redirectUri,
    scope: SPOTIFY_AUTH_CONFIG.scopes.join(' '),
    response_type: 'token',
    show_dialog: 'true',
  });

  return `${SPOTIFY_AUTH_CONFIG.authEndpoint}?${params.toString()}`;
};

export const getSpotifyAccessToken = (): string | null => {
  const token = localStorage.getItem('spotify_access_token');
  const expiry = localStorage.getItem('spotify_token_expiry');
  
  if (!token || !expiry || Date.now() > parseInt(expiry)) {
    return null;
  }
  
  return token;
};

export const setSpotifyAccessToken = (token: string) => {
  localStorage.setItem('spotify_access_token', token);
  // Token expire dans 1 heure
  localStorage.setItem('spotify_token_expiry', (Date.now() + 3600 * 1000).toString());
};
