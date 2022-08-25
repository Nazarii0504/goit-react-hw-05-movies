import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

const defineClass = ({ isActive }) => (isActive ? s.activeLink : s.link);

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/" className={defineClass}>
        Home
      </NavLink>

      <NavLink to="/movies" className={defineClass}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
