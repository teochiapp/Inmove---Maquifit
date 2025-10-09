import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ThankYouModal = ({ isOpen, onClose, clientName = 'Cliente' }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <ModalContent
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300 
            }}
          >
            <CloseButton onClick={onClose}>
              <CloseIcon>×</CloseIcon>
            </CloseButton>

            <SuccessIcon
              as={motion.div}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            >
              🎉
            </SuccessIcon>

            <ModalTitle
              as={motion.h2}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              ¡Gracias por elegirme{clientName && clientName !== 'Cliente' ? `, ${clientName}` : ''}!
            </ModalTitle>

            <ModalSubtitle
              as={motion.p}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Tu pago ha sido procesado exitosamente
            </ModalSubtitle>

            <MessageCard
              as={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <MessageIcon>💪</MessageIcon>
              <MessageText>
                <strong>Pronto me contactaré contigo para hacer tu plan personalizado</strong>
                <br />
                <MessageSubtext>
                  Te escribiré por WhatsApp en las próximas 24 horas para comenzar tu transformación
                </MessageSubtext>
              </MessageText>
            </MessageCard>

            <NextStepsContainer
              as={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <NextStepsTitle>¿Qué viene ahora?</NextStepsTitle>
              <StepsList>
                <StepItem>
                  <StepNumber>1</StepNumber>
                  <StepText>Recibirás un email de confirmación</StepText>
                </StepItem>
                <StepItem>
                  <StepNumber>2</StepNumber>
                  <StepText>Me pondré en contacto contigo por WhatsApp</StepText>
                </StepItem>
                <StepItem>
                  <StepNumber>3</StepNumber>
                  <StepText>Comenzaremos tu plan personalizado</StepText>
                </StepItem>
              </StepsList>
            </NextStepsContainer>

            <ActionButtons
              as={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <PrimaryButton onClick={onClose}>
                Volver al inicio
              </PrimaryButton>
            </ActionButtons>

            <FinalMessage
              as={motion.div}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <HeartIcon>💜</HeartIcon>
              <FinalText>¡Estoy emocionada de acompañarte en tu transformación!</FinalText>
            </FinalMessage>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ThankYouModal;

// ===== Styled Components =====

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(8px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    width: 95%;
    margin: 1rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f3f4f6;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: #e5e7eb;
    transform: scale(1.1);
  }
`;

const CloseIcon = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #6b7280;
  line-height: 1;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  line-height: 1;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const ModalSubtitle = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MessageCard = styled.div`
  background: linear-gradient(135deg, #fef7ff 0%, #f3e8ff 100%);
  border: 2px solid #e9d5ff;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  text-align: left;
`;

const MessageIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
  margin-top: 0.2rem;
`;

const MessageText = styled.div`
  flex: 1;
  
  strong {
    color: #7c3aed;
    font-size: 1.1rem;
    font-family: 'Onest', sans-serif;
    font-weight: 600;
    display: block;
    margin-bottom: 0.5rem;
  }
`;

const MessageSubtext = styled.span`
  color: #6b46c1;
  font-size: 0.95rem;
  font-family: 'Onest', sans-serif;
  line-height: 1.4;
`;

const NextStepsContainer = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const NextStepsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
  text-align: center;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StepNumber = styled.div`
  width: 28px;
  height: 28px;
  background: #0369a1;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: 600;
  flex-shrink: 0;
  font-family: 'Onest', sans-serif;
`;

const StepText = styled.span`
  font-size: 0.95rem;
  color: #0369a1;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  margin-bottom: 2rem;
`;

const PrimaryButton = styled.button`
  background: linear-gradient(135deg, #C58ADA 0%, #9DC6DA 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;
  min-width: 200px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(197, 138, 218, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FinalMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fef7ff;
  border-radius: 12px;
  border: 1px solid #f3e8ff;
`;

const HeartIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const FinalText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #7c3aed;
  margin: 0;
  font-family: 'Onest', sans-serif;
  line-height: 1.3;
`;
