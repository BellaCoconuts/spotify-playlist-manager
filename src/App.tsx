import { useEffect } from 'react'
import './App.css'
import { Route, Routes, useSearchParams, Navigate } from 'react-router-dom'
import { useSpotifyStore } from './store'

function Login() {
  useEffect(() => {
    window.location.href = `${window.location.protocol}://${window.location.host}/login`
  }, [])

  return <></>
}

function Callback() {
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

function Home() {
  const token = useSpotifyStore((state) => state.token)
  return (
    <>
      {token && <p>Logged In</p>}
      {!token && <Navigate to='/login' replace />}
    </>
  )
}

function App() {
  return (
    <div className='App'>
      <h1>Spotify Playlist Manager</h1>
      <Routes>
        <Route path='/callback' element={<Callback />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
