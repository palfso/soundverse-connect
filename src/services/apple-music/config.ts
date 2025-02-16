
export const APPLE_MUSIC_CONFIG = {
  developerToken: import.meta.env.VITE_APPLE_MUSIC_DEVELOPER_TOKEN || '',
};

export const getMusicKitInstance = async () => {
  // @ts-ignore - MusicKit est injecté globalement
  await window.MusicKit.configure({
    developerToken: APPLE_MUSIC_CONFIG.developerToken,
    app: {
      name: 'Your App Name',
      build: '1.0.0',
    },
  });
  // @ts-ignore
  return window.MusicKit.getInstance();
};

export const getAppleMusicToken = (): string | null => {
  return localStorage.getItem('apple_music_user_token');
};

export const setAppleMusicToken = (token: string) => {
  localStorage.setItem('apple_music_user_token', token);
};
