import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import s from './MoviesView.module.css';
import slugify from 'slugify';

const makeSlug = (id, title) => slugify(`${title} ${id}`, { lower: true });

const MoviesView = ({ search, setSearch }) => {
  const [movies, setMovies] = useState([]);
  const isFirstRender = useRef(true);

  const doSearch = useCallback(() => moviesAPI.fetchWithSearch(search).then(setMovies), [search]);

  const handleSubmit = e => {
    e.preventDefault();
    doSearch();
  };

  useEffect(() => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    search && doSearch();
  }, [search, doSearch]);

  const { pathname } = useLocation();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className={s.input}
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className={s.submit} type="submit">
          Search
        </button>
      </form>

      <ul>
        {movies.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={`${makeSlug(id, title)}`}
              state={{ label: 'to movie search', pathname }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviesView;

MoviesView.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
}