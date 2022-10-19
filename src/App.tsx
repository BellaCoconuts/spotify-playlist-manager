import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { Callback } from './Callback'
import { Login } from './Login'
import { useAzureFeatureFlag } from './hooks/useFeatureFlags'

function App() {
  const isAWeatherAppInsteadLol = useAzureFeatureFlag('WeatherForecast')

  return isAWeatherAppInsteadLol ? (
    <p>Brrr its cold lol</p>
  ) : (
    <div className='App'>
      <h1>Playlist Manager</h1>
      <Routes>
        <Route path='/callback' element={<Callback />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
