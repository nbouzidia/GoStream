export interface MovieDetail {
    id: number
    title: string
    original_title: string
    overview: string
    release_date: string
    vote_average: number
    vote_count: number
    adult: boolean
    backdrop_path: string | null
    poster_path: string | null
    genres: { id: number; name: string }[]
    homepage: string | null
    imdb_id: string
    original_language: string
    popularity: number
    revenue: number
    budget: number
    runtime: number
    status: string
    tagline: string
    video: boolean
    spoken_languages: {
      english_name: string
      iso_639_1: string
      name: string
    }[]
    production_companies: {
      id: number
      logo_path: string | null
      name: string
      origin_country: string
    }[]
    production_countries: {
      iso_3166_1: string
      name: string
    }[]
    origin_country: string[]
  }