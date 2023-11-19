import './Login.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext';
import { useNotificationContext } from '../../hooks/useNotification';

import loginServices from '../../services/login';
// import recipeServices from '../../services/recipes';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const userData = useAuthContext();
  const navigate = useNavigate();
  const notificationControl = useNotificationContext();

  const submitLogin = async (e) => {
    e.preventDefault();

    const userToLogin = {
      username,
      password
    }

    try {
      const resp = await loginServices.login(userToLogin)
      userData.loginUser(resp)
      
      notificationControl.displayNotification({
        type: 'info',
        message: 'Successfully logged in!'
      })

      // recipeServices.setToken(resp.token)
      setUsername('')
      setPassword('')
      navigate('/');
    } catch (err) {
      notificationControl.displayNotification({
        type: 'error',
        message: err?.response?.data.error || 'Could not log in'
      })
    }
  };
  
  return (
    <div className='login-page'>
      <h1>Login to Cookbook App</h1>
      <form onSubmit={submitLogin}>
        <label>
          <span>Username:</span>
          <input
          required
          className='login-input'
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
          required
          className='login-input'
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type='submit' className='btn-login'>Login!</button>
      </form>
      <div className="signup-box">
        <h2>Or create new account here:</h2>
        <Link className='signup-link' to={'/signup'}>Signup</Link>
      </div>
    </div>
  )
}

export default Login