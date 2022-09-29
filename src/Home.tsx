import { Navigate } from 'react-router-dom'
import { Library } from './Library'
import { useSpotifyStore } from './store'

export function Home() {
  const token = useSpotifyStore((state) => state.token)

  return (
    <>
      {token && <Library />}
      {!token && <Navigate to='/login' replace />}
    </>
  )
}
