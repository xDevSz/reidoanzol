// src/components/Footer/index.jsx

import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Rei do Anzol - Todos os direitos reservados.</p>
      <p>Feito em <span>Porto Velho, Rondônia.</span></p>
      <p>Desenvolvido por <a href="https://web-dataro.vercel.app/">DATA-RO</a></p>
    </footer>
  );
}

export default Footer;