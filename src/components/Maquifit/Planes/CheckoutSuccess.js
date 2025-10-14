import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { sendPaymentSuccessEmail, getStoredPaymentData, clearStoredPaymentData } from '../../../api/emailService';
import ThankYouModal from './ThankYouModal';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [clientData, setClientData] = useState({});
  const [planData, setPlanData] = useState({});
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processPaymentSuccess = async () => {
      try {
        setIsProcessing(true);
        
        // Obtener parámetros de la URL
        const paymentId = searchParams.get('payment_id');
        const status = searchParams.get('status');
        const externalReference = searchParams.get('external_reference');
        const merchantOrderId = searchParams.get('merchant_order_id');

        const paymentInfo = {
          paymentId,
          status,
          externalReference,
          merchantOrderId
        };

        setPaymentData(paymentInfo);

        console.log('Pago exitoso - Datos:', paymentInfo);

        // Obtener datos almacenados del cliente y plan
        const { clientData: storedClient, planData: storedPlan, hasData } = getStoredPaymentData();
        
        if (hasData) {
          setClientData(storedClient);
          setPlanData(storedPlan);
          
          console.log('📋 Datos del cliente y plan obtenidos:', { storedClient, storedPlan });
          console.log('ℹ️ Email ya fue enviado cuando el cliente hizo clic en "Continuar con el pago"');
          
          // NO enviamos email aquí porque ya se envió antes del pago
          setEmailSent(true);
          
          // Limpiar datos almacenados
          clearStoredPaymentData();
          
        } else {
          console.warn('⚠️ No se encontraron datos del cliente almacenados');
        }
        
        // Esperar un momento y mostrar el modal
        setTimeout(() => {
          setIsProcessing(false);
          setShowModal(true);
        }, 2000);
        
      } catch (error) {
        console.error('❌ Error procesando el pago exitoso:', error);
        setIsProcessing(false);
        // Aún así mostrar el modal después de un error
        setTimeout(() => setShowModal(true), 1000);
      }
    };

    processPaymentSuccess();
  }, [searchParams]);

  const handleGoHome = () => {
    navigate('/maquifit');
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Redirigir al home después de cerrar el modal
    setTimeout(() => {
      navigate('/maquifit');
    }, 300);
  };

  // const handleContactSupport = () => {
  //   // Abrir WhatsApp o email de soporte
  //   window.open('https://wa.me/1234567890?text=Hola! Acabo de completar mi pago y necesito más información sobre mi plan.', '_blank');
  // };

  // Si estamos procesando, mostrar pantalla de carga
  if (isProcessing) {
    return (
      <ProcessingContainer>
        <ProcessingContent
          as={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <ProcessingSpinner
            as={motion.div}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <ProcessingTitle>Procesando tu pago...</ProcessingTitle>
          <ProcessingSubtitle>
            {emailSent ? 'Email enviado ✅' : 'Enviando confirmación por email...'}
          </ProcessingSubtitle>
        </ProcessingContent>
      </ProcessingContainer>
    );
  }

  return (
    <>
      <SuccessContainer>
        <SuccessContent
          as={motion.div}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <SuccessIcon
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            ✅
          </SuccessIcon>

          <SuccessTitle
            as={motion.h1}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ¡Pago exitoso!
          </SuccessTitle>

          <SuccessSubtitle
            as={motion.p}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Tu compra ha sido procesada correctamente
            {emailSent && (
              <EmailSentIndicator>
                <br />📧 Email de confirmación enviado
              </EmailSentIndicator>
            )}
          </SuccessSubtitle>

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
              {clientData.nombre && (
                <InfoItem>
                  <InfoLabel>Cliente:</InfoLabel>
                  <InfoValue>{clientData.nombre}</InfoValue>
                </InfoItem>
              )}
              {planData.title && (
                <InfoItem>
                  <InfoLabel>Plan:</InfoLabel>
                  <InfoValue>{planData.title}</InfoValue>
                </InfoItem>
              )}
            </PaymentInfo>
          )}

          <NextSteps
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <StepsTitle>¿Qué sigue ahora?</StepsTitle>
            <StepsList>
              <StepItem>
                <StepIcon>📧</StepIcon>
                <StepText>
                  {emailSent 
                    ? 'Email de confirmación enviado exitosamente ✅' 
                    : 'Recibirás un email de confirmación con los detalles de tu compra'
                  }
                </StepText>
              </StepItem>
              <StepItem>
                <StepIcon>📱</StepIcon>
                <StepText>Maqui se contactará contigo por WhatsApp en las próximas 24 horas</StepText>
              </StepItem>
              <StepItem>
                <StepIcon>💪</StepIcon>
                <StepText>Comenzarás tu transformación con un plan 100% personalizado</StepText>
              </StepItem>
            </StepsList>
          </NextSteps>

          <ActionButtons
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <PrimaryButton onClick={() => setShowModal(true)}>
              Ver mensaje de Maqui
            </PrimaryButton>
            <SecondaryButton onClick={handleGoHome}>
              Volver al inicio
            </SecondaryButton>
          </ActionButtons>

          <ThankYouMessage
            as={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ThankYouIcon>💜</ThankYouIcon>
            <ThankYouText>
              ¡Gracias por confiar en Maquifit para tu transformación!
            </ThankYouText>
          </ThankYouMessage>
        </SuccessContent>
      </SuccessContainer>

      {/* Modal de agradecimiento */}
      <ThankYouModal 
        isOpen={showModal}
        onClose={handleModalClose}
        clientName={clientData.nombre}
      />
    </>
  );
};

export default CheckoutSuccess;

// ===== Styled Components =====

const SuccessContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #C58ADA 0%, #9DC6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const SuccessContent = styled.div`
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

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;

const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SuccessSubtitle = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 2rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const PaymentInfo = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
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

const NextSteps = styled.div`
  background: #f0f9ff;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid #bae6fd;
`;

const StepsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #0369a1;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const StepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const StepIcon = styled.span`
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const StepText = styled.p`
  font-size: 0.95rem;
  color: #0369a1;
  margin: 0;
  line-height: 1.4;
  font-family: 'Onest', sans-serif;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  flex: 1;
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
  flex: 1;
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

// ===== Processing Components =====

const ProcessingContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #C58ADA 0%, #9DC6DA 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ProcessingContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 3rem 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 1rem;
  }
`;

const ProcessingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #f3f4f6;
  border-top: 4px solid #C58ADA;
  border-radius: 50%;
  margin: 0 auto 2rem auto;
`;

const ProcessingTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProcessingSubtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-family: 'Onest', sans-serif;
`;

const EmailSentIndicator = styled.span`
  color: #059669;
  font-weight: 500;
  font-size: 0.9rem;
`;
