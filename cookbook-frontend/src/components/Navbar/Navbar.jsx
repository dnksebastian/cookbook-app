import './Navbar.css'
import { useState } from 'react';

import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar';
import Alert from '../Alert/Alert';

import { useTheme } from '../../hooks/useTheme';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNotificationContext } from '../../hooks/useNotification';

import userServices from '../../services/signup';
import recipeServices from '../../services/recipes';


const Navbar = () => {
  const [showAlert, setShowAlert] = useState(false)

  const { color } = useTheme()
  const userData = useAuthContext();
  const user = userData.user;

  const notificationControl = useNotificationContext()

  const confirmRemove = () => {
    handleRemoveUser()
    setShowAlert(false)
  }

  const handleRemoveUser = async () => {
    let removedAll = false;

    try {
      await recipeServices.removeAllByUser(user.id)
      removedAll = true
    }
    catch (err) {
      notificationControl.displayNotification({
        type: 'error',
        message: 'Could not remove user data. Please try again.'
      })
    }

    if(removedAll) {
      try {
        await userServices.removeUser(user.id)
        userData.logoutUser();
        notificationControl.displayNotification({
          type: 'info',
          message: 'Successfully removed user and all corresponding data.'
        })
      }
      catch (err) {
        notificationControl.displayNotification({
          type: 'error',
          message: 'Could not remove user. Please try again.'
        })
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
          <button onClick={() => setShowAlert(true)} id='delete-btn'>Delete account</button>
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
      <Alert
      isOpen={showAlert}
      onClose={() => setShowAlert(false)}
      title='Delete user?'
      description="Do you want to delete current user and all recipes?"
      confirmBtnLabel='Yes'
      onConfirm={confirmRemove}
      />
    </header>
  )
}

export default Navbar