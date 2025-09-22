import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import useMediaQuery from '../../../hooks/useMediaQuery';
import TransformacionMobile from './TransformacionMobile';

const Transformacion = () => {
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Precargar imágenes
  React.useEffect(() => {
    const imageUrls = [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3',
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5'
    ];
    
    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);
  
  if (isMobile) {
    return <TransformacionMobile />;
  }
  const images = [
    {
      number: '01',
      backgroundImage: 'https://picsum.photos/400/400?random=1',
      isContentCard: false
    },
    {
      number: '02',
      backgroundImage: 'https://picsum.photos/400/400?random=2',
      isContentCard: false
    },
    {
      number: '03',
      backgroundImage: 'https://picsum.photos/400/400?random=3',
      isContentCard: false
    },
    {
      number: '04',
      backgroundImage: 'https://picsum.photos/400/400?random=4',
      isContentCard: false
    },
    {
      number: '05',
      isContentCard: true,
      title: 'La transformación empieza adentro.',
      titleBold: 'Vos también podés.',
      button1: 'Sumate al team Maquifit',
      button1Url: '#',
      button2: 'Ver más',
      button2Url: '#'
    },
    {
      number: '06',
      backgroundImage: 'https://picsum.photos/400/400?random=5',
      isContentCard: false
    }
  ];

  return (
    <TransformacionContainer>
      <Container>
        <Grid
          as={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut" 
          }}
        >
          {images.map((step, index) => (
            <Card 
              key={index} 
              $backgroundImage={step.backgroundImage} 
              $isContentCard={step.isContentCard}
            >
              {step.isContentCard ? (
                <ContentCard>
                  <ContentTitle>
                    {step.title} <BoldText>{step.titleBold}</BoldText>
                  </ContentTitle>
                  <ButtonContainer>
                    <CTAButton as="a" href={step.button1Url} target="_blank" rel="noopener noreferrer">
                      <ButtonText>{step.button1}</ButtonText>
                      <DialogIcon src="/icons/arrow-top.png" alt="Arrow" />
                    </CTAButton>
                    <CTAButton as="a" href={step.button2Url} target="_blank" rel="noopener noreferrer">
                      <ButtonText>{step.button2}</ButtonText>
                      <IconWrapper>
                        <FaInstagram />
                      </IconWrapper>
                    </CTAButton>
                  </ButtonContainer>
                </ContentCard>
              ) : (
                <ImageCard 
                  onClick={() => setSelectedImage(step.backgroundImage)}
                  $clickable={true}
                />
              )}
            </Card>
          ))}
        </Grid>
      </Container>
      
      {/* Modal para mostrar imagen ampliada */}
      {selectedImage && (
        <ModalOverlay onClick={() => setSelectedImage(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedImage(null)}>×</CloseButton>
            <ModalImage src={selectedImage} alt="Imagen ampliada" />
          </ModalContent>
        </ModalOverlay>
      )}
    </TransformacionContainer>
  );
};

export default Transformacion;

const TransformacionContainer = styled.section`
  padding: 5rem 2rem;
  background-color: #D8EAF3;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  position: relative;
  width: 100%;
  max-width: 1200px;
  aspect-ratio: 3/2;
  
  @media (max-width: 1400px) {
    gap: 1.8rem;
  }
  
  @media (max-width: 1200px) {
    gap: 1.5rem;
    max-width: 1000px;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    gap: 1.2rem;
    aspect-ratio: 2/3;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, minmax(0, 1fr));
    gap: 1rem;
    aspect-ratio: 1/6;
  }
`;

const Card = styled.div`
  background: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'transparent'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 30px;
  padding: 2rem;
  text-align: center;
  box-shadow: ${props => props.$isContentCard ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.1)'};
  position: relative;
  transition: transform 0.3s ease;
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    border-radius: 20px;
  }
`;

const ImageCard = styled.div`
  width: 100%;
  height: 100%;
  cursor: ${props => props.$clickable ? 'pointer' : 'default'};
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: ${props => props.$clickable ? '0.8' : '1'};
  }
`;

const ContentCard = styled.div`
  border-radius: 15px;
  padding: 0rem;
  text-align: center;
  box-shadow: none;
`;

const ContentTitle = styled.h3`
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  font-weight: 400;
  color: #1F2937;
  margin-bottom: 2rem;
  line-height: 1.3;
  
  @media (max-width: 1200px) {
    font-size: clamp(1.3rem, 2.5vw, 1.6rem);
  }
  
  @media (max-width: 1024px) {
    font-size: clamp(1.2rem, 2vw, 1.4rem);
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
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
  transition: transform 0.3s ease;
  text-decoration: none;
  justify-content: space-between;
  width: auto;
  min-width: fit-content;
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.1rem);
  padding-right: 3px;
  
  @media (max-width: 1200px) {
    font-size: 14px;
  }
  
  @media (max-width: 1060px) {
    font-size: 13px;
  }
  
`;

const DialogIcon = styled.img`
  width: clamp(28px, 4vw, 32px);
  height: clamp(28px, 4vw, 32px);
  object-fit: contain;
  background: var(--terciary-color);
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

const IconWrapper = styled.div`
  width: clamp(28px, 4vw, 32px);
  height: clamp(28px, 4vw, 32px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--terciary-color);
  border-radius: 43%;
  padding: clamp(6px, 1.5vw, 8px);
  
  svg {
    width: 100%;
    height: 100%;
    color: #1F2937;
  }
  
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
  
  @media (max-width: 768px) {
    gap: 0.8rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.6rem;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: -50px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: 768px) {
    top: -40px;
    right: 0;
    width: 35px;
    height: 35px;
    font-size: 20px;
  }
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;
