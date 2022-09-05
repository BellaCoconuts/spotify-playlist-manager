export {}

declare global {
  interface Window {
    APP_CONFIG: {
      apiUrl: string
      spotifyApiUrl: string
      spotifyEndpoints: {
        getAllPlaylists: string
        getLibrary: string
      }
      endpoints: {
        login: string
        token: string
      }
    }
  }
}
