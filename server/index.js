import crypto from 'crypto'
import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'
import { resolve, join } from 'path'

dotenv.config()

const app = express()

app.use(cors())

const port = process.env.PORT || 3000

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri =
  `${process.env.REDIRECT_URL}/callback` || 'http://localhost:3000/callback'

app.get('/login', (_, res) => {
  console.log('handling log in')
  const state = crypto.randomBytes(16).toString('hex')

  const scope = 'user-read-private user-read-email user-library-read'

  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state,
  })

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
})

app.get('/token', async (req, res) => {
  console.log('entering /token')

  const code = req.query.code || null
  const state = req.query.code || null
  const params = new URLSearchParams({ error: 'state_mismatch' })

  if (state === null) {
    console.log('state null, returning')
    res.redirect(`/#${params}`)
    return
  }

  const inputData = {
    code: code,
    redirect_uri: redirect_uri,
    grant_type: 'authorization_code',
  }

  const formData = []

  for (const property in inputData) {
    const key = encodeURIComponent(property)
    const value = encodeURIComponent(inputData[property])
    formData.push(`${key}=${value}`)
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: formData.join('&'),
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const data = await response.json()

  res.send({
    access_token: data?.access_token,
  })
})

if (process.env.NODE_ENV === 'development') {
  app.use(express.static(join(resolve(), '..', '..', 'public')))
  app.use(express.static(join(resolve(), '..', '..', 'assets')))
  app.use(express.static(join(resolve(), '..', '..', 'dist')))
} else {
  app.use(express.static(join(resolve(), 'public')))
  app.use(express.static(join(resolve(), 'assets')))
  app.use(express.static(join(resolve(), 'dist')))
}

app.get('/', (_, res) => {
  res.sendFile(join(resolve(), 'dist', 'index.html'))
})
app.get('/login', (_, res) => {
  res.sendFile(join(resolve(), 'dist', 'index.html'))
})
app.get('/callback', (_, res) => {
  res.sendFile(join(resolve(), 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
