import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CheckoutFailure = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({});

  useEffect(() => {
    // Obtener parámetros de la URL
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const externalReference = searchParams.get('external_reference');
    const merchantOrderId = searchParams.get('merchant_order_id');

    setPaymentData({
      paymentId,
      status,
      externalReference,
      merchantOrderId
    });

    console.log('Pago fallido - Datos:', {
      paymentId,
      status,
      externalReference,
      merchantOrderId
    });

  }, [searchParams]);

  const handleRetry = () => {
    navigate('/maquifit#planes');
  };

  const handleGoHome = () => {
    navigate('/maquifit');
  };

  const handleContactSupport = () => {
    // Abrir WhatsApp o email de soporte
    window.open('https://wa.me/5493513797137?text=Hola! Tuve un problema con mi pago y necesito ayuda.', '_blank');
  };

  return (
    <FailureContainer>
      <FailureContent
        as={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <FailureIcon
          as={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
        >
          ❌
        </FailureIcon>

        <FailureTitle
          as={motion.h1}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Pago no completado
        </FailureTitle>

        <FailureSubtitle
          as={motion.p}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Hubo un problema al procesar tu pago
        </FailureSubtitle>

        {paymentData.paymentId && (
          <PaymentInfo
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <InfoTitle>Detalles del intento de pago</InfoTitle>
            <InfoItem>
              <InfoLabel>ID de pago:</InfoLabel>
              <InfoValue>{paymentData.paymentId}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Estado:</InfoLabel>
              <InfoValue>{paymentData.status}</InfoValue>
            </InfoItem>
            {paymentData.externalReference && (
              <InfoItem>
                <InfoLabel>Referencia:</InfoLabel>
                <InfoValue>{paymentData.externalReference}</InfoValue>
              </InfoItem>
            )}
          </PaymentInfo>
        )}

        <PossibleCauses
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <CausesTitle>Posibles causas</CausesTitle>
          <CausesList>
            <CauseItem>
              <CauseIcon>💳</CauseIcon>
              <CauseText>Fondos insuficientes en la tarjeta</CauseText>
            </CauseItem>
            <CauseItem>
              <CauseIcon>🔒</CauseIcon>
              <CauseText>La tarjeta fue rechazada por el banco</CauseText>
            </CauseItem>
            <CauseItem>
              <CauseIcon>📝</CauseIcon>
              <CauseText>Error en los datos ingresados</CauseText>
            </CauseItem>
            <CauseItem>
              <CauseIcon>🌐</CauseIcon>
              <CauseText>Problema de conexión durante el pago</CauseText>
            </CauseItem>
          </CausesList>
        </PossibleCauses>

        <Solutions
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <SolutionsTitle>¿Qué puedes hacer?</SolutionsTitle>
          <SolutionsList>
            <SolutionItem>
              <SolutionIcon>🔄</SolutionIcon>
              <SolutionText>Intenta nuevamente con la misma tarjeta</SolutionText>
            </SolutionItem>
            <SolutionItem>
              <SolutionIcon>💳</SolutionIcon>
              <SolutionText>Prueba con otro método de pago</SolutionText>
            </SolutionItem>
            <SolutionItem>
              <SolutionIcon>🏦</SolutionIcon>
              <SolutionText>Contacta a tu banco para verificar la tarjeta</SolutionText>
            </SolutionItem>
            <SolutionItem>
              <SolutionIcon>💬</SolutionIcon>
              <SolutionText>Contacta nuestro soporte para ayuda personalizada</SolutionText>
            </SolutionItem>
          </SolutionsList>
        </Solutions>

        <ActionButtons
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <PrimaryButton onClick={handleRetry}>
            Intentar de nuevo
          </PrimaryButton>
          <SecondaryButton onClick={handleContactSupport}>
            Contactar soporte
          </SecondaryButton>
          <TertiaryButton onClick={handleGoHome}>
            Volver al inicio
          </TertiaryButton>
        </ActionButtons>

        <SupportMessage
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <SupportIcon>🤝</SupportIcon>
          <SupportText>
            No te preocupes, estamos aquí para ayudarte. Nuestro equipo de soporte resolverá cualquier problema.
          </SupportText>
        </SupportMessage>
      </FailureContent>
    </FailureContainer>
  );
};

export default CheckoutFailure;

// ===== Styled Components =====

const FailureContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const FailureContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
`;

const FailureIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const FailureTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #dc2626;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FailureSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 2rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PaymentInfo = styled.div`
  background: #fef2f2;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #fecaca;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-size: 0.95rem;
  color: #6b7280;
  font-family: 'Onest', sans-serif;
`;

const InfoValue = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
  color: #1f2937;
  font-family: 'Onest', sans-serif;
`;

const PossibleCauses = styled.div`
  background: #fffbeb;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #fde68a;
`;

const CausesTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #d97706;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const CausesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CauseItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const CauseIcon = styled.span`
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const CauseText = styled.p`
  font-size: 0.9rem;
  color: #d97706;
  margin: 0;
  line-height: 1.4;
  font-family: 'Onest', sans-serif;
`;

const Solutions = styled.div`
  background: #f0f9ff;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #bae6fd;
`;

const SolutionsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const SolutionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SolutionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const SolutionIcon = styled.span`
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const SolutionText = styled.p`
  font-size: 0.9rem;
  color: #0369a1;
  margin: 0;
  line-height: 1.4;
  font-family: 'Onest', sans-serif;
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PrimaryButton = styled.button`
  background: #C58ADA;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover {
    background: #b079d1;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: #3b82f6;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
  }
`;

const TertiaryButton = styled.button`
  background: transparent;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

const SupportMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #f0fdf4;
  border-radius: 12px;
  border: 1px solid #bbf7d0;
`;

const SupportIcon = styled.span`
  font-size: 1.5rem;
`;

const SupportText = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  color: #15803d;
  margin: 0;
  font-family: 'Onest', sans-serif;
  text-align: left;
`;
