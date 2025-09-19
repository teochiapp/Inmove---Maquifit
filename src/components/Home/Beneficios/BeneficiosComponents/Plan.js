import React from 'react';
import styled from 'styled-components';

const Plan = () => {
  return (
    <SectionContainer>
      <ContentWrapper>        
        <ImageContent>
          <PhoneImg src="/home/beneficios/celulares.png" alt="Phone" />
        </ImageContent>
        <TextContent>
          <SectionTitle>Plan de entrenamiento personalizado</SectionTitle>
          <SectionDescription>
            Diseñado en mi App exclusiva, adaptado a tus tiempos, días de entrenamiento y objetivos.
          </SectionDescription>
        </TextContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default Plan;

const SectionContainer = styled.div`
  background: var(--overlay-color);
  border-radius: 40px;
  margin-bottom: 2rem;
  height: 370px;
  padding: 3rem;
  position: relative;
  overflow: visible;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin-bottom: 1.5rem;
    height: auto;
    min-height: 420px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0px;
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

const PhoneImg = styled.img`
  width: 100%;
  height: auto;
  max-width: 470px;
  transform: translateY(-20px);
  z-index: 2;
  
  @media (max-width: 768px) {
    transform: translateY(-45px);
    max-width: 300px;
  }
`;