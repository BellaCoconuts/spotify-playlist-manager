import { useEffect } from 'react'
import { useSpotifyStore } from './store'
import { Library as ILibrary } from './types/Library'
import { Track } from './types/track'
import { useFeatureFlag } from './hooks/featureFlags'

const getData = async (token: string, url: string) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const data: ILibrary = await response.json()

  return data
}

const formatTrackDataFromLibrary = (tracks: Track[]) =>
  tracks
    .map((t) => t.track)
    .filter((t) => !t?.is_playable)
    .map((t) => ({
      name: `${t.name} - ${t.artists[0].name}`,
      href: t.href,
      available: false,
    }))

export const Library = () => {
  const token = useSpotifyStore((state) => state.token)
  const setUnavilableTracks = useSpotifyStore(
    (state) => state.setUnavilableTracks
  )
  const tracks = useSpotifyStore((state) => state.tracks)

  useEffect(() => {
    ;(async () => {
      if (tracks.length > 0) return

      let data = await getData(
        token,
        `${window.APP_CONFIG.spotifyApiUrl}${window.APP_CONFIG.spotifyEndpoints.getLibrary}?market=GB`
      )

      setUnavilableTracks(formatTrackDataFromLibrary(data.items))

      while (data.next) {
        data = await getData(token, data.next)
        setUnavilableTracks(formatTrackDataFromLibrary(data.items))
      }
    })()
  }, [])

  const isLibraryEnabled = useFeatureFlag('WeatherForecast')

  return (
    <>
      {isLibraryEnabled ? (
        <h2>Songs that are no longer available:</h2>
      ) : (
        <p>Farts</p>
      )}
      {tracks.map((t) => (
        <p>{t.name}</p>
      ))}
    </>
  )
}
