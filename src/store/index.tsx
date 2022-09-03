import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Store {
  token: string
  tracks: any
  getTracks: () => Promise<void>
}

const loginUrl = `${window.APP_CONFIG.apiUrl}${window.APP_CONFIG.endpoints.login}`

const useSpotifyStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        token: '',
        tracks: [],
        getTracks: async () => {
          try {
            const response = await fetch(loginUrl)
          } catch (err) {}
        },
      }),
      {
        name: 'playlist-manager-storage',
      }
    )
  )
)
