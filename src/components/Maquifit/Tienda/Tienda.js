import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import TiendaLogo from './TiendaComponents/TiendaLogo';
import TiendaContent from './TiendaComponents/TiendaContent';
import TiendaCTA from './TiendaComponents/TiendaCTA';
import TiendaCategories from './TiendaComponents/TiendaCategories';

const Tienda = () => {
  return (
    <TiendaContainer>
      <BackgroundImage />
      <ContentContainer 
            as={motion.section}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut" 
      }}>
        <TopSection>
          <TiendaLogo />
          <TiendaCTA />
        </TopSection>
        <TiendaContent />
        <TiendaCategories />
        <MobileCTA>
          <TiendaCTA />
        </MobileCTA>
      </ContentContainer>
    </TiendaContainer>
  );
};

export default Tienda;


const TiendaContainer = styled.section`
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    height: fit-content;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/home/tienda/background--tienda.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(139, 66, 166, 0.3);
    z-index: 1;
  }
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  margin: 0 auto;
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 6vw;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    
    /* Ocultar el CTA en el TopSection en mobile */
    & > *:last-child {
      display: none;
    }
  }
`;

const MobileCTA = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
`;
