import { useEffect, useState } from 'react';
import * as moviesAPI from '../../services/movies-api';
// import s from './Reviews.module.css';

const Reviews = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    moviesAPI.fetchMovieReviews(id).then(setReviews);
  }, [id]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ author, content, id }) => (
            <li key={id}>
              <div>
                <div>
                  <h3>Author: {author}</h3>
                  <p>{content}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no reviews yet!</p>
      )}
    </>
  );
};

export default Reviews;
