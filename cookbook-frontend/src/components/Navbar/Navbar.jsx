import './Navbar.css'

import { Link } from "react-router-dom";
import Searchbar from '../Searchbar/Searchbar';

import { useTheme } from '../../hooks/useTheme';


const Navbar = () => {

  const { color } = useTheme()

  return (
    <header className='header' style={{ background: color }}>
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