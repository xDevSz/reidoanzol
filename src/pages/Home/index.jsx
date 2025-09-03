import { Link } from 'react-router-dom';

// Importa os estilos CSS do carrossel
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

// Importa o nosso arquivo de estilo local
import styles from './Home.module.css';

// Importe as imagens que você salvou na pasta assets
// O caminho '../../' volta duas pastas (de /pages/Home para /src)
import pesca1 from '../../assets/pesca1.jpg';
import pesca2 from '../../assets/pesca2.jpg';
import pesca3 from '../../assets/pesca3.jpg';
import pesca4 from '../../assets/pesca4.jpeg';

function HomePage() {
  return (
    <main className={styles.homeContainer}>
      <Carousel 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false}
        interval={5000} // Muda de imagem a cada 5 segundos
      >
        <div>
          <img src={pesca1} alt="Homem pescando em um barco ao amanhecer" />
          <p className="legend">Aventura no Rio Madeira</p>
        </div>
        <div>
          <img src={pesca2} alt="Peixe tucunaré sendo segurado por um pescador" />
          <p className="legend">A Emoção de Fisgar um Tucunaré</p>
        </div>
        <div>
          <img src={pesca3} alt="Paisagem de um rio amazônico com céu azul" />
          <p className="legend">Paisagens Únicas de Rondônia</p>
        </div>
        <div>
          <img src={pesca4} alt="Pescador arremessando a linha na água" />
          <p className="legend">Técnicas de Arremesso Profissional</p>
        </div>
      </Carousel>
      
      <div className={styles.content}>
        <h1>Rei do Anzol: Seu Guia de Pesca em Rondônia</h1>
        <p>
          Explore os melhores locais, descubra dicas essenciais e prepare-se para a maior aventura de pesca da sua vida na Amazônia rondoniense.
        </p>
        
        <div className={styles.buttonContainer}>
          <button className={styles.actionButton}>Dicas de Pesca</button>
          <button className={styles.actionButton}>Melhores Locais</button>
          
          {/* Este botão é um Link que leva para a página do formulário */}
          <Link to="/contato" className={styles.actionButton}>
            Faça sua Reserva
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomePage;