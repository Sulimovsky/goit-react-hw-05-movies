import { Link, NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from 'components/common/Loader/Loader';
import './SharedLayout.scss';

const SharedLayout = () => {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            My favourite film
          </Link>
          <ul className="list-nav">
            <li className="item">
              <NavLink to="/" end className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="item">
              <NavLink to="/movies" className="nav-link">
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
