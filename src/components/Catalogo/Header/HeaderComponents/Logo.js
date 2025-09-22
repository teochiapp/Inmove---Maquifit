import React from 'react';
import styled from 'styled-components';


const Logo = () => {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <LogoContainer onClick={handleLogoClick}>
      <LogoIcon src="/logo.png" alt="Maquifit Logo" />
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
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-left: 30px;
`;
