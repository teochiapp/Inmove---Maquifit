import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SobreMiImage = () => {
  return (
    <ImageContainer
      as={motion.div}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.4
      }}
    >
      <ImagePlaceholder>
        <PlaceholderIcon>👕</PlaceholderIcon>
        <PlaceholderText>Imagen de productos</PlaceholderText>
      </ImagePlaceholder>
    </ImageContainer>
  );
};

export default SobreMiImage;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImagePlaceholder = styled.div`
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const PlaceholderIcon = styled.span`
  font-size: 4rem;
  opacity: 0.8;
`;

const PlaceholderText = styled.p`
  font-size: 18px;
  font-weight: 500;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
