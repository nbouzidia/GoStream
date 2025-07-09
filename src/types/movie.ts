export interface Movie {
  id: number
  title: string
  poster_path: string | null
  overview: string
  release_date: string
  vote_average: number
  vote_count: number
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  original_language: string
  original_title: string
  popularity: number
  video: boolean
  media_type?: string
}