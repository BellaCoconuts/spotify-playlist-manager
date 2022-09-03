import crypto from 'crypto'
import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())

const port = 3000

const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const redirect_uri = 'http://localhost:3000/callback'

app.get('/login', (_, res) => {
  const state = crypto.randomBytes(16).toString('hex')

  const scope = 'user-read-private user-read-email'

  const params = new URLSearchParams({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state,
  })

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`)
})

app.get('/callback', async (req, res) => {
  const code = req.query.code || null
  const state = req.query.code || null
  const params = new URLSearchParams({ error: 'state_mismatch' })

  if (state === null) {
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

app.listen(port, () => {
  console.log(`listening on ${port}`)
})
