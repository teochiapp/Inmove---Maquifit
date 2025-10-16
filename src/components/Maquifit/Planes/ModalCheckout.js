import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import MercadoPagoCheckout from './MercadoPagoCheckout';
import { guardarDatosEnStrapi } from '../../../api/strapiPaymentService';

const ModalCheckout = ({ isOpen, onClose, plan }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    mail: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [saving, setSaving] = useState(false);
  const [externalReference, setExternalReference] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  // Detectar si es iOS Safari
  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && 
                       !window.MSStream && 
                       'ontouchstart' in window;
    setIsIOS(isIOSDevice);
  }, []);

  // Manejar el comportamiento del teclado virtual en iOS
  useEffect(() => {
    if (!isOpen || !isIOS) return;

    const handleResize = () => {
      // Forzar re-render cuando cambie el viewport (teclado virtual)
      if (window.visualViewport) {
        const viewport = window.visualViewport;
        if (viewport.height < window.innerHeight * 0.75) {
          // Teclado abierto - ajustar el modal
          document.body.style.position = 'fixed';
          document.body.style.top = `-${viewport.offsetTop}px`;
          document.body.style.width = '100%';
        } else {
          // Teclado cerrado - restaurar
          document.body.style.position = '';
          document.body.style.top = '';
          document.body.style.width = '';
        }
      }
    };

    const handleScroll = (e) => {
      // Prevenir scroll del body cuando el modal está abierto en iOS
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    
    document.addEventListener('scroll', handleScroll, { passive: false });
    document.body.style.overflow = 'hidden';

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
      document.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen, isIOS]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que todos los campos estén completos
    if (formData.nombre && formData.telefono && formData.mail) {
      setSaving(true);
      
      try {
        // 🔥 GUARDAR EN STRAPI INMEDIATAMENTE (antes de ir a MercadoPago)
        const reference = `plan_${plan.id}_${Date.now()}`;
        setExternalReference(reference);
        
        console.log('💾 Guardando datos del cliente en Strapi...');
        console.log('📋 External reference:', reference);
        console.log('📋 Datos del cliente:', formData);
        console.log('📋 Datos del plan:', plan);
        
        const result = await guardarDatosEnStrapi(reference, formData, plan);
        
        if (result.success) {
          console.log('✅ Datos guardados correctamente en Strapi!');
          console.log('✅ Ahora redirigiendo al checkout de MercadoPago...');
        } else {
          console.warn('⚠️ No se pudieron guardar en Strapi:', result.message);
          console.warn('⚠️ Continuando con el checkout de todas formas...');
        }
        
      } catch (error) {
        console.error('❌ Error guardando datos:', error);
        console.warn('⚠️ Continuando con el checkout de todas formas...');
      } finally {
        setSaving(false);
      }
      
      // Continuar al checkout
      console.log('ℹ️ El email se enviará automáticamente después de completar el pago');
      setShowCheckout(true);
    }
  };

  const handleCheckoutSuccess = () => {
    handleClose();
  };

  const handleCheckoutError = (error) => {
    console.error('Error en el pago:', error);
    // Aquí podrías mostrar un mensaje de error al usuario
  };

  const handleCheckoutCancel = () => {
    setShowCheckout(false);
  };

  const handleClose = () => {
    setFormData({ nombre: '', telefono: '', mail: '' });
    setShowCheckout(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          $isIOS={isIOS}
        >
          <ModalContent
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            $isIOS={isIOS}
          >
            <CloseButton onClick={handleClose}>
              <CloseIcon>×</CloseIcon>
            </CloseButton>

            <ModalHeader>
              <ModalTitle>
                {showCheckout ? 'Procesar pago' : 'Completá tus datos'}
              </ModalTitle>
              <PlanInfo>
                <PlanName>{plan?.title}</PlanName>
                <PlanPrice>${plan?.price?.toLocaleString("es-AR", { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0 
                })}</PlanPrice>
              </PlanInfo>
            </ModalHeader>

            {showCheckout ? (
              <MercadoPagoCheckout
                plan={plan}
                userData={formData}
                externalReference={externalReference}
                onSuccess={handleCheckoutSuccess}
                onError={handleCheckoutError}
                onCancel={handleCheckoutCancel}
              />
            ) : (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="nombre">Nombre completo *</Label>
                  <Input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingresá tu nombre completo"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ingresá tu número de teléfono"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="mail">Email *</Label>
                  <Input
                    type="email"
                    id="mail"
                    name="mail"
                    value={formData.mail}
                    onChange={handleInputChange}
                    placeholder="Ingresá tu email"
                    required
                  />
                </FormGroup>

                <InfoMessage>
                  <InfoText>
                    Maqui recibirá tus datos y se contactará contigo para diseñar tu entrenamiento personalizado y ayudarte a lograr los resultados que soñaste.
                  </InfoText>
                </InfoMessage>

                <ButtonContainer>
                  <CancelButton type="button" onClick={handleClose} disabled={saving}>
                    Cancelar
                  </CancelButton>
                  <PayButton type="submit" disabled={saving}>
                    {saving ? '💾 Guardando datos...' : 'Continuar con el pago'}
                  </PayButton>
                </ButtonContainer>
              </Form>
            )}
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default ModalCheckout;

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
  z-index: 100000;
  backdrop-filter: blur(5px);
  
  /* Fix para Safari iOS */
  -webkit-overflow-scrolling: touch;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Prevenir scroll del body cuando el modal está abierto */
  overflow: hidden;
  
  /* Asegurar que el modal se mantenga centrado en Safari iOS */
  @supports (-webkit-touch-callout: none) {
    height: 100vh;
    height: -webkit-fill-available;
  }
  
  /* Ajustes específicos para iOS cuando el teclado está abierto */
  ${props => props.$isIOS && `
    @supports (-webkit-touch-callout: none) {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      height: 100vh !important;
      height: -webkit-fill-available !important;
    }
  `}
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  /* Fix para Safari iOS - scroll suave */
  -webkit-overflow-scrolling: touch;
  
  /* Asegurar que el contenido se mantenga visible cuando aparece el teclado */
  @supports (-webkit-touch-callout: none) {
    max-height: 85vh;
    max-height: calc(100vh - 2rem);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 95%;
    margin: 1rem;
    display: flex;
    flex-direction: column !important;
    
    /* Ajustes específicos para móviles iOS */
    @supports (-webkit-touch-callout: none) {
      max-height: calc(100vh - 4rem);
      margin: 0.5rem;
      padding: 1rem;
    }
  }
  
  /* Fix específico para Safari iOS cuando el teclado está abierto */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    @supports (-webkit-touch-callout: none) {
      transform: translateZ(0);
      -webkit-transform: translateZ(0);
    }
  }
  
  /* Ajustes específicos para iOS */
  ${props => props.$isIOS && `
    @supports (-webkit-touch-callout: none) {
      @media (max-width: 768px) {
        max-height: calc(100vh - 6rem) !important;
        margin: 1rem 0.5rem !important;
        padding: 1rem !important;
        transform: translateZ(0) !important;
        -webkit-transform: translateZ(0) !important;
      }
    }
  `}
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
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PlanInfo = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 1rem;
  border-left: 4px solid #C58ADA;
`;

const PlanName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;
`;

const PlanPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #C58ADA;
  font-family: 'Onest', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  font-family: 'Onest', sans-serif;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Onest', sans-serif;
  transition: border-color 0.3s ease;
  
  /* Fix para Safari iOS */
  -webkit-appearance: none;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  
  /* Prevenir zoom automático en Safari iOS */
  font-size: 16px;
  
  /* Asegurar que el input sea clickeable */
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: text;
  user-select: text;

  &:focus {
    outline: none;
    border-color: #C58ADA;
    
    /* Fix para Safari iOS - prevenir zoom */
    @supports (-webkit-touch-callout: none) {
      transform: translateZ(0);
    }
  }

  &::placeholder {
    color: #9ca3af;
  }
  
  /* Asegurar que el input sea visible en Safari iOS */
  @supports (-webkit-touch-callout: none) {
    background-color: white;
    -webkit-appearance: none;
  }
`;

const InfoMessage = styled.div`
  background: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0.5rem 0;
`;

const InfoIcon = styled.span`
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
`;

const InfoText = styled.p`
  font-size: 0.9rem;
  color: #0369a1;
  margin: 0;
  line-height: 1.4;
  font-family: 'Onest', sans-serif;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover:not(:disabled) {
    background: #e5e7eb;
    border-color: #d1d5db;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PayButton = styled.button`
  flex: 2;
  padding: 0.75rem 1rem;
  background: #C58ADA;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;

  &:hover:not(:disabled) {
    background: #b079d1;
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

