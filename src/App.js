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
import TestEmail from './components/TestEmail';

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
                {/* Ruta de prueba para testear emails - REMOVER EN PRODUCCIÓN */}
                <Route path="/test-email" element={<TestEmail />} />
              </Routes>
            </MainContent>
          </AppContainer>
        </Router>
      </CarritoProvider>
    </HelmetProvider>
  );
}

export default App;
