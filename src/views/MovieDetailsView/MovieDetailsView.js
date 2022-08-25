import { Suspense, lazy, useRef } from 'react';
import { useState, useEffect } from 'react';
import {
  NavLink,
  Route,
  Routes,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import * as moviesAPI from '../../services/movies-api';
import s from './MovieDetailsView.module.css';

const INIT_STATE = {
  init: true,
  title: '',
  poster_path: '',
  vote_average: '',
  overview: '',
  genres: [],
};

const Cast = lazy(() =>
  import('../../components/Cast/Cast' /* webpackChunkName: "home-view" */)
);

const Reviews = lazy(() =>
  import('../../components/Reviews/Reviews' /* webpackChunkName: "home-view" */)
);

const MovieDetailsView = () => {
  const [movie, setMovie] = useState(INIT_STATE);

  const navigate = useNavigate();
  const { state } = useLocation();
  const placeToReturn = useRef(null);

  useEffect(() => {
    if (state) {
      placeToReturn.current = state;
    }
  }, [state]);

  const onGoBack = () => {
    const returnTo = placeToReturn.current ? placeToReturn.current : '/';
    navigate(returnTo);
  };

  const { slug } = useParams();
  const movieID = slug.match(/[a-z0-9]+$/)[0];

  useEffect(() => {
    moviesAPI.fetchMovieById(movieID).then(setMovie);
  }, [movieID]);

  const { title, poster_path, vote_average, overview, genres } = movie;
  const movieGenres = genres.map(item => item.name).join(', ');

  return (
    <>
      <button className={s.btn} onClick={onGoBack}>
        <IoMdArrowBack /> Go back {placeToReturn.current?.label}
      </button>
      {!movie.init && (
        <>
          <section className={s.main}>
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
            />
            <div className={s.info}>
              <h1>{title}</h1>
              <p>User Score: {vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              <p>{movieGenres}.</p>
            </div>
          </section>

          <section className={s.additional}>
            <ul>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </section>

          <Suspense fallback={<h1>LOADING THE ROUTE...</h1>}>
            <Routes>
              <Route path="reviews" element={<Reviews id={movieID} />} />
              <Route path="cast" element={<Cast id={movieID} />} />
            </Routes>
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetailsView;


