import './Signup.css'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { useNotificationContext } from '../../hooks/useNotification';
import signupServices from '../../services/signup';


const Signup = () => {

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const notificationControl = useNotificationContext();


  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      name: displayName,
      username: username,
      password: password
    }

    try {
      await signupServices.signup(newUser);

      notificationControl.displayNotification({
        type: 'info',
        message: 'User successfully created'
      });

      setDisplayName('');
      setUsername('');
      setPassword('');
      navigate('/');
    }
    catch (err) {
      notificationControl.displayNotification({
        type: 'error',
        message: err.response.data.error || 'Could not sign up'
      });
    }

  };

  return (
    <div className='signup-page'>
      <h1>Create new user</h1>
      <div className="signup-info-box">
      <p>It is possible to delete user and all data later!</p>
      </div>
      <form onSubmit={handleSignup}>
        <label>
          <span>Display name:</span>
          <input
          required
          className='signup-input'
          type="text"
          value={displayName}
          onChange={({ target }) => setDisplayName(target.value)}
          />
        </label>
        <label>
          <span>Username:</span>
          <input
          required
          className='signup-input'
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
          required
          className='signup-input'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type='submit' className='btn-signup'>Signup!</button>
      </form>
      <div className="login-box">
        <h2>Already registered? Login here:</h2>
        <Link className='login-link' to={'/login'}>Login</Link>
      </div>
    </div>
  )
}

export default Signup