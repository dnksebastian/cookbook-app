import { useState } from 'react';
import './Login.css'

import { Link } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitLogin = (e) => {
    e.preventDefault();

    console.log('login');
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