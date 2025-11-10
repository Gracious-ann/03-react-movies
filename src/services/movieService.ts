import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieHttpResponse {
  results: Movie[];
}

const fetchMovies = async (movie: string): Promise<Movie[]> => {
  const response = await axios.get<MovieHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      params: {
        query: movie,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );
  return response.data.results;
};

export default fetchMovies;
