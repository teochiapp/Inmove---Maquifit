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
  position: relative;
  height: 100%;
  min-height: 500px;

  &::after {
    content: '';
    position: absolute;
       right: -55px;
    bottom: -46px;
    width: 1000px;
    height: 40px;
    background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%);
    border-radius: 50%;
    z-index: 0;
  }

  img {
    position: absolute;
    right: -100px;
    bottom: -80px;
    width: auto;
    height: 120%;
    max-height: 650px;
    object-fit: contain;
    z-index: 1;
  }
  
  @media (max-width: 1200px) {
    min-height: 450px;
    
    &::after {
      right: -30px;
      bottom: -30px;
      width: 701px;
      height: 38px;
    }
    
    img {
      right: -50px;
      bottom: -60px;
      max-height: 550px;
      height: 100%;
    }
  }
  
  @media (max-width: 900px) {
    position: relative;
    min-height: 400px;
    display: flex;
    justify-content: center;
    
    &::after {
      right: 51%;
      transform: translateX(50%);
      bottom: 33px;
      width: 675px;
      height: 35px;
    }
    
    img {
      position: relative;
      right: 0;
      bottom: 0;
      max-height: 450px;
      height: auto;
      max-width: 90%;
    }
  }
  
  @media (max-width: 768px) {
    min-height: 350px;
    
    &::after {
        right: 51%;
        transform: translateX(50%);
        bottom: 33px;
        width: 675px;
    }
    
    img {
      max-width: 120%;
    }
  }
  
  @media (max-width: 480px) {
    min-height: 300px;
    
    &::after {
      right: 51%;
      transform: translateX(50%);
      bottom: 33px;
      width: 392px;;
      height: 28px;
    }
  }
     @media (max-width: 375px) {
    
    &::after {
      right: 51%;
      transform: translateX(50%);
      bottom: 45px;
      width: 300px;
      height: 28px;
    }
     @media (max-width: 350px) {
    
    &::after {
      right: 51%;
      transform: translateX(50%);
      bottom: 55px;
      width: 300px;
      height: 28px;
    }
     @media (max-width: 320px) {
    
    &::after {
      right: 51%;
      transform: translateX(50%);
      bottom: 65px;
      width: 300px;
      height: 28px;
    }
  }
`;
