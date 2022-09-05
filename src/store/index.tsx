import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Store {
  token: string
  unavailableTracks: any
  tracks: any
  login: () => Promise<void>
  setLogin: boolean
  getToken: (code: string, state: string) => Promise<void>
  // getPlaylists: () => Promise<void>
  // getPlaylist: () => Promise<void>
  setUnavilableTracks: (tracks: any) => void
}

const loginUrl = `${window.APP_CONFIG.apiUrl}${window.APP_CONFIG.endpoints.login}`
const getAllPlaylists = `${window.APP_CONFIG.spotifyApiUrl}${window.APP_CONFIG.spotifyEndpoints.getAllPlaylists}`
const tokenUrl = (code: string, state: string) =>
  `${window.APP_CONFIG.apiUrl}${window.APP_CONFIG.endpoints.token}?code=${code}&state=${state}`

const useSpotifyStore = create<Store>()(
  devtools(
    persist(
      (set, get) => ({
        token: '',
        unavailableTracks: [],
        setUnavilableTracks: (tracks: any) => {
          set((state) => ({ ...state, unavailableTracks: tracks }))
        },
        tracks: [],
        login: async () => {
          try {
            await fetch(loginUrl)
            set((state) => ({ ...state, setLogin: true }))
          } catch (err) {
            console.error(err)
          }
        },
        setLogin: false,
        getToken: async (code, state) => {
          try {
            const response = await fetch(tokenUrl(code, state))
            const data = await response.json()

            set((state) => ({ ...state, token: data.access_token }))
          } catch (err) {
            console.error(err)
          }
        },
        // getPlaylists: async () => {
        //   try {
        //     const token = get().token
        //     const response = await fetch(getAllPlaylists, {
        //       headers: {
        //         Authorization: `Bearer ${token}`,
        //         'Content-Type': 'application/json',
        //       },
        //     })
        //     const data = await response.json()

        //     console.log(data)

        //     set((state) => ({ ...state, tracks: data }))
        //   } catch (err) {
        //     console.error(err)
        //   }
        // },
        // getPlaylist: async () => {},
      }),
      {
        name: 'playlist-manager-storage',
      }
    )
  )
)
export { useSpotifyStore }
