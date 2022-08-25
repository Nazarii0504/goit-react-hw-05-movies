import Axios from 'axios';

Axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '0d3c19a06e728eab3e881b744ba766c6';

const fetchWithKey = async (url = '', query = '') => {
  const paramsObj = {
    api_key: API_KEY,
  };

  if (query) {
    paramsObj.query = query;
  }

  const searchParams = new URLSearchParams(paramsObj);
  const response = await Axios.get(`${url}?${searchParams}`);
  return await response.data;
};

export const fetchPopularMovies = async () => {
  const data = await fetchWithKey('/trending/movie/week');
  return data.results;
};

export const fetchMovieById = async movieID => {
  return await fetchWithKey(`/movie/${movieID}`);
};

export const fetchMovieCast = async movieID => {
  const data = await fetchWithKey(`/movie/${movieID}/credits`);
  return data.cast;
};

export const fetchMovieReviews = async movieID => {
  const data = await fetchWithKey(`/movie/${movieID}/reviews`);
  return data.results;
};

export const fetchWithSearch = async key_word => {
  const data = await fetchWithKey(`/search/movie`, key_word);
  return data.results;
};
