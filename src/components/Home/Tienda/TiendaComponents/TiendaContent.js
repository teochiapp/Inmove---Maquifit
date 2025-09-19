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
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    text-align: left;
    padding: 15px 6vw;
    margin-bottom: 56px;

      @media screen and (max-width: 768px) {
    align-items: center;
    text-align: center;
    margin-bottom: 20px;

  }
`;

const MainTitle = styled.h2`
  color: white;
  font-size: 64px;
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 0.5rem;

  @media screen and (max-width: 768px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  color: white;
  font-size: 20px;
  font-weight: 400;
  max-width: 500px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
