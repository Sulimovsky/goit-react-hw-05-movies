import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from 'components/common/Loader/Loader';
import Error from 'components/common/Error/Error';
import * as API from '../../services/api';
import './Cast.scss';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await API.getMovieCredits(movieId);
        setCast(response.data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [movieId]);

  return (
    <div>
      {cast.length > 0 && (
        <ul className="cast-list">
          {cast.map(({ id, name, profile_path }) => (
            <li key={id} id={id} className="item">
              <div className="box-img">
                <img src={`${API.BASE_IMG_URL}${profile_path}`} alt={name} />
              </div>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      )}
      {loading && <Loader />}
      {error && <Error />}
    </div>
  );
};

export default Cast;
