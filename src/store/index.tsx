import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface Store {
  token: string
  tracks: any
  login: () => Promise<void>
  setLogin: boolean
  getToken: (code: string, state: string) => Promise<void>
  getTracks: () => Promise<void>
}

const loginUrl = `${window.APP_CONFIG.apiUrl}${window.APP_CONFIG.endpoints.login}`
const tokenUrl = (code: string, state: string) =>
  `${window.APP_CONFIG.apiUrl}${window.APP_CONFIG.endpoints.token}?code=${code}&state=${state}`

const useSpotifyStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        token: '',
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
        getTracks: async () => {
          try {
            await fetch(loginUrl)
          } catch (err) {
            console.error(err)
          }
        },
      }),
      {
        name: 'playlist-manager-storage',
      }
    )
  )
)
export { useSpotifyStore }
