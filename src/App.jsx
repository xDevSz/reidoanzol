// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importe seus componentes e páginas
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Footer from './components/Footer'; 
//import FormularioPage from './pages/Formulario';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ flex: 1 }}> {/* Div para empurrar o footer para baixo */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/contato" element={<FormularioPage />} /> {/* Rota do formulário */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App