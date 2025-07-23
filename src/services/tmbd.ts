import type { Movie } from '../types/movie'
import type { MovieDetail } from '../types/movieDetail'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = import.meta.env.VITE_TMDB_API_URL

export async function searchMovies(query: string) {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
  const data = await response.json()
  return data.results
}

export async function searchPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function GenreMovies(){
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
  const data = await response.json()
  return data.genres
}

export async function TopRatedMovies(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function getUpcomingMovies(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function getTrend(): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function getMovieDetails(id: number): Promise<MovieDetail> {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  const data = await response.json()
  return data
}

export async function getRecommendations(id: number): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results
}

export async function getMovieVideos(id: number): Promise<{ key: string; name: string }[]> {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`)
  const data = await response.json()
  return data.results.map((video: any) => ({
    key: video.key,
    name: video.name
  }))
}

export async function searchMoviesByGenre(genreId: number): Promise<Movie[]> {
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
  const data = await response.json()
  return data.results
}