import './Login.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../hooks/useAuthContext';
import loginServices from '../../services/login';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const userData = useAuthContext();
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();

    const userToLogin = {
      username,
      password
    }

    try {
      const resp = await loginServices.login(userToLogin)
      userData.loginUser(resp)
    } catch (err) {
      console.log(err);
    }

    setUsername('')
    setPassword('')
    navigate('/');
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