import React from 'react';
import styled from 'styled-components';

const CatalogoHeader = () => {
  return (
    <HeaderContainer>
      <Title>Catálogo de Productos</Title>
      <Subtitle>Descubre nuestra amplia gama de productos de belleza y fitness</Subtitle>
    </HeaderContainer>
  );
};

export default CatalogoHeader;

const HeaderContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #B088E0 0%, #8B5CF6 100%);
  color: white;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const Title = styled.h1`
  font-family: 'Onest', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
