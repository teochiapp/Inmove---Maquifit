import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Planes = () => {
  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <PlanesSection>
      <Container>
        <Header
          as={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
            ease: "easeOut" 
          }}
        >
          <h2>¿Necesitas entrenamiento personalizado?</h2>
          <p>
            <Bold>
              Descubre nuestros planes de entrenamiento y nutrición personalizados.
            </Bold>{" "}
            Además de ropa deportiva de calidad, también ofrecemos planes completos 
            de entrenamiento y alimentación adaptados a tus objetivos.
          </p>
        </Header>

        <CTA
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
            ease: "easeOut",
            delay: window.innerWidth <= 768 ? 0.1 : 0.3 
          }}
        >
          <CTAButton onClick={handleGoToHome}>
            <ButtonText>Ver Planes de Entrenamiento</ButtonText>
            <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
          </CTAButton>
        </CTA>
      </Container>
    </PlanesSection>
  );
};

export default Planes;

const PlanesSection = styled.section`
  padding: 4rem 2rem;
  background: #EFEEE8;
  
  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  padding: 0rem 2rem;
  text-align: center;

  h2 {
    font-size: 54px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-black);
    font-size: 19px;
    font-weight: 300;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    p {
      font-size: 17px;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 38px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const Bold = styled.span`
  font-weight: 500;
`;

const CTA = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CTAButton = styled.button`
  background: var(--primary-color);
  border: none;
  border-radius: 100px;
  padding: 1rem 2rem;
  color: white;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(197, 138, 218, 0.3);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 16px;
  }
`;

const ButtonText = styled.span`
  color: white;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ArrowIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: white;
  border-radius: 50%;
  padding: 6px;
  transform: rotate(0deg);

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;
