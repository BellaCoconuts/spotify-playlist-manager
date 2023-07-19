import { useEffect } from 'react'

export function Login() {
  useEffect(() => {
    window.location.href =
      window.location.hostname === 'localhost'
        ? 'http://localhost:3000/login'
        : 'https://web-dedupe-sptfy-app.azurewebsites.net/login'
  }, [])

  return <></>
}
