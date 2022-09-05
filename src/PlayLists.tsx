import { useSpotifyStore } from './store'
import { PlaylistsProps } from './PlaylistsProps'

export function PlayLists({ playlists }: PlaylistsProps) {
  const token = useSpotifyStore((state) => state.token)
  const setUnavilableTracks = useSpotifyStore(
    (state) => state.setUnavilableTracks
  )
  const unavailableTracks = useSpotifyStore((state) => state.unavailableTracks)
  const handleClick = async (href: string, numberOfTracks: number) => {
    const tracks = []

    const response = await fetch(
      `${href}?limit=${Math.min(numberOfTracks, 50)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    console.log(data)

    const unavailableTracks = data.items.filter((t: any) =>
      t.track.available_markets.includes('GB')
    )

    setUnavilableTracks(unavailableTracks)
    //}
  }

  return (
    <>
      <h2>Playlists</h2>
      {playlists.length > 0 &&
        playlists.items.map((p: any) => (
          <button onClick={() => handleClick(p.tracks.href, p.tracks.total)}>
            {p.name}
          </button>
        ))}

      {unavailableTracks.length > 0 &&
        unavailableTracks.items.map((t: any) => (
          <p>
            {t.track.name} - {t.track.artists[0].name}
          </p>
        ))}
    </>
  )
}
