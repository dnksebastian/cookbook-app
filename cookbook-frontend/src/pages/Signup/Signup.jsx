import './Signup.css'

import { Link } from 'react-router-dom'



const Signup = () => {

  const handleSignup = (e) => {
    e.preventDefault();

    console.log('signup');
  };

  return (
    <div className='signup-page'>
      <h1>Create new user</h1>
      <form onSubmit={handleSignup}>
        <label>
          <span>Display name:</span>
          <input
          required
          className='signup-input'
          type="text"
          />
        </label>
        <label>
          <span>Username:</span>
          <input
          required
          className='signup-input'
          type="text"
          />
        </label>
        <label>
          <span>Password:</span>
          <input
          required
          className='signup-input'
          type="password"
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