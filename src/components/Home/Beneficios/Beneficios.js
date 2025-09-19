import React from 'react';
import styled from 'styled-components';
import Plan from './BeneficiosComponents/Plan';
import Videos from './BeneficiosComponents/Videos';
import Orientacion from './BeneficiosComponents/Orientacion';
import Habitos from './BeneficiosComponents/Habitos';
import Recetas from './BeneficiosComponents/Recetas';
import Acompanamiento from './BeneficiosComponents/Acompanamiento';

function Beneficios() {
  return (
    <BeneficiosContainer>
      <Title>Sumate al team <Color>Maquifit</Color>, y obtené estos beneficios</Title>
      <Plan orientation="left" />
      <Videos orientation="right" />
      <Orientacion orientation="left" />
      <Habitos orientation="right" />
      <Recetas orientation="left" />
      <Acompanamiento orientation="right" />
    </BeneficiosContainer>
  )
}

export default Beneficios

const BeneficiosContainer = styled.section`
    background-color: #EFEEE8;
    padding: 5rem 13rem;
    width: 100%;
    gap: 100px;
    display: flex;
    flex-direction: column;

  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 600;
  max-width: 1000px;
  text-align: center;
  color: var(--text-black);
  line-height: 1.6;
  margin-left: auto;
  margin-right: auto;

`;

const Color = styled.span`
  color: var(--primary-color);
  
`;
