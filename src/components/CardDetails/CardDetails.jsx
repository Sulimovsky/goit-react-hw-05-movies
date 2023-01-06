import PropTypes from 'prop-types';
import * as API from '../../services/api';
import './CardDetails.scss';

const CardDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <div className="box-img">
        <img
          src={`${API.BASE_IMG_URL}${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div>
        <h2>{movie.title}</h2>
        <p>Average: {movie.vote_average.toFixed(1)}</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

CardDetails.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    overview: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardDetails;
