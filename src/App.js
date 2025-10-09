import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { CarritoProvider } from './context/CarritoContext';
import MaquifitPage from './pages/MaquifitPage';
import CatalogoPage from './pages/CatalogoPage';
import SingleProductPage from './pages/SingleProductPage';
import CarritoPage from './pages/CarritoPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccess from './components/Maquifit/Planes/CheckoutSuccess';
import CheckoutFailure from './components/Maquifit/Planes/CheckoutFailure';
import CheckoutPending from './components/Maquifit/Planes/CheckoutPending';
import { useEffect } from 'react';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  min-height: calc(100vh - 80px);
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
`;

// Componente para redirigir a Strapi admin
const AdminRedirect = () => {
  useEffect(() => {
    // Obtener la URL de Strapi del entorno o construirla basada en el dominio actual
    let strapiUrl = process.env.REACT_APP_STRAPI_URL;
    
    // Si no hay variable de entorno, usar el mismo dominio con puerto 1337
    if (!strapiUrl) {
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        strapiUrl = 'http://localhost:1337';
      } else {
        // En producción, usar el mismo dominio pero indicar que va al backend
        // Ajusta esto según tu configuración de Coolify
        strapiUrl = `${protocol}//${hostname}:1337`;
      }
    }
    
    // Construir la URL completa incluyendo la ruta después de /admin
    const fullPath = window.location.pathname + window.location.search + window.location.hash;
    
    // Redirigir a Strapi
    window.location.href = `${strapiUrl}${fullPath}`;
  }, []);
  
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Onest, sans-serif',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      <div>
        <div style={{ marginBottom: '1rem' }}>🔄 Redirigiendo al panel de administración...</div>
        <div style={{ fontSize: '0.9rem', textAlign: 'center' }}>Si no eres redirigido automáticamente, haz clic aquí</div>
      </div>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <CarritoProvider>
        <Router>
          <AppContainer>
            <MainContent>
              <Routes>
                <Route path="/" element={<CatalogoPage />} />
                <Route path="/maquifit" element={<MaquifitPage />} />
                <Route path="/catalogo/:nombre" element={<SingleProductPage />} />
                <Route path="/carrito" element={<CarritoPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/checkout/failure" element={<CheckoutFailure />} />
                <Route path="/checkout/pending" element={<CheckoutPending />} />
                {/* Redirigir /admin a Strapi admin */}
                <Route path="/admin/*" element={<AdminRedirect />} />
              </Routes>
            </MainContent>
          </AppContainer>
        </Router>
      </CarritoProvider>
    </HelmetProvider>
  );
}

export default App;
