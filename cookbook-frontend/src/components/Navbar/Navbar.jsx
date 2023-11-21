import './Navbar.css'

import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar';

import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../hooks/useAuthContext';
import userServices from '../../services/signup';
import recipeServices from '../../services/recipes';


const Navbar = () => {
  const { color } = useTheme()
  const userData = useAuthContext();
  const user = userData.user;

  const handleRemoveUser = async () => {
    let removedAll = false;

    try {
      await recipeServices.removeAllByUser(user.id)
      removedAll = true
    }
    catch (err) {
      console.log(err);
    }

    if(removedAll) {
      try {
        await userServices.removeUser(user.id)
        userData.logoutUser();
      }
      catch (err) {
        console.log(err);
      }
    }

  }

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
          <button onClick={handleRemoveUser} id='delete-btn'>Delete account</button>
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