import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBox from 'components/SearchBox/SearchBox';
import Section from 'components/common/Section/Section';
import CardFilm from 'components/CardMovie/CardMovie';
import Loader from 'components/common/Loader/Loader';
import Error from 'components/common/Error/Error';
import * as API from '../../services/api';
import './Movies.scss';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [queryParams, setQueryParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const query = queryParams.get('query') ?? '';

  useEffect(() => {
    if (query === '') {
      return;
    }
    (async function () {
      try {
        setLoading(true);
        const response = await API.getSearchMovies(query);
        setMovies(response.data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

  const handleSubmit = value => {
    const params = value !== '' ? { query: value } : {};
    setQueryParams(params);
  };

  return (
    <main>
      <Section>
        <SearchBox onSubmit={handleSubmit} />
        {movies.length > 0 && (
          <ul className="moives-list">
            {movies.map(({ id, title, name, poster_path }) => (
              <li key={id} className="item">
                <CardFilm
                  img={`${API.BASE_IMG_URL}${poster_path}`}
                  title={title ?? name}
                  id={id}
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

export default Movies;
