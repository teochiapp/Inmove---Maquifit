import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';


const Logo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    // Si ya estamos en la página principal, hacer scroll al inicio
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Si estamos en otra página, navegar a la raíz
      navigate('/');
      // Hacer scroll al inicio después de navegar
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <LogoContainer onClick={handleLogoClick}>
      <LogoIcon src="/inmove-logo-black.png" alt="Maquifit Logo" />
    </LogoContainer>
  );
};

export default Logo;


const LogoContainer = styled.div`
  display: flex;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const LogoIcon = styled.img`
  width: 107px;
  height: auto;
  object-fit: contain;
  margin-left: 30px;
`;
