import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Navbar.css';

function Navbar() {
  const { user } = useUser();
  return (
    <div>
      <nav>
        <ul>
          <li id="home">Translator</li>
        </ul>
        {user !== null && (
          <ul>
            <li>
              <NavLink to="/translations">Translations</NavLink>
            </li>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          </ul>
        )}
      </nav>
      <span></span>
    </div>
  );
}

export default Navbar;
