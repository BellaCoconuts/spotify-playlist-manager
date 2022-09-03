export {}

declare global {
  interface Window {
    APP_CONFIG: {
      apiUrl: string
      endpoints: {
        login: string
        getPlaylist: string
        getTrackInfo: string
      }
    }
  }
}
