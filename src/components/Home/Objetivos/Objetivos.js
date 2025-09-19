import React from 'react';
import styled from 'styled-components';

const ObjetivosContainer = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: #1F2937;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: #6B7280;
  margin-bottom: 4rem;
`;

const ObjectivesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const ObjectiveCard = styled.div`
  background: linear-gradient(135deg, #F8FAFC, #F1F5F9);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ObjectiveIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10B981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
`;

const ObjectiveTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1rem;
`;

const ObjectiveDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const ObjectiveStats = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #10B981;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: #6B7280;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: 3rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Objetivos = () => {
  const objectives = [
    {
      icon: '🎯',
      title: 'Pérdida de Peso',
      description: 'Ayudamos a más de 300 personas a alcanzar su peso ideal de manera saludable y sostenible.',
      stats: [
        { number: '300+', label: 'Personas' },
        { number: '15kg', label: 'Promedio' }
      ]
    },
    {
      icon: '💪',
      title: 'Ganancia de Masa Muscular',
      description: 'Programas especializados para aumentar masa muscular y fuerza de manera efectiva.',
      stats: [
        { number: '250+', label: 'Clientes' },
        { number: '8kg', label: 'Promedio' }
      ]
    },
    {
      icon: '🏃‍♀️',
      title: 'Mejora de Condición Física',
      description: 'Transformamos tu resistencia y condición física para una vida más activa y saludable.',
      stats: [
        { number: '400+', label: 'Transformados' },
        { number: '95%', label: 'Satisfacción' }
      ]
    },
    {
      icon: '🧘‍♀️',
      title: 'Bienestar Integral',
      description: 'Enfoque holístico que combina fitness, nutrición y bienestar mental para una vida plena.',
      stats: [
        { number: '500+', label: 'Vidas' },
        { number: '98%', label: 'Recomiendan' }
      ]
    }
  ];

  return (
    <ObjetivosContainer>
      <Container>
        <SectionTitle>Nuestros Objetivos</SectionTitle>
        <SectionSubtitle>Resultados reales de personas reales</SectionSubtitle>
        
        <ObjectivesGrid>
          {objectives.map((objective, index) => (
            <ObjectiveCard key={index}>
              <ObjectiveIcon>{objective.icon}</ObjectiveIcon>
              <ObjectiveTitle>{objective.title}</ObjectiveTitle>
              <ObjectiveDescription>{objective.description}</ObjectiveDescription>
              <ObjectiveStats>
                {objective.stats.map((stat, statIndex) => (
                  <Stat key={statIndex}>
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </Stat>
                ))}
              </ObjectiveStats>
            </ObjectiveCard>
          ))}
        </ObjectivesGrid>
        
        <CTAButton>
          ¡Quiero Alcanzar Mis Objetivos!
        </CTAButton>
      </Container>
    </ObjetivosContainer>
  );
};

export default Objetivos;
