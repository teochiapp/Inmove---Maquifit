import React from 'react';
import styled from 'styled-components';

const TiendaContent = () => {
  return (
    <MainContent>
      <MainTitle>Conocé nuestra línea de indumentaria</MainTitle>
      <Subtitle>Entrená con comodidad y estilo Maquifit.</Subtitle>
    </MainContent>
  );
};

export default TiendaContent;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    padding: 15px 6vw;

    @media screen and (max-width: 768px) {
      align-items: center;
      text-align: center;
      padding: 10px 4vw;
    }
`;

const MainTitle = styled.h2`
  color: white;
  font-size: clamp(28px, 5vw, 64px);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 768px) {
    font-size: clamp(24px, 8vw, 36px);
  }
`;

const Subtitle = styled.p`
  color: white;
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 400;
  max-width: 500px;

  @media screen and (max-width: 768px) {
    font-size: clamp(14px, 4vw, 16px);
    max-width: 100%;
  }
`;
