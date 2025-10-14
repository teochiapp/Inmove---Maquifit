import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import ModalPlanesEscribime from "./ModalPlanesEscribime";

const Text = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    console.log('Abriendo modal de planes...');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Texts
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 0.4, 
          ease: "easeOut" 
        }}
      >
        <Title>
          <div>Es hora de dar</div>
          <div>el primer paso.</div>
          <div>Es hora de dar el</div>
          <div>primer paso.</div>
        </Title>
        <Subtitle>
          Cada proceso es único. Elegí tu plan y juntos diseñemos un entrenamiento adaptado a tu medida.
        </Subtitle>

        <ButtonContainer>
          <CTAButton onClick={handleOpenModal}>
            <ButtonText>Escribime!</ButtonText>
            <DialogIcon src="/icons/dialog.png" alt="Dialog" />
          </CTAButton>
        </ButtonContainer>
      </Texts>

      <ModalPlanesEscribime 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Text;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1001;
  position: absolute;
  top: 100px;
  left: 150px;
  width: 455px;
  gap: 20px;

  @media (max-width: 1400px) {
    left: 80px;
  }
  @media (max-width: 1050px) {
    left: 50px;
  }

  @media (max-width: 768px) {
    top: 30px;
    left: 30px;
    width: 300px;
  }

  @media (max-width: 992px) {
      text-align:center;
      align-items: center;
      top:70px;
      left:25%;
  }

   @media (max-width: 825px) {
      
      top:70px;
      left:25%;
      width: 400px;
  }


  @media (max-width: 740px) {
      
      top:70px;
      left:22%;
      width: 400px;
  }
  @media (max-width: 625px) {
      
      top:70px;
      left:17%;
      width: 400px;
  }
  @media (max-width: 570px) {
      
      top:70px;
      left:14%;
      width: 400px;
  }
  @media (max-width: 515px) {
      
      top:70px;
      left:11%;
      width: 400px;
  }
  @media (max-width: 485px) {
      
      top:70px;
      left:8%;
      width: 400px;
  }
  @media (max-width: 455px) {
      
      top:70px;
      left:4%;
      width: 400px;
  }
  @media (max-width: 419px) {
      
      top:50px;
      left:1%;
      width: 400px;
  }

   @media (max-width: 400px) {
      
      top:50px;
      left:-10px;
      width: 400px;
  }

   @media (max-width: 375px) {
      
      top:50px;
      left:-15px;
      width: 400px;
  }
   @media (max-width: 360px) {
      
      top:50px;
      left:-25px;
      width: 400px;
  }
   @media (max-width: 340px) {
      
      top:50px;
      left:-35px;
      width: 400px;
  }
   @media (max-width: 325px) {
      
      top:50px;
      left:-39px;
      width: 400px;
  }

`;
const Title = styled.div`
  display: flex;
  flex-direction: column;

  div {
    color: white;
    font-size: 64px;
    font-style: normal;
    font-weight: 600;
    line-height: 110%; /* 70.4px */

    @media (max-width: 768px) {
      font-size: 48px;
    }

    @media (max-width: 992px) {
      font-size: 48px;
    }
  }

  /* Por defecto: ocultar 3ro y 4to */
  div:nth-of-type(3),
  div:nth-of-type(4) {
    display: none;
  }

  @media (max-width: 992px) {
    div:nth-of-type(1),
    div:nth-of-type(2) {
      display: none;
    }

    div:nth-of-type(3),
    div:nth-of-type(4) {
      display: flex;
      justify-content: center;
    }
      
    
  }

   @media (max-width: 419px) {
      
   div{
    font-size:42px;
   }
  }
   @media (max-width: 366px) {
      
   div{
    font-size:38px;
   }
  }
   @media (max-width: 366px) {
      
   div{
    font-size:35px;
   }

  }
    
`;
const Subtitle = styled.div`
  color: white;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  @media (max-width: 768px) {
    font-size: 16px;
  }
  @media (max-width: 424px) {
            width: 199px;
  }
`;

const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 1002;

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.1rem);
  padding-right: 3px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DialogIcon = styled.img`
  width: clamp(28px, 4vw, 32px);
  height: clamp(28px, 4vw, 32px);
  object-fit: contain;
  background: var(--secondary-color);
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: clamp(30px, 8vw, 50px);
  position: relative;
  z-index: 1002;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 40px;
  }

  @media (max-width: 480px) {
    justify-content: center;
    margin-top: 30px;
  }
`;
