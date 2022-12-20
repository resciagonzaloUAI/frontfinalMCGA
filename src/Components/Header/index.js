import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <div className={styles.appName}>
          FINAL - MCGA
        </div>
        <ul className={styles.rutes}>
          <li>
           <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products/get">Listar Productos</Link>
          </li>
          <li>
            <Link to="/products">Modificar Productos</Link>
          </li>
          <li>
            <Link to="/products/form">Formulario</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;