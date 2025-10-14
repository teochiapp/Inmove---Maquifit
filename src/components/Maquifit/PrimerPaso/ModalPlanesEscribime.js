import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlanes } from '../../../hooks/usePlanes';
import ModalCheckout from '../Planes/ModalCheckout';

const ModalPlanesEscribime = ({ isOpen, onClose }) => {
  const { planes, loading } = usePlanes();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  // Colores predefinidos para los planes
  const planColors = ["#C58ADA", "#9DC6DA", "#9FC329"];

  // Transformar datos de Strapi al formato esperado
  const plansFormatted = planes
    .map((plan, index) => {
      const attrs = plan.attributes || plan;
      const features = attrs.Descripcion 
        ? attrs.Descripcion.split('\n').filter(line => line.trim())
        : [];

      return {
        id: plan.id,
        title: attrs.Titulo || "Plan sin título",
        price: attrs.Precio || 0,
        highlight: attrs.Subtitulo || "",
        description: "",
        color: planColors[index % planColors.length],
        features: features
      };
    })
    .sort((a, b) => a.price - b.price);

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setShowCheckoutModal(true);
    onClose(); // Cerrar el modal de planes
  };

  const handleCloseCheckout = () => {
    setShowCheckoutModal(false);
    setSelectedPlan(null);
  };

  const handleClose = () => {
    setSelectedPlan(null);
    setShowCheckoutModal(false);
    onClose();
  };

  const CustomArrowIcon = ({ $color }) => (
    <svg width="24" height="24" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.66699 5.53809L11.3337 12.2048" stroke={$color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4.66699 12.2048L11.3337 12.2048L11.3337 5.53809" stroke={$color} strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <ModalContent
              as={motion.div}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={handleClose}>
                <CloseIcon>×</CloseIcon>
              </CloseButton>

              <ModalHeader>
                <ModalTitle>¡Sumate al equipo Maquifit!</ModalTitle>
                <ModalSubtitle>
                  Elegí el plan que mejor se adapte a tus objetivos y charlemos para diseñar juntos tu entrenamiento personalizado.
                </ModalSubtitle>
              </ModalHeader>

              {loading ? (
                <LoadingText>Cargando planes...</LoadingText>
              ) : (
                <PlansGrid>
                  {plansFormatted.map((plan) => (
                    <PlanCard key={plan.id} $color={plan.color}>
                      <Highlight $color={plan.color}>
                        {plan.highlight.toUpperCase()}
                      </Highlight>
                      <PlanTitle $color={plan.color}>{plan.title}</PlanTitle>
                      <PlanPrice $color={plan.color}>
                        ${plan.price.toLocaleString("es-AR", { 
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0 
                        })}
                      </PlanPrice>
                      <SectionTitle>¿Qué incluye?</SectionTitle>
                      <PlanFeatures $color={plan.color}>
                        {plan.features.map((f, i) => (
                          <li key={i}>
                            {f}
                          </li>
                        ))}
                      </PlanFeatures>
                      <PlanButton
                        $color={plan.color}
                        onClick={() => handleSelectPlan(plan)}
                      >
                        <ButtonText>Empezá hoy</ButtonText>
                        <ArrowIcon $color={plan.color}>
                          <CustomArrowIcon $color={plan.color} />
                        </ArrowIcon>
                      </PlanButton>
                    </PlanCard>
                  ))}
                </PlansGrid>
              )}
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>

      {/* Usar el ModalCheckout existente de Planes */}
      <ModalCheckout 
        isOpen={showCheckoutModal}
        onClose={handleCloseCheckout}
        plan={selectedPlan}
      />
    </>
  );
};

export default ModalPlanesEscribime;

// ===== Styled Components =====

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 1.25rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 0.75rem;
  }
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    max-width: 95%;
  }

  @media (max-width: 768px) {
    padding: 1.75rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1.25rem;
    border-radius: 16px;
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
  transition: background-color 0.3s ease;
  z-index: 10;

  &:hover {
    background: #e5e7eb;
  }
`;

const CloseIcon = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #6b7280;
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ModalSubtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  font-family: 'Onest', sans-serif;
  line-height: 1.5;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  color: #6b7280;
  font-family: 'Onest', sans-serif;
  padding: 2rem;
  width: 100%;
`;

const PlansGrid = styled.div`
  display: grid;
  gap: 1rem;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.25rem;
  }
`;

const PlanCard = styled.div`
  background: #F9F8F3;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  border: 2.5px solid ${(props) => props.$color};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  margin-top: 1rem;
  transition: transform 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    border-radius: 16px;
  }
`;

const Highlight = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  color: white;
  letter-spacing: 1.15px;
  background: ${(props) => props.$color};
  padding: 4px 8px;
  border-radius: 8px;
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  white-space: nowrap;
`;

const PlanTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.$color};
  margin-top: 0.5rem;
`;

const PlanPrice = styled.div`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.$color};
  margin: 0.5rem auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SectionTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-black);
  margin-top: 0.5rem;
  text-align: center;
  width: 100%;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  li {
    display: flex;
    align-items: flex-start;
    font-size: 12px;
    color: var(--text-black);
    line-height: 1.5;
    padding-left: 1.2rem;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    position: relative;

    &::before {
      content: "•";
      position: absolute;
      left: 0;
      color: ${(props) => props.$color};
      font-weight: bold;
    }
  }
`;

const PlanButton = styled.button`
  background: ${(props) => props.$color};
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  cursor: pointer;
  margin-top: auto;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonText = styled.span`
  color: white;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 14px;
`;

const ArrowIcon = styled.div`
  width: 28px;
  height: 28px;
  background: white;
  border-radius: 43%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

