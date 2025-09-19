import React from 'react';
import styled from 'styled-components';

const BeneficiosContainer = styled.section`
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #F8FAFC, #F1F5F9);
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

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #10B981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const BenefitTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1rem;
`;

const BenefitDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BenefitItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #4B5563;
  
  &::before {
    content: "✓";
    color: #10B981;
    font-weight: bold;
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const Beneficios = () => {
  const benefits = [
    {
      icon: '💪',
      title: 'Entrenamiento Personalizado',
      description: 'Rutinas diseñadas específicamente para tus objetivos y nivel de condición física.',
      features: [
        'Evaluación inicial completa',
        'Rutinas adaptadas a tu horario',
        'Seguimiento constante de progreso',
        'Ajustes según tus resultados'
      ]
    },
    {
      icon: '🥗',
      title: 'Plan Nutricional Integral',
      description: 'Alimentación balanceada que complementa tu entrenamiento para maximizar resultados.',
      features: [
        'Menús personalizados',
        'Recetas saludables y deliciosas',
        'Educación nutricional',
        'Seguimiento de macronutrientes'
      ]
    },
    {
      icon: '📱',
      title: 'App Tecnológica',
      description: 'Herramientas digitales para mantener tu motivación y seguimiento diario.',
      features: [
        'Seguimiento de entrenamientos',
        'Registro de comidas',
        'Recordatorios personalizados',
        'Comunidad de apoyo'
      ]
    },
    {
      icon: '🎯',
      title: 'Resultados Garantizados',
      description: 'Compromiso con tu transformación y resultados medibles en tiempo real.',
      features: [
        'Objetivos claros y alcanzables',
        'Medición de progreso semanal',
        'Ajustes según resultados',
        'Soporte 24/7'
      ]
    }
  ];

  return (
    <BeneficiosContainer>
      <Container>
        <SectionTitle>Beneficios</SectionTitle>
        <SectionSubtitle>Todo lo que necesitas para transformar tu vida</SectionSubtitle>
        
        <BenefitsGrid>
          {benefits.map((benefit, index) => (
            <BenefitCard key={index}>
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <BenefitTitle>{benefit.title}</BenefitTitle>
              <BenefitDescription>{benefit.description}</BenefitDescription>
              <BenefitList>
                {benefit.features.map((feature, featureIndex) => (
                  <BenefitItem key={featureIndex}>{feature}</BenefitItem>
                ))}
              </BenefitList>
            </BenefitCard>
          ))}
        </BenefitsGrid>
      </Container>
    </BeneficiosContainer>
  );
};

export default Beneficios;
