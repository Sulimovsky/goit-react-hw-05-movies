import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CardMovie.scss';

const CardMovie = ({ id, img, title, to }) => {
  const location = useLocation();

  return (
    <div className="card-film">
      <div className="img-box">
        <img src={img} alt={title} />
      </div>
      <div className="link-box">
        <Link to={to ? `${to}/${id}` : `${id}`} state={{ from: location }}>
          {title}
        </Link>
      </div>
    </div>
  );
};

CardMovie.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default CardMovie;
