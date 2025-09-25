import React from 'react';
import styled from 'styled-components';

const SobreMiContent = () => {
  return (
    <ContentSection>
      <TextContainer>
      <SectionTitle>
        <TitleLine1>Hola! </TitleLine1>
        <TitleLine2>Soy Maquifit :)</TitleLine2>
      </SectionTitle>
      <Description>
        Soy técnica en musculación y antropometrista ISAK 1, realicé cursos de nutrición deportiva y llevo 7 años en el ámbito del fitness.
      </Description>
      <Description>
        Estoy capacitada para entrenar tanto hombres como mujeres. Acompaño a mis alumnos a cambiar su estilo de vida, trabajar sobre su mentalidad y amor propio con entrenamiento acorde y alimentación saludable, dando como resultado un cambio físico.
      </Description>
      </TextContainer>
      <ButtonContainer>
        <CTAButton>
          <ButtonText>Saber más</ButtonText>
          <ArrowSVG width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66699 5.53809L11.3337 12.2048" stroke="#262626" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.66699 12.2048L11.3337 12.2048L11.3337 5.53809" stroke="#262626" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          </ArrowSVG>
        </CTAButton>
      </ButtonContainer>
    </ContentSection>
  );
};

export default SobreMiContent;

const ContentSection = styled.div`
  z-index: 2;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;

  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const TitleLine1 = styled.span`
  color: var(--text-white);
  @media (max-width: 768px) {
    display: block;
  }
`;

const TitleLine2 = styled.span`
  color: var(--text-white);
  @media (max-width: 768px) {
    display: block;
  }
`;

const Description = styled.p`
  font-size: clamp(16px, 2.5vw, 18px);
  color: var(--text-white);
  line-height: 1.4;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;


const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.1rem);
  padding-right: 3px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ArrowSVG = styled.svg`
    width: clamp(28px, 4vw, 32px);
    height: clamp(28px, 4vw, 32px);
    background: var(--inmove-rosa-color);
    border-radius: 43%;
    padding: clamp(6px, 1.5vw, 8px);
    
    @media (max-width: 768px) {
      width: 28px;
      height: 28px;
      padding: 6px;
    }
    
    @media (max-width: 480px) {
      width: 24px;
      height: 24px;
      padding: 5px;
    }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: clamp(30px, 8vw, 50px);
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 40px;
  }
  
  @media (max-width: 480px) {
    justify-content: center;
    margin-top: 30px;
  }
`;

const TextContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
`;
