import React from 'react';
import styled from 'styled-components';

const PlanesContainer = styled.section`
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

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const PlanCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  
  &:hover {
    transform: translateY(-10px);
  }
  
  ${props => props.$featured && `
    border: 3px solid #8B5CF6;
    transform: scale(1.05);
    
    &:hover {
      transform: scale(1.05) translateY(-10px);
    }
  `}
`;

const FeaturedBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.875rem;
`;

const PlanIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 1rem;
`;

const PlanPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #8B5CF6;
  margin-bottom: 0.5rem;
`;

const PlanPeriod = styled.div`
  color: #6B7280;
  margin-bottom: 2rem;
`;

const PlanDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const PlanFeature = styled.li`
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

const PlanButton = styled.button`
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 1rem 2rem;
  font-weight: 600;
  font-size: 1.125rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Planes = () => {
  const plans = [
    {
      title: 'Plan Básico',
      price: '$30.000',
      period: '/mes',
      description: 'Perfecto para comenzar tu transformación',
      features: [
        'Plan nutricional básico',
        'Rutinas de entrenamiento',
        'Seguimiento semanal',
        'Acceso a la app'
      ],
      featured: false
    },
    {
      title: 'Plan Premium',
      price: '$50.000',
      period: '/mes',
      description: 'Nuestro plan más popular con seguimiento personalizado',
      features: [
        'Plan nutricional personalizado',
        'Entrenamientos personalizados',
        'Seguimiento diario',
        'Acceso completo a la app',
        'Consultas semanales',
        'Ajustes según progreso'
      ],
      featured: true
    },
    {
      title: 'Plan VIP',
      price: '$80.000',
      period: '/mes',
      description: 'Experiencia completa con atención 24/7',
      features: [
        'Plan nutricional ultra personalizado',
        'Entrenamientos 1 a 1',
        'Seguimiento constante',
        'Acceso premium a la app',
        'Consultas ilimitadas',
        'Soporte 24/7',
        'Análisis corporal avanzado'
      ],
      featured: false
    }
  ];

  return (
    <PlanesContainer>
      <Container>
        <SectionTitle>Nuestros Planes</SectionTitle>
        <SectionSubtitle>Elige el plan que mejor se adapte a tus objetivos</SectionSubtitle>
        
        <PlansGrid>
          {plans.map((plan, index) => (
            <PlanCard key={index} $featured={plan.featured}>
              {plan.featured && <FeaturedBadge>Más Popular</FeaturedBadge>}
              <PlanIcon>💪</PlanIcon>
              <PlanTitle>{plan.title}</PlanTitle>
              <PlanPrice>{plan.price}</PlanPrice>
              <PlanPeriod>{plan.period}</PlanPeriod>
              <PlanDescription>{plan.description}</PlanDescription>
              <PlanFeatures>
                {plan.features.map((feature, featureIndex) => (
                  <PlanFeature key={featureIndex}>{feature}</PlanFeature>
                ))}
              </PlanFeatures>
              <PlanButton>Elegir Plan</PlanButton>
            </PlanCard>
          ))}
        </PlansGrid>
      </Container>
    </PlanesContainer>
  );
};

export default Planes;
