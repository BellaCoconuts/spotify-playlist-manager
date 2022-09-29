import { Track } from './track'

export interface Library {
  href: string
  items: Track[]
  next: string | null
  offset: number
  previous: string | null
  total: number
}
