import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PlanesContent = () => {
  const navigate = useNavigate();

  const handleGoToPlanes = () => {
    navigate("/planes");
  };

  return (
    <TextContent
      as={motion.div}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <h2>
        Tu look está listo...
        <br /> ¿y tu entrenamiento?
      </h2>
      <p>
        Maqui también te acompaña con rutinas personalizadas y seguimiento
        para alcanzar tus objetivos.
      </p>

      <CTAButton onClick={handleGoToPlanes}>
        <ButtonText>Ver planes</ButtonText>
        <ArrowSVG width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.66699 5.53809L11.3337 12.2048" stroke="#262626" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.66699 12.2048L11.3337 12.2048L11.3337 5.53809" stroke="#262626" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </ArrowSVG>
      </CTAButton>
    </TextContent>
  );
};

export default PlanesContent;

// -------- Styled Components -------- //

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 665px;
  
  h2 {
    font-family: 'Onest', sans-serif;
    font-size: clamp(32px, 5vw, 64px);
    font-weight: 600;
    line-height: 1.1;
    color: var(--text-black);
    margin-bottom: 1.5rem;
  }

  p {
    font-family: 'Onest', sans-serif;
    font-size: clamp(16px, 2vw, 18px);
    font-weight: 400;
    color: var(--text-black);
    margin-bottom: 2rem;
    max-width: 500px;
    line-height: 1.5;
  }

  @media (max-width: 900px) {
    align-items: center;
    text-align: center;
    width: 100%;
    h2 {
      margin-bottom: 1rem;
    }

    p {
      margin: 0 auto 1.5rem;
      max-width: 600px;
    }
  }
  
  @media (max-width: 480px) {
    h2 {
      font-size: 28px;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 15px;
      margin-bottom: 1.5rem;
    }
  }
`;

const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 12px 12px 12px 20px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 900px) {
    align-self: center;
  }
  
  @media (max-width: 768px) {
    padding: 10px 10px 10px 18px;
  }
  
  @media (max-width: 480px) {
    padding: 10px 10px 10px 16px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
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
