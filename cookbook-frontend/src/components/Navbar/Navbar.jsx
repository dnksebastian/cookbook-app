import './Navbar.css'

import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar';

import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../hooks/useAuthContext';


const Navbar = () => {
  const { color } = useTheme()
  const userData = useAuthContext();
  const user = userData.user;

  return (
    <header className='header' style={{ background: color }}>
      <nav className='top-nav'>
        <Link to='/'>
          <p className='logo'>Cookbook App</p>
        </Link>
        {user && <Searchbar />}
        {user &&
        <div className="auth-helper">
          <Link to='/new'><p className='nav-link'>Create Recipe</p></Link>
          <button onClick={userData.logoutUser} id='logout-btn'>Logout</button>
        </div>
        }
        {!user &&
          <div className="auth-helper">
            <Link to='/login'><p className='nav-link'>Login</p></Link>
            <Link to='/signup'><p className='nav-link'>Signup</p></Link>
          </div>
        }
      </nav>
    </header>
  )
}

export default Navbar