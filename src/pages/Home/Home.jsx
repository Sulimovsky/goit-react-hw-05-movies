import { useState, useEffect } from 'react';
import Section from 'components/common/Section/Section';
import CardFilm from 'components/CardMovie/CardMovie';
import Loader from 'components/common/Loader/Loader';
import Error from 'components/common/Error/Error';
import * as API from '../../services/api';
import './Home.scss';

const Home = () => {
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await API.getTrendingMovies();
        setTrendingMovie(response.data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main>
      <Section title="Trending today">
        {trendingMovie.length > 0 && (
          <ul className="trending-list">
            {trendingMovie.map(({ id, title, name, poster_path }) => (
              <li key={id} className="item">
                <CardFilm
                  img={`${API.BASE_IMG_URL}${poster_path}`}
                  title={title ?? name}
                  id={id}
                  to="movies"
                />
              </li>
            ))}
          </ul>
        )}
        {loading && <Loader />}
        {error && <Error />}
      </Section>
    </main>
  );
};

export default Home;
