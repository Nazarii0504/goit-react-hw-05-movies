import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import * as moviesAPI from '../../services/movies-api';

const makeSlug = (id, title) => slugify(`${title} ${id}`, { lower: true });

const HomeView = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    moviesAPI.fetchPopularMovies().then(setItems);
  }, []);

  const { pathname } = useLocation();

  return (
    <>
      <h1>Trending this week</h1>
      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link
              to={`/movies/${makeSlug(id, title)}`}
              state={{ label: 'to home page', pathname }}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomeView;
