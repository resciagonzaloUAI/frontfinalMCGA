import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { useHistory } from 'react-router-dom';

function Header() {
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('accessToken');

  const logout = () => {
    localStorage.removeItem('accessToken');
    history.push('/home');
    window.location.reload();
  } 

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
          {isLoggedIn ? 
          <>
            <li>
              <Link to="/products">Modificar Productos</Link>
            </li>
            <li className={styles.cerrarsesion}>
              <p onClick={() => logout()}>Cerrar Sesión</p>
            </li>  
          </>
          : 
          <li>
            <Link to="/login">Iniciar Sesión</Link>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default Header;