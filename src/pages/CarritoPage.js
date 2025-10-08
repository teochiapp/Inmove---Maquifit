import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCarrito } from '../context/CarritoContext';
import CatalogHeader from '../components/Catalogo/Header/Header';
import CatalogFooter from '../components/Catalogo/Footer/Footer';

const CarritoPage = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCarrito();
  const navigate = useNavigate();

  const handleQuantityChange = (productoId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productoId);
    } else {
      updateQuantity(productoId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/catalogo');
  };

  if (items.length === 0) {
    return (
      <PageContainer>
        <CatalogHeader />
        <HeaderSpacer />
        <EmptyCartContainer>
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyCartTitle>Tu carrito está vacío</EmptyCartTitle>
          <EmptyCartMessage>
            Agrega algunos productos para comenzar tu compra
          </EmptyCartMessage>
          <ContinueShoppingButton onClick={handleContinueShopping}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ir al catálogo
          </ContinueShoppingButton>
        </EmptyCartContainer>
        <CatalogFooter />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <CatalogHeader />
      <HeaderSpacer />
      
      <Breadcrumb>
        <BreadcrumbButton onClick={() => navigate('/')}>Inicio</BreadcrumbButton>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbButton onClick={() => navigate('/catalogo')}>Catálogo</BreadcrumbButton>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbCurrent>Carrito</BreadcrumbCurrent>
      </Breadcrumb>

      <CartContainer>
        <CartTable>
          <TableHeader>
            <HeaderCell>DETALLE DE PRODUCTOS</HeaderCell>
            <HeaderCell>PRECIO</HeaderCell>
            <HeaderCell>CANTIDAD</HeaderCell>
            <HeaderCell>ENVÍO</HeaderCell>
            <HeaderCell>SUBTOTAL</HeaderCell>
            <HeaderCell></HeaderCell>
          </TableHeader>

          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <ProductCell>
                  <ProductImage>
                    {item.imagen ? (
                      <ProductImageSrc src={item.imagen} alt={item.nombre} />
                    ) : (
                      <ImagePlaceholder>🛍️</ImagePlaceholder>
                    )}
                  </ProductImage>
                  <ProductDetails>
                    <ProductName>{item.nombre}</ProductName>
                    {item.color && <ProductSpec>Color: {item.color}</ProductSpec>}
                    {item.talle && <ProductSpec>Talla: {item.talle}</ProductSpec>}
                  </ProductDetails>
                </ProductCell>

                <PriceCell>${item.precio}</PriceCell>

                <QuantityCell>
                  <QuantityControls>
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </QuantityButton>
                    <QuantityInput
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
                      min="1"
                    />
                    <QuantityButton 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </QuantityButton>
                  </QuantityControls>
                </QuantityCell>

                <ShippingCell>FREE</ShippingCell>

                <SubtotalCell>${Math.round(parseFloat(item.precio) * item.quantity)}</SubtotalCell>

                <ActionsCell>
                  <RemoveButton onClick={() => removeItem(item.id)}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4h12l-1 8H3L2 4zM6 6v6M10 6v6M4 4V2a1 1 0 011-1h6a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </RemoveButton>
                </ActionsCell>
              </TableRow>
            ))}
            
            {/* Fila de Total */}
            <TotalRow>
              <TotalCell></TotalCell>
              <TotalCell></TotalCell>
              <TotalCell></TotalCell>
              <TotalCell></TotalCell>
              <TotalCell>Total: ${Math.round(totalPrice)}</TotalCell>
              <TotalCell></TotalCell>
            </TotalRow>
          </TableBody>
        </CartTable>

        {/* Botones */}
        <ButtonContainer>
          <CheckoutButton onClick={handleProceedToCheckout}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Finalizar pedido
          </CheckoutButton>

          <ContinueShoppingLink onClick={handleContinueShopping}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Seguir comprando
          </ContinueShoppingLink>

          <ClearCartButton onClick={clearCart}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12l-1 8H3L2 4zM6 6v6M10 6v6M4 4V2a1 1 0 011-1h6a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Vaciar carrito
          </ClearCartButton>
        </ButtonContainer>
      </CartContainer>

      <CatalogFooter />
    </PageContainer>
  );
};

export default CarritoPage;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f7f2;
  padding: 2rem 0;
`;

const HeaderSpacer = styled.div`
  height: 100px;
`;

const Breadcrumb = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem;
    font-size: 0.8rem;
  }
`;

const BreadcrumbButton = styled.button`
  background: none;
  border: none;
  color: #B088E0;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  padding: 0;
  
  &:hover {
    color: var(--inmove-color);
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #B088E0;
`;

const BreadcrumbCurrent = styled.span`
  color: #262626;
  font-weight: 500;
`;


const CartContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 0rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const CartTable = styled.div`
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 0.5fr;
  background: var(--inmove-color);
  padding: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    display: none;
  }
`;

const HeaderCell = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  text-align: center;
  
  &:first-child {
    text-align: left;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 0.5fr;
  padding: 1.5rem;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ProductImageSrc = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  font-size: 1.5rem;
  opacity: 0.3;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
`;

const ProductName = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin-bottom: 0.25rem;
`;

const ProductSpec = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.85rem;
  color: #666;
`;

const PriceCell = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  text-align: center;
`;

const QuantityCell = styled.div`
  display: flex;
  justify-content: center;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 0.25rem;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: white;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background: var(--inmove-color);
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 40px;
  height: 28px;
  border: none;
  border-radius: 6px;
  text-align: center;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  background: white;
  color: #262626;

  &:focus {
    outline: none;
  }
`;

const ShippingCell = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;

const SubtotalCell = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  text-align: center;
`;

const ActionsCell = styled.div`
  display: flex;
  justify-content: center;
`;

const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: var(--inmove-rosa-color);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: var(--inmove-color);
    transform: scale(1.05);
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const TotalRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 0.5fr;
  padding: 1.5rem;
  background: #f8f9fa;
  border-top: 2px solid var(--inmove-color);
  font-weight: 600;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const TotalCell = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  color: #262626;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:nth-child(5) {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--inmove-color);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
  }
`;



const CheckoutButton = styled.button`
  padding: 12px 24px;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  
  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 40px;
    gap: 12px;
  }
`;

const ContinueShoppingLink = styled.button`
  padding: 12px 24px;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  
  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 40px;
    gap: 12px;
  }
`;

const ClearCartButton = styled.button`
  padding: 12px 24px;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  
  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 12px 40px;
    gap: 12px;
  }
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 2rem;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
`;

const EmptyCartTitle = styled.h2`
  font-family: 'Onest', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #262626;
  margin-bottom: 1rem;
`;

const EmptyCartMessage = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled.button`
  padding: 12px 40px;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateY(-1px);
  }
`;
