import './Navbar.css'

import { Link } from "react-router-dom";

import Searchbar from '../Searchbar/Searchbar';

const Navbar = () => {

  return (
    <header className='header'>
      <nav className='top-nav'>
        <Link to='/'>
          <p className='logo'>Cookbook App</p>
        </Link>
        <Searchbar />
        <Link to='/new'><p className='nav-link'>Create Recipe</p></Link>
      </nav>
    </header>
  )
}

export default Navbar