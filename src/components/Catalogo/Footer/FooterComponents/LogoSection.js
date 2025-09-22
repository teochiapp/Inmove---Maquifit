import React from 'react';
import styled from 'styled-components';

const LogoSection = () => {
  return (
    <LogoContainer>
      <Logo src="/logo.png" alt="Maquifit Logo" />
      <BrandName>Maquifit</BrandName>
      <BrandDescription>
        Ropa deportiva de alta calidad para tu mejor rendimiento.
      </BrandDescription>
    </LogoContainer>
  );
};

export default LogoSection;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
`;

const BrandName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const BrandDescription = styled.p`
  font-size: 14px;
  color: #d1d5db;
  line-height: 1.5;
  margin: 0;
`;
