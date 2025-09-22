import styled from 'styled-components';
import { motion } from 'framer-motion';
import Plan from './BeneficiosComponents/Plan';
import Videos from './BeneficiosComponents/Videos';
import Orientacion from './BeneficiosComponents/Orientacion';
import Habitos from './BeneficiosComponents/Habitos';
import Recetas from './BeneficiosComponents/Recetas';
import Acompañamiento from './BeneficiosComponents/Acompanamiento';

function Beneficios() {
  return (
    <BeneficiosContainer>
      <Title
        as={motion.h2}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
      >
        Sumate al team <Color>Maquifit</Color>, y obtené estos beneficios
      </Title>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <Plan/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <Videos/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        <Orientacion/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <Habitos/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      >
        <Recetas/>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
      >
        <Acompañamiento/>
      </motion.div>
      
      <DownloadSection
        as={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
      >
        <DownloadTitle>Descargá la App</DownloadTitle>
        <DownloadButtons>
          <AppStoreLink href="#" target="_blank" rel="noopener noreferrer">
            <AppStore src="/home/beneficios/app-store.png" alt="App Store" />
          </AppStoreLink>
          <PlayStoreLink href="https://play.google.com/store/apps/details?id=com.arceus.teammaquifit&hl=es_AR" target="_blank" rel="noopener noreferrer">
            <PlayStore src="/home/beneficios/play-store.png" alt="Play Store" />
          </PlayStoreLink>
        </DownloadButtons>
      </DownloadSection>

    </BeneficiosContainer>
  )
}

export default Beneficios

const BeneficiosContainer = styled.section`
    background-color: #EFEEE8;
    padding: 5rem 13rem;
    width: 100%;
    gap: 80px;
    display: flex;
    flex-direction: column;

  @media (max-width: 1300px) {
    padding: 4rem 4rem;
  }

  @media (max-width: 900px) {
    padding: 3rem 2rem;
  }
  @media (max-width: 768px) {
    padding: 4rem 2rem;
    gap: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 3rem 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 42px;
  font-weight: 600;
  max-width: 1000px;
  text-align: center;
  color: var(--text-black);
  line-height: 1.6;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    font-size: 28px;
  }
`;

const Color = styled.span`
  color: var(--primary-color);
`;

const DownloadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const DownloadTitle = styled.h3`
  font-size: 32px;
  font-weight: 500;
  color: var(--text-black);
  text-align: center;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 27px;
  }
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.8rem;
  }
`;

const AppStoreLink = styled.a`
  display: block;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const PlayStoreLink = styled.a`
  display: block;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const AppStore = styled.img`
  width: 100%;
  height: auto;
  max-width: 180px;
  
  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const PlayStore = styled.img`
  width: 100%;
  height: auto;
  max-width: 180px;
  
  @media (max-width: 768px) {
    max-width: 200px;
  }
`;