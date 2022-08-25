import { useEffect, useState } from 'react';
import * as moviesAPI from '../../services/movies-api';
import s from './Cast.module.css';

const Cast = ({ id }) => {
  const [cast, setCast] = useState(null);
  useEffect(() => {
    moviesAPI.fetchMovieCast(id).then(setCast);
  }, [id]);

  return (
    <>
      {cast && (
        <ul>
          {cast.map(({ name, character, profile_path, id }) => (
            <li key={id}>
              <div className={s.person}>
                {profile_path && (
                  <img
                    className={s.profile}
                    src={`https://image.tmdb.org/t/p/w300${profile_path}`}
                    alt={name}
                  />
                )}
                <div>
                  <p>{name}</p>
                  <p>Character: {character}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Cast;
