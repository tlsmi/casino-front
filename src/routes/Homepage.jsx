import React from 'react';

const Homepage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <a href="/profile">Perfil</a>
          </li>
          <li>
            <a href="/games">Juegos</a>
          </li>
          <li>
            <a href="/contact">Contacto</a>
          </li>
        </ul>
      </nav>
      <p>Bienvenido al casino. Aquí encontrarás información sobre nuestros juegos y servicios.</p>
    </div>
  );
};

export default Homepage;