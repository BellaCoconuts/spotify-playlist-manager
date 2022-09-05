import { useEffect } from 'react'

export function Login() {
  useEffect(() => {
    window.location.href = `http://localhost:3000/login`
  }, [])

  return <></>
}
