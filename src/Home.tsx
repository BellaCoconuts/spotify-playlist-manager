import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useSpotifyStore } from './store'

const Library = () => {
  const token = useSpotifyStore((state) => state.token)

  useEffect(() => {
    ;(async () => {
      const response = await fetch(
        `${window.APP_CONFIG.spotifyApiUrl}${window.APP_CONFIG.spotifyEndpoints.getLibrary}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response.status)

      const data = await response.json()

      console.log(data)
    })()
  }, [])
  return <>Library</>
}

export function Home() {
  const token = useSpotifyStore((state) => state.token)

  return (
    <>
      {token && (
        <>
          <p>Logged In</p>
          <Library />
        </>
      )}
      {!token && <Navigate to='/login' replace />}
    </>
  )
}
