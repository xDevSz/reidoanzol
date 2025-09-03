// src/components/Navbar/index.jsx

import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png'; 

function Navbar() {
  return (
    <nav className={styles.navbar}>
      {/* 2. Adicione a logo dentro do Link */}
      <Link to="/" className={styles.brand}>
        <img src={logo} alt="Logo Rei do Anzol" className={styles.logo} />
        Rei do Anzol
      </Link>
      <ul className={styles.navList}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sobre">Sobre</Link></li>
        <li><Link to="/contato">Contato</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;