import type { Movie } from '../types/movie'
import type { MovieDetail } from '../types/movieDetail'
import axios from 'axios'

const API_KEY = 'd09afaa763de60066107386a9848e1cd'
const BASE_URL = 'https://api.themoviedb.org/3'


export async function searchMovies(query: string) {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query
    }
  })
  return res.data.results
}


export async function searchPopularMovies() {
  const res = await axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
    }
  })
  return res.data.results
}
export async function GenreMovies(){
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    }
  })
  return res.data.genres
}
export async function TopRatedMovies(): Promise<Movie[]> {
  const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
    }
  })
  return response.data.results
}
export async function getUpcomingMovies(): Promise<Movie[]> {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: {
      api_key: API_KEY,
    }
  })
  return response.data.results
}
export async function getTrend(): Promise<Movie[]> {
  const response = await axios.get(`${BASE_URL}/trending/all/week`, {
    params: {
      api_key: API_KEY,
    }
  })
  return response.data.results
}
export async function getMovieDetails(id: number): Promise<MovieDetail> {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
    }
  })
  return response.data
}
export async function getRecommendations(id: number): Promise<Movie[]> {
  const response = await axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
    params: {
      api_key: API_KEY,
    }
  })
  return response.data.results
}

export async function getMovieVideos(id: number): Promise<{ key: string; name: string }[]> {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: {
      api_key: API_KEY, 
    }
  })
  return response.data.results.map((video: any) => ({
    key: video.key,
    name: video.name
  }))
}
export async function searchMoviesByGenre(genreId: number): Promise<Movie[]> {
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreId,
    }
  })
  return res.data.results
}