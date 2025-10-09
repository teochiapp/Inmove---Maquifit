import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCarrito } from "../context/CarritoContext";
import CatalogHeader from "../components/Catalogo/Header/Header";
import CatalogFooter from "../components/Catalogo/Footer/Footer";

const CarritoPage = () => {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCarrito();
  const navigate = useNavigate();

  const handleQuantityChange = (productoId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productoId);
    } else {
      updateQuantity(productoId, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (items.length === 0) {
    return (
      <PageContainer>
        <Helmet>
          <title>Inmove - Carrito</title>
          <meta name="description" content="Tu carrito de compras está vacío. Descubre nuestra colección de productos deportivos." />
        </Helmet>
        <CatalogHeader />
        <HeaderSpacer />
        <EmptyCartContainer>
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyCartTitle>Tu carrito está vacío</EmptyCartTitle>
          <EmptyCartMessage>
            Agrega algunos productos para comenzar tu compra
          </EmptyCartMessage>
          <ContinueShoppingButton onClick={handleContinueShopping}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L15 8L8 15M15 8H1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
      <Helmet>
        <title>{`Inmove - Carrito de Compras (${totalItems || 0} ${totalItems === 1 ? 'producto' : 'productos'})`}</title>
        <meta name="description" content={`Finaliza tu compra. Total: $${Math.round(totalPrice || 0)} - ${totalItems || 0} ${totalItems === 1 ? 'producto' : 'productos'} en tu carrito.`} />
      </Helmet>
      <CatalogHeader />
      <HeaderSpacer />

      <Breadcrumb>
        <BreadcrumbButton onClick={() => navigate("/")}>
          Catálogo
        </BreadcrumbButton>
        <BreadcrumbSeparator>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 12L10 8L6 4"
              stroke="#BEBCBD"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </BreadcrumbSeparator>
        <BreadcrumbCurrent>Carrito</BreadcrumbCurrent>
      </Breadcrumb>

      <TopActionsContainer>
        <ContinueShoppingLink onClick={handleContinueShopping}>
          Seguir comprando
          <svg width="14" height="14" viewBox="0 0 16 17" fill="none">
            <path d="M5.33366 15.1666C5.70185 15.1666 6.00033 14.8682 6.00033 14.5C6.00033 14.1318 5.70185 13.8333 5.33366 13.8333C4.96547 13.8333 4.66699 14.1318 4.66699 14.5C4.66699 14.8682 4.96547 15.1666 5.33366 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.6667 15.1666C13.0349 15.1666 13.3333 14.8682 13.3333 14.5C13.3333 14.1318 13.0349 13.8333 12.6667 13.8333C12.2985 13.8333 12 14.1318 12 14.5C12 14.8682 12.2985 15.1666 12.6667 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1.36621 1.86664L2.69954 1.86664L4.47288 10.1466C4.53793 10.4499 4.70666 10.721 4.95002 10.9132C5.19338 11.1055 5.49615 11.2069 5.80621 11.2L12.3262 11.2C12.6297 11.1995 12.9239 11.0955 13.1602 10.9052C13.3966 10.7149 13.561 10.4497 13.6262 10.1533L14.7262 5.19997L3.41288 5.19997" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ContinueShoppingLink>
      </TopActionsContainer>

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
                    {item.talle && (
                      <ProductAttributes>
                        Talla: {item.talle}
                      </ProductAttributes>
                    )}
                    {item.color && (
                      <ProductAttributes>
                        Color: {item.color}
                      </ProductAttributes>
                    )}
                  </ProductDetails>
                </ProductCell>

                <MobilePriceQuantityRow>
                  <PriceCell>${item.precio}</PriceCell>

                  <QuantityCell>
                    <QuantityControls>
                      <QuantityButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </QuantityButton>
                      <QuantityInput
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        min="1"
                      />
                      <QuantityButton
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </QuantityButton>
                    </QuantityControls>
                  </QuantityCell>
                </MobilePriceQuantityRow>

                <ShippingCell>A coordinar</ShippingCell>

                <SubtotalCell>
                  ${Math.round(parseFloat(item.precio) * item.quantity)}
                </SubtotalCell>

                <ActionsCell>
                  <RemoveButton onClick={() => removeItem(item.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M3 6h18" stroke="var(--inmove-rosa-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" stroke="var(--inmove-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" stroke="var(--inmove-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="10" x2="10" y1="11" y2="17" stroke="var(--inmove-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="14" x2="14" y1="11" y2="17" stroke="var(--inmove-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
            Finalizar pedido
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 8h14M8 1l7 7-7 7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </CheckoutButton>

          <ClearCartButton onClick={clearCart}>
            Vaciar
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 4h12l-1 8H3L2 4zM6 6v6M10 6v6M4 4V2a1 1 0 011-1h6a1 1 0 011 1v2"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Onest", sans-serif;
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
  color: #bebcbd;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
  font-family: "Onest", sans-serif;
  font-size: 0.9rem;
  padding: 0;

  &:hover {
    color: var(--inmove-color);
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #bebcbd;
  display: flex;
  align-items: center;
`;

const BreadcrumbCurrent = styled.span`
  color: #000000;
  font-weight: 500;
`;

const TopActionsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 1rem;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    padding: 0 1rem 1rem;
  }
`;

const CartContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
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
  font-family: "Onest", sans-serif;
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
    position: relative;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
    padding-top: 2.5rem;
  }
`;

const ProductCell = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
`;

const MobilePriceQuantityRow = styled.div`
  display: contents;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
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
  font-family: "Onest", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin-bottom: 0.25rem;
`;

const ProductAttributes = styled.div`
  font-family: "Onest", sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  color: #999;
  margin-top: 0.25rem;
`;

const ProductSpec = styled.div`
  font-family: "Onest", sans-serif;
  font-size: 0.85rem;
  color: #666;
`;

const PriceCell = styled.div`
  font-family: "Onest", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    
    &::before {
      content: "Precio: ";
      font-weight: 500;
      color: #666;
    }
  }
`;

const QuantityCell = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  background: #F3F2EC;
  border-radius: 8px;
  padding: 0.25rem;
  width: fit-content;
`;

const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  color: #666;
  transition: all 0.2s ease;

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
  border-radius: 0;
  text-align: center;
  font-family: "Onest", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  background: transparent;
  color: #262626;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  line-height: 28px;

  &:focus {
    outline: none;
  }

  /* Remover flechas de input number */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
`;

const ShippingCell = styled.div`
  font-family: "Onest", sans-serif;
  font-size: 0.9rem;
  color: #666;
  text-align: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SubtotalCell = styled.div`
  font-family: "Onest", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  text-align: center;

  @media (max-width: 768px) {
    text-align: left;
    
    &::before {
      content: "Subtotal: ";
      font-weight: 500;
      color: #666;
    }
  }
`;

const ActionsCell = styled.div`
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
`;

const RemoveButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: var(--inmove-color);
    transform: scale(1.1);
    
    svg path,
    svg line {
      stroke: white;
    }
  }
`;

const TotalRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr 1fr 0.5fr;
  padding: 1.5rem;
  border-top: 2px solid var(--inmove-color);
  font-weight: 600;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const TotalCell = styled.div`
  font-family: "Onest", sans-serif;
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
  position: relative;
  align-items: center;
  max-width: 100%;
  min-height: 48px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    position: static;
  }
`;

const CheckoutButton = styled.button`
  padding: 12px 40px;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Onest", sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateX(-50%) translateY(-1px);
  }

  @media (max-width: 768px) {
    position: static;
    transform: none;
    width: 100%;
    padding: 12px 40px;
    gap: 12px;

    &:hover {
      transform: translateY(-1px);
    }
  }
`;

const ContinueShoppingLink = styled.button`
  padding: 12px 24px;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: "Onest", sans-serif;
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
  font-family: "Onest", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  margin-left: auto;

  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    margin-left: 0;
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
  font-family: "Onest", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #262626;
  margin-bottom: 1rem;
`;

const EmptyCartMessage = styled.p`
  font-family: "Onest", sans-serif;
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
  font-family: "Onest", sans-serif;
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
