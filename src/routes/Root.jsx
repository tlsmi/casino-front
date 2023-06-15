import React from "react";
import { Link, Outlet } from "react-router-dom";
import '../static/css/root_style.css';
import fichaRojaImg from '../static/img/ficha-roja.png'; // Importa la imagen

export default function Root() {
  const handleProfileClick = () => {
    if (sessionStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
  };

  return (
    <>
      <div>
        <nav className="rootnav">
          <ul className="rootul">
            <li className="rootli">
              <Link className="roota" to="/profile" onClick={handleProfileClick}>
                <img src={fichaRojaImg} alt="Profile" id="fichaRoja" />
              </Link>
            </li>
            <li className="rootli"> 
              <Link className="roota" to="/">Homepage</Link>
            </li>
            <li className="rootli">
              <Link className="roota" to="/about">About Us</Link>
            </li>
            <li className="rootli">
              <Link className="roota" to="/games">Games</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
    </>
  );
}
