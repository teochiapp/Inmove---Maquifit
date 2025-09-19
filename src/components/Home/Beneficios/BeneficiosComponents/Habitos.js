import React from 'react';
import styled from 'styled-components';

const Habitos = () => {
  return (
    <SectionContainer>
      <ContentWrapper>
         <TextContent>
          <SectionTitle>Control de tus hábitos</SectionTitle>
          <SectionDescription>
            Podrás registrar tu consumo de agua, horas de sueño, peso y medidas corporales, pasos diarios y cargas utilizadas en los entrenamientos.
          </SectionDescription>
        </TextContent>      
        <ImageContent>
          <HabitosImg src="/home/beneficios/habitos.webp" alt="Habitos" />
        </ImageContent>       
      </ContentWrapper>
    </SectionContainer>
  );
};

export default Habitos;

const SectionContainer = styled.div`
  background: var(--overlay-color);
  border-radius: 40px;
  margin-bottom: 2rem;
  height: 370px;
  padding: 3rem;
  position: relative;
  overflow: visible;
  
  @media (max-width: 768px) {
    padding: 1rem 2rem;
    margin: 0 0 1.5rem 0;
    height: auto;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 1px;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  width: 50%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: left;
  }
`;

const ImageContent = styled.div`
  flex: 1;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SectionTitle = styled.h3`
  font-size: 32px;
  font-weight: 500;
  color: var(--text-black);
  margin-bottom: 1rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 0.5rem;
  }
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const HabitosImg = styled.img`
  width: auto;
  height: auto;
  min-width: 470px;
  transform: translateY(-40px);
  z-index: 2;
  margin-bottom: -20px;
  position: relative;
  
  @media (max-width: 768px) {
    transform: translateY(-30px);
    margin-bottom: 0;
    max-width: 350px;
    min-width: 300px;
  }

    @media (max-width: 1100px) {
    min-width: 300px;
    max-width: 400px;
  }
`;