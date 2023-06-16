import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../static/css/root_style.css';
import fichaRojaImg from '../static/img/ficha-roja.webp';
import homeImg from '../static/img/homepage.webp';

export default function Root() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  console.log(window.location.href);
  if (
    sessionStorage.getItem('token') === null &&
    window.location.href !== 'http://localhost:3000/login' &&
    window.location.href !== 'http://localhost:3000/signup' &&
    window.location.href !== 'http://localhost:3000/' &&
    window.location.href !== 'http://localhost:3000/games' &&
    window.location.href !== 'http://localhost:3000/aboutus' &&
    window.location.href !== 'http://localhost:3000/buy'
  ) {
    window.location.href = '/login';
  }

  const handleProfileClick = () => {
    if (sessionStorage.getItem('token') === null) {
      window.location.href = '/login';
    }
  };

  return (
    <>
      <div>
        <nav className='rootnav'>
          <button className={`hamburger ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul className={`rootul ${isMenuOpen ? 'responsive' : ''}`}>
            
            <li className='rootli' id='homepageNav'>
              <Link className='roota' to='/'>
                <img src={homeImg} width='100px' height='100px' alt='Home' id='fichaRoja' />
              </Link>
            </li>
            <li className='rootli'>
              <Link className='roota' to='/games'>
                Games
              </Link>
            </li>
            <li className='rootli'>
              <Link className='roota' to='/aboutus'>
                About Us
              </Link>
            </li>
            <li className='rootli' id='profileNav'>
              <Link className='roota' to='/profile' onClick={handleProfileClick}>
                <img src={fichaRojaImg} width='100px' height='100px' alt='Profile' id='fichaRoja' />
              </Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
