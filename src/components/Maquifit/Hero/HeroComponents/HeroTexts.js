import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";


const HeroTexts = () => {
  const handleScrollToPlanes = () => {
    const planesSection = document.getElementById('planes');
    if (planesSection) {
      const headerOffset = 100;
      const elementPosition = planesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Texts>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.1 
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <Title>
          <div>Tu cuerpo,</div>
          <div>Tu mente,</div>
          <div>nuestro objetivo</div>
          <Subtitle>
            Entrenamiento y alimentación a tu medida.
          </Subtitle>
        </Title>
         <TextMobile> 
          <div>Tu cuerpo, tu</div>
          <div>mente, nuestro</div>
          <div>objetivo</div>
          <Subtitle>
            Entrenamiento y alimentación a tu medida.
          </Subtitle>
          </TextMobile>
          <CTAButton onClick={handleScrollToPlanes}>
            <ButtonText>Empezá hoy!</ButtonText>
            <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
          </CTAButton>
      </motion.div>
    </Texts>
  );
};

export default HeroTexts;


const Texts = styled.div`
  color: var(--text-black);
  font-size: 92px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%;
  z-index: 10;
  position: relative;
  left:100px;

 @media (max-width: 1500px) {
       font-size: 88px;
   
  }
  @media (max-width: 1400px) {
       
   left:45px;   
  }
   
  @media (max-width: 1300px) {
       font-size: 80px;
      
  }

    @media (max-width: 1200px) {
       font-size: 75px;
       
  }
        @media (max-width: 1110px) {
        font-size: 66px;
        position: relative;
        top: -27px;
        }

   @media (max-width: 1030px) {
        left:-10px; 
        }

  
   @media (max-width:992px) {
        left: 50%;
        top: 4%;

        transform: translate(-50%, -50%);
        }

   @media (max-width:992px) {
          left: 50%;
                 
         }

         @media (max-width:425px) {
          top: -4%;
         
                 
         }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: flex-start;


  
  @media (max-width:992px) {
        display:none;
        }
    
`;

const Subtitle = styled.span`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  padding-top: 20px;
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
  position:relative;
  top : 150px;
  z-index: 15;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width:992px) { 
    transform: translate(-50%, -15%);
    top: 315px;
    left: 50%;
    z-index: 10;

    &:hover {
      transform: translate(-50%, calc(-15% - 2px));
    }

    &:active {
      transform: translate(-50%, -15%);
    }
  }

   @media (max-width:425px) { 
    top:380px;
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  padding-right: 3px;

`;

const ArrowIcon = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
    background: var(--secondary-color);
    border-radius: 50%;
    padding: 6px;
    transform: rotate(0deg);
`;

const TextMobile = styled.div`

 display:none;


@media (max-width:992px) {
  display:flex;
  transform: translate(2%, -15%);
  flex-direction:column;
  text-align:center;
  font-size:60px;
  }

  @media (max-width:515px){
  font-weight:bold;
  font-size:45px;
  }

  @media (max-width:425px){
    font-size: 37px;
    line-height:55px;
    width:300px;
  }
`