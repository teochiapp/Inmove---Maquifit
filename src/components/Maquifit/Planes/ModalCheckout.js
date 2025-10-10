import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import MercadoPagoCheckout from './MercadoPagoCheckout';

const ModalCheckout = ({ isOpen, onClose, plan }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    mail: ''
  });
  const [showCheckout, setShowCheckout] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que todos los campos estén completos
    if (formData.nombre && formData.telefono && formData.mail) {
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
                    Maqui se contactará contigo luego de procesar el pago para continuar con tu entrenamiento y lograr los resultados que soñaste.
                  </InfoText>
                </InfoMessage>

                <ButtonContainer>
                  <CancelButton type="button" onClick={handleClose}>
                    Cancelar
                  </CancelButton>
                  <PayButton type="submit">
                    Continuar con el pago
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
  z-index: 1000;
  backdrop-filter: blur(5px);
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

  @media (max-width: 768px) {
    padding: 1.5rem;
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

  &:focus {
    outline: none;
    border-color: #C58ADA;
  }

  &::placeholder {
    color: #9ca3af;
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

  @media (max-width: 480px) {
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

  &:hover {
    background: #e5e7eb;
    border-color: #d1d5db;
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

  &:hover {
    background: #b079d1;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

