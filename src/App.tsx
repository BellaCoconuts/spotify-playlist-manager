import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleLogin = () => {}

  return (
    <div className='App'>
      <h1>Spotify Playlist Manager</h1>
      <div className='card'>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default App
