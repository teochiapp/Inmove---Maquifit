import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SobreMiContent from './SobreMiComponents/SobreMiContent';
import SobreMiImage from './SobreMiComponents/SobreMiImage';

const SobreMi = () => {
  return (
    <SobreMiContainer
      as={motion.section}
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut" 
      }}
    >
      <SobreMiContent />
      <SobreMiImage />
    </SobreMiContainer>
  );
};

export default SobreMi;

const SobreMiContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 2rem;
  background: #F9F8F3;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    padding: 3rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;
