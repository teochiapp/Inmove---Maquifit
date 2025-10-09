import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CheckoutPending = () => {
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

    console.log('Pago pendiente - Datos:', {
      paymentId,
      status,
      externalReference,
      merchantOrderId
    });

  }, [searchParams]);

  const handleGoHome = () => {
    navigate('/maquifit');
  };

  const handleContactSupport = () => {
    // Abrir WhatsApp o email de soporte
    window.open('https://wa.me/1234567890?text=Hola! Mi pago está pendiente y necesito información sobre el estado.', '_blank');
  };

  const handleCheckStatus = () => {
    // Aquí podrías hacer una llamada a tu backend para verificar el estado del pago
    window.location.reload();
  };

  return (
    <PendingContainer>
      <PendingContent
        as={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <PendingIcon
          as={motion.div}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          ⏳
        </PendingIcon>

        <PendingTitle
          as={motion.h1}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Pago pendiente
        </PendingTitle>

        <PendingSubtitle
          as={motion.p}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Tu pago está siendo procesado
        </PendingSubtitle>

        {paymentData.paymentId && (
          <PaymentInfo
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <InfoTitle>Detalles del pago</InfoTitle>
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

        <StatusExplanation
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ExplanationTitle>¿Por qué está pendiente?</ExplanationTitle>
          <ExplanationList>
            <ExplanationItem>
              <ExplanationIcon>🏦</ExplanationIcon>
              <ExplanationText>El banco está verificando la transacción</ExplanationText>
            </ExplanationItem>
            <ExplanationItem>
              <ExplanationIcon>💳</ExplanationIcon>
              <ExplanationText>Pago realizado con transferencia bancaria</ExplanationText>
            </ExplanationItem>
            <ExplanationItem>
              <ExplanationIcon>📋</ExplanationIcon>
              <ExplanationText>Validación adicional requerida por seguridad</ExplanationText>
            </ExplanationItem>
          </ExplanationList>
        </StatusExplanation>

        <Timeline
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <TimelineTitle>¿Qué pasará ahora?</TimelineTitle>
          <TimelineList>
            <TimelineItem>
              <TimelineStep completed={true}>1</TimelineStep>
              <TimelineContent>
                <TimelineItemTitle>Pago iniciado</TimelineItemTitle>
                <TimelineItemDesc>Tu pago ha sido recibido y está siendo procesado</TimelineItemDesc>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineStep pending={true}>2</TimelineStep>
              <TimelineContent>
                <TimelineItemTitle>Verificación en curso</TimelineItemTitle>
                <TimelineItemDesc>El banco está validando la transacción (puede tomar hasta 48hs)</TimelineItemDesc>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineStep>3</TimelineStep>
              <TimelineContent>
                <TimelineItemTitle>Confirmación</TimelineItemTitle>
                <TimelineItemDesc>Te notificaremos por email cuando se confirme el pago</TimelineItemDesc>
              </TimelineContent>
            </TimelineItem>
          </TimelineList>
        </Timeline>

        <ImportantNote
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <NoteIcon>📧</NoteIcon>
          <NoteContent>
            <NoteTitle>Mantente al tanto</NoteTitle>
            <NoteText>
              Te enviaremos un email de confirmación cuando tu pago sea aprobado. 
              También puedes contactarnos por WhatsApp para consultar el estado.
            </NoteText>
          </NoteContent>
        </ImportantNote>

        <ActionButtons
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <PrimaryButton onClick={handleCheckStatus}>
            Verificar estado
          </PrimaryButton>
          <SecondaryButton onClick={handleContactSupport}>
            Contactar soporte
          </SecondaryButton>
          <TertiaryButton onClick={handleGoHome}>
            Volver al inicio
          </TertiaryButton>
        </ActionButtons>

        <ThankYouMessage
          as={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <ThankYouIcon>💜</ThankYouIcon>
          <ThankYouText>
            Gracias por tu paciencia. Tu transformación comenzará pronto.
          </ThankYouText>
        </ThankYouMessage>
      </PendingContent>
    </PendingContainer>
  );
};

export default CheckoutPending;

// ===== Styled Components =====

const PendingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const PendingContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  max-width: 700px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
`;

const PendingIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const PendingTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #d97706;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PendingSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 2rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PaymentInfo = styled.div`
  background: #fffbeb;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #fde68a;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #d97706;
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

const StatusExplanation = styled.div`
  background: #f0f9ff;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #bae6fd;
`;

const ExplanationTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const ExplanationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ExplanationItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const ExplanationIcon = styled.span`
  font-size: 1.1rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const ExplanationText = styled.p`
  font-size: 0.9rem;
  color: #0369a1;
  margin: 0;
  line-height: 1.4;
  font-family: 'Onest', sans-serif;
`;

const Timeline = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
`;

const TimelineTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1.5rem;
  font-family: 'Onest', sans-serif;
`;

const TimelineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const TimelineStep = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
  font-family: 'Onest', sans-serif;
  
  ${props => props.completed && `
    background: #10b981;
    color: white;
  `}
  
  ${props => props.pending && `
    background: #f59e0b;
    color: white;
    animation: pulse 2s infinite;
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `}
  
  ${props => !props.completed && !props.pending && `
    background: #e5e7eb;
    color: #6b7280;
  `}
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineItemTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
  font-family: 'Onest', sans-serif;
`;

const TimelineItemDesc = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
  font-family: 'Onest', sans-serif;
`;

const ImportantNote = styled.div`
  background: #fef7ff;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #f3e8ff;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const NoteIcon = styled.span`
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const NoteContent = styled.div`
  flex: 1;
`;

const NoteTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #7c3aed;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;
`;

const NoteText = styled.p`
  font-size: 0.9rem;
  color: #7c3aed;
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

const ThankYouMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #fef7ff;
  border-radius: 12px;
  border: 1px solid #f3e8ff;
`;

const ThankYouIcon = styled.span`
  font-size: 1.5rem;
`;

const ThankYouText = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #7c3aed;
  margin: 0;
  font-family: 'Onest', sans-serif;
`;
