import { useState, useEffect, Suspense } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';
import Section from 'components/common/Section/Section';
import CardDetails from 'components/CardDetails/CardDetails';
import Loader from 'components/common/Loader/Loader';
import Error from 'components/common/Error/Error';
import * as API from '../../services/api';
import './MovieDetails.scss';

const MovieDetails = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await API.getMovieDetails(movieId);
        setMovie(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [movieId]);

  return (
    <main>
      <Section>
        <Link to={backLinkHref} className="go-back-link">
          &lt;- Go back
        </Link>
        {movie && (
          <>
            <CardDetails movie={movie} />

            <div className="more-info">
              <h3>Additional info</h3>
              <ul className="list-more-info">
                <li className="item">
                  <Link to="cast" state={{ from: backLinkHref }}>
                    Cast
                  </Link>
                </li>
                <li className="item">
                  <Link to="reviews" state={{ from: backLinkHref }}>
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
          </>
        )}
        {loading && <Loader />}
        {error && <Error />}
      </Section>
    </main>
  );
};

export default MovieDetails;
