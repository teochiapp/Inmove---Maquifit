import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PlanesImage = () => {
  return (
    <ImageWrapper
      as={motion.div}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      }}
    >
      <img src="/catalogo/train-girl.png" alt="Entrenamiento" />
    </ImageWrapper>
  );
};

export default PlanesImage;

// -------- Styled Components -------- //

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    width: 952px;
  }
`;
