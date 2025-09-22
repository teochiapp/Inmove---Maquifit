import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeroContent = () => {
  return (
    <ContentContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut" 
        }}
      >
        <Title>
          <div>Catálogo de</div>
          <div>Productos</div>
          <Subtitle>
            Descubre nuestra colección de ropa deportiva de alta calidad.
          </Subtitle>
        </Title>
        <CTAButton>
          <ButtonText>Ver Productos</ButtonText>
          <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
        </CTAButton>
      </motion.div>
    </ContentContainer>
  );
};

export default HeroContent;

const ContentContainer = styled.div`
  text-align: center;
  z-index: 10;
  position: relative;
`;

const Title = styled.div`
  color: var(--text-black);
  font-size: 72px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%;
  margin-bottom: 2rem;

  @media (max-width: 1500px) {
    font-size: 64px;
  }

  @media (max-width: 1300px) {
    font-size: 56px;
  }

  @media (max-width: 1200px) {
    font-size: 48px;
  }

  @media (max-width: 992px) {
    font-size: 42px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.span`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  padding-top: 20px;
  display: block;
  margin-top: 1rem;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position: relative;
  margin: 2rem auto 0;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  padding-right: 3px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ArrowIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: var(--secondary-color);
  border-radius: 50%;
  padding: 6px;
  transform: rotate(0deg);

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;
