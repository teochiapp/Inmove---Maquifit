import React, { useState } from 'react';
import styled from 'styled-components';
import { FaInstagram, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const TransformacionMobile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
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

  const [currentSlide, setCurrentSlide] = useState(0);
  const imageSlides = images.filter(img => !img.isContentCard);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % imageSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + imageSlides.length) % imageSlides.length);
  };

  const contentCard = images.find(img => img.isContentCard);

  return (
    <TransformacionContainer>
      <Container>
        {/* Título */}
        <TitleSection>
          <ContentTitle>
            {contentCard.title} <BoldText>{contentCard.titleBold}</BoldText>
          </ContentTitle>
        </TitleSection>

        {/* Primer botón */}
        <FirstButtonSection>
          <CTAButton as="a" href={contentCard.button1Url} target="_blank" rel="noopener noreferrer">
            <ButtonText>Empezá hoy!</ButtonText>
            <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
          </CTAButton>
        </FirstButtonSection>

        {/* Slider */}
        <SliderSection>
          <ArrowButton onClick={prevSlide} $direction="left">
            <FaArrowLeft />
          </ArrowButton>
          <SliderContainer>
            <Slide>
              <SlideImage 
                src={imageSlides[currentSlide].backgroundImage} 
                alt={`Slide ${currentSlide + 1}`}
                onClick={() => setSelectedImage(imageSlides[currentSlide].backgroundImage)}
              />
            </Slide>
          </SliderContainer>
          <ArrowButton onClick={nextSlide} $direction="right">
            <FaArrowRight />
          </ArrowButton>
        </SliderSection>

        {/* Segundo botón */}
        <SecondButtonSection>
          <CTAButton as="a" href={contentCard.button2Url} target="_blank" rel="noopener noreferrer">
            <ButtonText>{contentCard.button2}</ButtonText>
            <IconWrapper>
              <FaInstagram />
            </IconWrapper>
          </CTAButton>
        </SecondButtonSection>
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

export default TransformacionMobile;

const TransformacionContainer = styled.section`
  padding: 3rem 1.5rem;
  background-color: #D8EAF3;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const TitleSection = styled.div`
  text-align: center;
`;

const FirstButtonSection = styled.div`
  display: flex;
  justify-content: center;
`;

const SliderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const SecondButtonSection = styled.div`
  display: flex;
  justify-content: center;
`;

const ContentTitle = styled.h3`
  font-size: 36px;
  font-weight: 500;
  color: #1F2937;
  margin-bottom: 0;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const BoldText = styled.span`
  font-weight: 700;
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 370px;
  aspect-ratio: 4/4;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: white;
  
  @media (max-width: 768px) {
    max-width: 320px;
  }
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.3s ease;
  border-radius: 15px;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ArrowButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--secondary-color);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  
  svg {
    color: white;
    font-size: 18px;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    
    svg {
      font-size: 16px;
    }
  }
`;

const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  text-decoration: none;
  justify-content: space-between;
  width: auto;
  min-width: fit-content;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
    font-size: 16px;
  padding-right: 3px;

`;

const ArrowIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: var(--secondary-color);
  border-radius: 50%;
  padding: 6px;
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    padding: 5px;
  }
`;

const IconWrapper = styled.div`
  width: clamp(24px, 4vw, 28px);
  height: clamp(24px, 4vw, 28px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--terciary-color);
  border-radius: 43%;
  padding: clamp(4px, 1.5vw, 6px);
  
  svg {
    width: 100%;
    height: 100%;
    color: #1F2937;
  }
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    padding: 4px;
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
