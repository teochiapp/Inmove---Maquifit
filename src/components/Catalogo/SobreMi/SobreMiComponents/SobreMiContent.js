import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SobreMiContent = () => {
  return (
    <ContentContainer
      as={motion.div}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }}
    >
      <Title>Sobre Maquifit</Title>
      <Description>
        <Bold>
          Somos una marca especializada en ropa deportiva de alta calidad.
        </Bold>{" "}
        Nuestra misión es brindarte productos que combinen funcionalidad, 
        comodidad y estilo para que puedas rendir al máximo en tus entrenamientos.
      </Description>
      <Features>
        <Feature>
          <FeatureIcon>✓</FeatureIcon>
          <FeatureText>Materiales de alta calidad</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>✓</FeatureIcon>
          <FeatureText>Diseño ergonómico y cómodo</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>✓</FeatureIcon>
          <FeatureText>Estilo moderno y versátil</FeatureText>
        </Feature>
        <Feature>
          <FeatureIcon>✓</FeatureIcon>
          <FeatureText>Durabilidad garantizada</FeatureText>
        </Feature>
      </Features>
    </ContentContainer>
  );
};

export default SobreMiContent;

const ContentContainer = styled.div`
  flex: 1;
  max-width: 600px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 600;
  color: var(--text-black);
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: var(--text-black);
  line-height: 1.6;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Bold = styled.span`
  font-weight: 600;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FeatureIcon = styled.span`
  width: 24px;
  height: 24px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: var(--text-black);

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
