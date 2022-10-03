window.APP_CONFIG = {
  apiUrl:
    window.location.hostname === 'http://localhost:3000'
      ? 'http://localhost:3000'
      : 'https://web-dedupe-sptfy-app.azurewebsites.net',
  spotifyApiUrl: 'https://api.spotify.com/v1',
  spotifyEndpoints: {
    getAllPlaylists: '/me/playlists',
    getLibrary: '/me/tracks',
  },
  endpoints: {
    login: '/login',
    token: '/token',
  },
}
