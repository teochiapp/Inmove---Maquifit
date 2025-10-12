import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CarritoModal = ({ isOpen, onClose, producto, cantidad = 1 }) => {
  const navigate = useNavigate();
  
  if (!isOpen || !producto) return null;

  const handleVerCarrito = () => {
    onClose();
    navigate('/carrito');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            as={motion.div}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <SuccessIcon>
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </SuccessIcon>
              <ModalTitle>¡Agregado al carrito!</ModalTitle>
            </ModalHeader>

            <ProductInfo>
              <ProductImage>
                {producto.imagen ? (
                  <ProductImageSrc 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = '<div style="font-size: 2rem; opacity: 0.3;">🛍️</div>';
                    }}
                  />
                ) : (
                  <ImagePlaceholder>🛍️</ImagePlaceholder>
                )}
              </ProductImage>
              <ProductDetails>
                <ProductName>{producto.nombre}</ProductName>
                {producto.precio && (
                  <ProductPrice>${producto.precio}</ProductPrice>
                )}
                {(producto.talle || producto.color) && (
                  <ProductSpecs>
                    {producto.talle && <Spec>Talle: {producto.talle}</Spec>}
                    {producto.color && <Spec>Color: {producto.color}</Spec>}
                  </ProductSpecs>
                )}
                <QuantityInfo>
                  <QuantityText>Cantidad: {cantidad}</QuantityText>
                  {producto.precio && cantidad > 1 && (
                    <TotalText>Total: ${Math.round(parseFloat(producto.precio) * cantidad)}</TotalText>
                  )}
                </QuantityInfo>
              </ProductDetails>
            </ProductInfo>

            <ModalActions>
              <ContinueButton onClick={onClose}>
                Seguir comprando
              </ContinueButton>
              <VerCarritoButton onClick={handleVerCarrito}>
                Ver carrito
              </VerCarritoButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default CarritoModal;

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease-out;
  
  @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  background: var(--inmove-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  
  svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`;

const ModalTitle = styled.h3`
  font-family: 'Onest', sans-serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-black);
  margin: 0;
`;

const ProductInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 12px;
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImageSrc = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  font-size: 2rem;
  opacity: 0.3;
`;

const ProductDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
`;

const ProductName = styled.h4`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-black);
  margin: 0;
  line-height: 1.3;
`;

const ProductPrice = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--inmove-color);
`;

const ProductSpecs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.25rem;
`;

const Spec = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.8rem;
  color: #666;
`;

const QuantityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #e5e7eb;
`;

const QuantityText = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--inmove-color);
`;

const TotalText = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: var(--inmove-color);
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ContinueButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: white;
  color: var(--inmove-color);
  border: 2px solid var(--inmove-color);
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--inmove-color);
    color: white;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const VerCarritoButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
