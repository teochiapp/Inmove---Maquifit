import React from 'react';
import styled from 'styled-components';

const Acompanamiento = ({ orientation = 'right' }) => {
  return (
    <SectionContainer>
       <ContentWrapper $orientation={orientation}>
         {orientation === 'right' ? (
           <>
             <ImageContent>
               <SupportContainer>
                 <SupportCard>
                   <SupportIcon>💬</SupportIcon>
                   <SupportTitle>Chat directo</SupportTitle>
                   <SupportDescription>Resolvé tus dudas al instante</SupportDescription>
                 </SupportCard>
                 <SupportCard>
                   <SupportIcon>📞</SupportIcon>
                   <SupportTitle>Llamadas</SupportTitle>
                   <SupportDescription>Contacto personalizado</SupportDescription>
                 </SupportCard>
                 <SupportCard>
                   <SupportIcon>📈</SupportIcon>
                   <SupportTitle>Seguimiento</SupportTitle>
                   <SupportDescription>Monitoreo de progreso</SupportDescription>
                 </SupportCard>
                 <SupportCard>
                   <SupportIcon>🎯</SupportIcon>
                   <SupportTitle>Motivación</SupportTitle>
                   <SupportDescription>Te acompaño en cada paso</SupportDescription>
                 </SupportCard>
               </SupportContainer>
             </ImageContent>
             <TextContent $orientation={orientation}>
               <SectionTitle>Acompañamiento personalizado</SectionTitle>
               <SectionDescription>
                 Te brindo apoyo constante durante todo tu proceso de transformación, adaptándome a tus necesidades y objetivos.
               </SectionDescription>
             </TextContent>
           </>
         ) : (
           <>
             <TextContent $orientation={orientation}>
               <SectionTitle>Acompañamiento personalizado</SectionTitle>
               <SectionDescription>
                 Te brindo apoyo constante durante todo tu proceso de transformación, adaptándome a tus necesidades y objetivos.
               </SectionDescription>
             </TextContent>
             <ImageContent>
               <SupportContainer>
                 <SupportCard>
                   <SupportIcon>💬</SupportIcon>
                   <SupportTitle>Chat directo</SupportTitle>
                   <SupportDescription>Resolvé tus dudas al instante</SupportDescription>
                 </SupportCard>
                 <SupportCard>
                   <SupportIcon>📞</SupportIcon>
                   <SupportTitle>Llamadas</SupportTitle>
                   <SupportDescription>Contacto personalizado</SupportDescription>
                 </SupportCard>
                 <SupportCard>
                   <SupportIcon>📈</SupportIcon>
                   <SupportTitle>Seguimiento</SupportTitle>
                   <SupportDescription>Monitoreo de progreso</SupportDescription>
                 </SupportCard>
                 <SupportCard>
                   <SupportIcon>🎯</SupportIcon>
                   <SupportTitle>Motivación</SupportTitle>
                   <SupportDescription>Te acompaño en cada paso</SupportDescription>
                 </SupportCard>
               </SupportContainer>
             </ImageContent>
           </>
         )}
       </ContentWrapper>
    </SectionContainer>
  );
};

export default Acompanamiento;

const SectionContainer = styled.div`
  background: var(--overlay-color);
  border-radius: 40px;
  margin-bottom: 2rem;
  height: 370px;
  padding: 3rem;
  position: relative;
  overflow: visible;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 1.5rem;
    height: auto;
    min-height: 370px;
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
    gap: 2rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  width: 50%;
  text-align: ${props => props.$orientation === 'right' ? 'right' : 'left'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
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
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0;
`;

const SupportContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  transform: translateY(-20px);
  z-index: 2;
  
  @media (max-width: 768px) {
    gap: 1rem;
    max-width: 300px;
    transform: translateY(0);
  }
`;

const SupportCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #8B42A6;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SupportIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SupportTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.3rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const SupportDescription = styled.div`
  font-size: 0.8rem;
  color: #4B5563;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
