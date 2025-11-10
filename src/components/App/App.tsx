// import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './App.module.css';
import fetchMovies from '../../services/movieService';
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalMovie, setIsModalMovie] = useState<Movie | null>(null);

  const handleSearch = async (data: string) => {
    try {
      setError(false);
      setMovies([]);
      setIsLoading(true);
      const dataMovie = await fetchMovies(data);
      setMovies(dataMovie);
      if (dataMovie.length === 0) {
        toast.error('No movies found for your request.');
      }
    } catch {
      setError(true);
      // console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  function handleClik(movie: Movie) {
    setIsModalMovie(movie);
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
    setIsModalMovie(null);
  }
  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid
          movies={movies}
          onSelect={handleClik}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isModalOpen && isModalMovie && (
        <MovieModal
          movie={isModalMovie}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default App;
