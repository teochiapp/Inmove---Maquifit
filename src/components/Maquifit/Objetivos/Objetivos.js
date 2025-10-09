import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Objetivos = () => {
  const objectives = [
    {
      icon: 'biceps-violeta.png',
      title: 'Ganancia de masa muscular',},
    {
      icon: 'arrow-down.png',
      title: 'Reducción del porcentaje de grasa',
    },
    {
      icon: 'voleyball.png',
      title: 'Entrenamiento específico para un deporte',
    },
    {
      icon: 'lovehand.png',
      title: 'Incorporar hábitos saludables',
    }
  ];

  return (
    <ObjetivosContainer
      as={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut" 
      }}
    >
      <Container>
        <SectionTitle>¿Para qué objetivos me sirve el plan?</SectionTitle>
        <SectionSubtitle>Todos los planes se adaptan a tu meta:</SectionSubtitle>
        
        <ObjectivesGrid>
          {objectives.map((objective, index) => (
            <ObjectiveCard key={index}>
              <ObjectiveIcon>
                <img src={`/icons/${objective.icon}`} alt={objective.title} />
              </ObjectiveIcon>
              <ObjectiveTitle>{objective.title}</ObjectiveTitle>
            </ObjectiveCard>
          ))}
        </ObjectivesGrid>
      </Container>
    </ObjetivosContainer>
  );
};

export default Objetivos;

const ObjetivosContainer = styled.section`
  padding: 4rem 2rem;
  background: #EFEEE8;

  @media screen {
    
  }@media (max-width: 768px) {
    padding: 2rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: var(--text-black);
  margin-bottom: 10px;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 20px;
  font-weight: 400;
  color: var(--text-black);
  margin-bottom: 56px;
`;

const ObjectivesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ObjectiveCard = styled.div`
  background: #F9F8F3;
  border-radius: 15px;
  padding: 1.5rem 1.5rem;
  text-align: start;
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 25px;

  @media screen {
    @media (max-width: 992px) {
      gap: 15px;
    }
    @media (max-width: 768px) {
      gap: 10px;
    }
  }
  &:hover {
    transform: translateY(-2px);
  }
`;

const ObjectiveIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  
  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
`;

const ObjectiveTitle = styled.h3`
  font-size: 18px;
  font-weight: 400;
  text-align: start;
  color: var(--text-black);
  margin: 0;
  line-height: 1.4;
`;
