import { Artist } from './Artist'
import { SpotifyImage } from './SpotifyImage'

export interface Album {
  album_type: 'album' | 'single' | 'compilation'
  artists: Artist[]
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  release_date: string
  release_date_precision: 'year' | 'month' | 'day'
  total_tracks: number
  type: 'album'
  uri: string
}
