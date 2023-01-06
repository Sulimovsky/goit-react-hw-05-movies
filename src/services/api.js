import axios from 'axios';

const API_KEY = '288d413468bcdb13681c080a523b13ad';
const BASE_URL = 'https://api.themoviedb.org/3';
export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const getTrendingMovies = () => {
  const resonse = axios(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
  return resonse;
};

export const getSearchMovies = query => {
  const response = axios(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response;
};

export const getMovieDetails = movieId => {
  const response = axios(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  return response;
};

export const getMovieCredits = movieId => {
  const response = axios(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response;
};

export const getMovieReviews = movieId => {
  const response = axios(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response;
};
