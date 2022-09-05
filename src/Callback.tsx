import { useEffect } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import { useSpotifyStore } from './store'

export function Callback() {
  console.log('matching callback')
  const [searchParams, _] = useSearchParams()

  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const state = searchParams.get('state')

  console.log({ code, state, error })
  const token = useSpotifyStore((state) => state.token)
  const getToken = useSpotifyStore((state) => state.getToken)

  const validTokenFetch = !token && !error && code && state

  useEffect(() => {
    ;(async () => {
      if (validTokenFetch) await getToken(code, state)
    })()
  }, [])

  return (
    <>
      {token !== '' ? (
        <Navigate to='/' replace />
      ) : (
        <p>Callback {error && <span>Error: {error}</span>}</p>
      )}
    </>
  )
}
