// src/components/Footer/index.jsx

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Rei do Anzol - Todos os direitos reservados.</p>
      <p>Feito com ❤️ em <span>Porto Velho, Rondônia.</span></p>
    </footer>
  );
}

export default Footer;