import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/common/Loader/Loader';
import Error from 'components/common/Error/Error';
import * as API from '../../services/api';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await API.getMovieReviews(movieId);
        setReviews(response.data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [movieId]);

  return (
    <div>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ id, author, content }) => (
            <li key={id}>
              <p>
                <b>Author:</b> {author}
              </p>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>There aren't any reviews for this movie...</p>
      )}
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
};

export default Reviews;
