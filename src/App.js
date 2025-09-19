import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import HomePage from './pages/HomePage';
import CatalogoPage from './pages/CatalogoPage';
import SingleProductPage from './pages/SingleProductPage';

const AppContainer = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main`
  min-height: calc(100vh - 80px);
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalogo" element={<CatalogoPage />} />
            <Route path="/producto/:id" element={<SingleProductPage />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
