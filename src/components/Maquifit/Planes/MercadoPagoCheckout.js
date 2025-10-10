import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { storePaymentData } from '../../../api/emailService';

const MercadoPagoCheckout = ({ plan, userData, onError, onCancel }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
     // Crear preferencia de pago al montar el componente
     createPreference();
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [plan, userData]);

  const createPreference = async () => {
    try {
      setLoading(true);
      setError(null);

      const preferenceData = {
        items: [
          {
            id: plan.id.toString(),
            title: plan.title,
            description: plan.description,
            quantity: 1,
            unit_price: parseFloat(plan.price),
            currency_id: 'ARS'
          }
        ],
        payer: {
          name: userData.nombre,
          email: userData.mail,
          phone: {
            number: userData.telefono
          }
        },
         back_urls: {
           success: `${window.location.origin}/checkout/success`,
           failure: `${window.location.origin}/checkout/failure`,
           pending: `${window.location.origin}/checkout/pending`
         },
         // Remover auto_return para evitar validación estricta en desarrollo
         // auto_return: 'approved',
        external_reference: `plan_${plan.id}_${Date.now()}`,
        // notification_url: 'https://your-domain.com/webhook/mercadopago', // Solo para producción
        metadata: {
          plan_id: plan.id,
          plan_title: plan.title,
          user_name: userData.nombre,
          user_email: userData.mail,
          user_phone: userData.telefono
        }
      };

       // DESARROLLO: Crear preferencia real para obtener init_point
       // Esto nos dará la URL real del Checkout Pro de MercadoPago
       
       const accessToken = process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN;
       
       if (!accessToken) {
         throw new Error('Access token no configurado en variables de entorno');
       }

       const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${accessToken}`,
           'Content-Type': 'application/json',
         },
         body: JSON.stringify(preferenceData)
       });

       if (!response.ok) {
         const errorData = await response.json().catch(() => ({}));
         console.error('Error de MercadoPago:', errorData);
         throw new Error(`Error HTTP: ${response.status} - ${errorData.message || 'Error desconocido'}`);
       }

       const data = await response.json();
       
       // Almacenar datos del cliente y plan para el email
       storePaymentData(userData, plan);
       
       // Redirigir inmediatamente al Checkout Pro
       if (data.init_point) {
         window.location.href = data.init_point;
       } else {
         throw new Error('No se recibió URL de Checkout Pro');
       }

    } catch (error) {
      console.error('Error creando preferencia:', error);
      setError(`Error al crear la preferencia de pago: ${error.message}`);
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

   if (loading) {
     return (
       <LoadingContainer>
         <LoadingSpinner />
         <LoadingText>Creando preferencia de pago...</LoadingText>
         <LoadingSubtext>Redirigiendo a Checkout Pro de MercadoPago</LoadingSubtext>
       </LoadingContainer>
     );
   }

   if (error) {
     return (
       <ErrorContainer>
         <ErrorIcon>⚠️</ErrorIcon>
         <ErrorTitle>Error al procesar el pago</ErrorTitle>
         <ErrorMessage>{error}</ErrorMessage>
         <ErrorActions>
           <RetryButton onClick={createPreference}>
             Reintentar
           </RetryButton>
           <CancelButton onClick={onCancel}>
             Cancelar
           </CancelButton>
         </ErrorActions>
       </ErrorContainer>
     );
   }

   // Si llegamos aquí, significa que la redirección falló
   // Mostrar mensaje de redirección manual
   return (
     <CheckoutContainer>
       <CheckoutHeader>
         <CheckoutTitle>Redirigiendo a MercadoPago</CheckoutTitle>
         <CheckoutSubtitle>
           Si no fuiste redirigido automáticamente, haz click en el botón de abajo
         </CheckoutSubtitle>
       </CheckoutHeader>

       <PurchaseSummary>
         <SummaryTitle>Resumen de compra</SummaryTitle>
         <SummaryItem>
           <SummaryLabel>Plan:</SummaryLabel>
           <SummaryValue>{plan.title}</SummaryValue>
         </SummaryItem>
         <SummaryItem>
           <SummaryLabel>Precio:</SummaryLabel>
           <SummaryValue>
             ${plan.price?.toLocaleString("es-AR", { 
               minimumFractionDigits: 0,
               maximumFractionDigits: 0 
             })}
           </SummaryValue>
         </SummaryItem>
         <SummaryDivider />
         <SummaryItem>
           <SummaryLabel><strong>Total:</strong></SummaryLabel>
           <SummaryTotal>
             ${plan.price?.toLocaleString("es-AR", { 
               minimumFractionDigits: 0,
               maximumFractionDigits: 0 
             })}
           </SummaryTotal>
         </SummaryItem>
       </PurchaseSummary>

       <WalletContainer>
         <DemoPaymentButton onClick={createPreference}>
           <DemoButtonIcon>💳</DemoButtonIcon>
           <DemoButtonText>
             <DemoButtonTitle>Ir a Checkout Pro de MercadoPago</DemoButtonTitle>
             <DemoButtonSubtitle>Completa tu pago de forma segura</DemoButtonSubtitle>
           </DemoButtonText>
         </DemoPaymentButton>
       </WalletContainer>

      <SecurityNote>
        <SecurityIcon>🔒</SecurityIcon>
        <SecurityText>
          Serás redirigido al sitio oficial de MercadoPago para completar tu pago de forma segura.
        </SecurityText>
      </SecurityNote>

      <ActionButtons>
        <BackButton onClick={onCancel}>
          ← Volver
        </BackButton>
      </ActionButtons>
    </CheckoutContainer>
   );
};

export default MercadoPagoCheckout;

// ===== Styled Components =====

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CheckoutHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const CheckoutTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;
`;

const CheckoutSubtitle = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  font-family: 'Onest', sans-serif;
`;

const PurchaseSummary = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
`;

const SummaryTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

const SummaryLabel = styled.span`
  font-size: 0.95rem;
  color: #6b7280;
  font-family: 'Onest', sans-serif;
`;

const SummaryValue = styled.span`
  font-size: 0.95rem;
  color: #1f2937;
  font-family: 'Onest', sans-serif;
`;

const SummaryTotal = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: #C58ADA;
  font-family: 'Onest', sans-serif;
`;

const SummaryDivider = styled.hr`
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1rem 0;
`;

const WalletContainer = styled.div`
  margin: 1rem 0;
  
  .mercadopago-button {
    border-radius: 8px !important;
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 8px;
  padding: 1rem;
`;

const SecurityIcon = styled.span`
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const SecurityText = styled.p`
  font-size: 0.85rem;
  color: #0369a1;
  margin: 0;
  line-height: 1.4;
  font-family: 'Onest', sans-serif;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

// Loading Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #C58ADA;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;
`;

const LoadingSubtext = styled.p`
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  font-family: 'Onest', sans-serif;
`;

// Error Components
const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #dc2626;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;
`;

const ErrorMessage = styled.p`
  font-size: 0.95rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-family: 'Onest', sans-serif;
`;

const ErrorActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const RetryButton = styled.button`
  background: #C58ADA;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover {
    background: #b079d1;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
`;

// Demo Payment Button Components
const DemoPaymentButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #009ee3 0%, #0066cc 100%);
  border: none;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 158, 227, 0.3);
  }
`;

const DemoButtonIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`;

const DemoButtonText = styled.div`
  flex: 1;
  text-align: left;
`;

const DemoButtonTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.25rem;
  font-family: 'Onest', sans-serif;
`;

const DemoButtonSubtitle = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: 'Onest', sans-serif;
`;
