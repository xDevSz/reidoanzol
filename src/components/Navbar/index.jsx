// src/components/Navbar/index.jsx

import { useState } from 'react'; // Importa o hook 'useState' para gerenciar o estado
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png'; 

function Navbar() {
  // 1. Cria um estado para controlar se o menu está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // 2. Função que muda o estado quando o botão é clicado
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <img src={logo} alt="Logo Rei do Anzol" className={styles.logo} />
        Rei do Anzol
      </Link>
      
      {/* 3. Adiciona o botão do menu hambúrguer */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>

      {/* 4. A classe 'active' é adicionada se o estado 'isOpen' for verdadeiro */}
      <ul className={`${styles.navList} ${isOpen ? styles.active : ''}`}>
        <li><Link to="/" className={styles.navButton} onClick={toggleMenu}>Inicio</Link></li>
        <li><Link to="/sobre" className={styles.navButton} onClick={toggleMenu}>Sobre</Link></li>
        <li><Link to="/" className={`${styles.navButton} ${styles.subscribeButton}`} onClick={toggleMenu}>Inscreva-se</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;