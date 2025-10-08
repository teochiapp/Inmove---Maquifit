import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCarrito } from '../context/CarritoContext';
import CatalogHeader from '../components/Catalogo/Header/Header';
import CatalogFooter from '../components/Catalogo/Footer/Footer';

const CheckoutPage = () => {
  const { items, totalItems, totalPrice, clearCart } = useCarrito();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    // Generar mensaje de WhatsApp
    const mensaje = generarMensajeWhatsApp();
    const numeroWhatsApp = '543564361590'; // Reemplazar con el número real
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Limpiar carrito después del envío
    clearCart();
    
    // Redirigir al home
    navigate('/');
  };

  const generarMensajeWhatsApp = () => {
    const nombreCompleto = `${formData.nombre} ${formData.apellido}`;
    
    let mensaje = `Hola, buen día! soy ${nombreCompleto}. Quisiera confirmar el siguiente pedido para proceder al pago:\n\n`;
    
    mensaje += `Resumen del pedido\n`;
    items.forEach(item => {
      mensaje += `${item.nombre}`;
      if (item.color) mensaje += ` — Color: ${item.color}`;
      if (item.talle) mensaje += ` — Talla: ${item.talle}`;
      mensaje += ` — Cantidad: ${item.quantity} — $${item.precio}\n`;
    });
    
    mensaje += `\nSubtotal: $${Math.round(totalPrice)} Envío: FREE Total a pagar: $${Math.round(totalPrice)}\n\n`;
    
    mensaje += `Datos de contacto\n`;
    mensaje += `Nombre: ${nombreCompleto}\n`;
    mensaje += `Teléfono: ${formData.telefono}\n`;
    mensaje += `Email: ${formData.email}\n\n`;
    
    mensaje += `Siguiente paso: por favor, envíenme el link de pago o el método disponible (MercadoPago / transferencia / pago en efectivo). Respondo "CONFIRMO" si todo está correcto y quiero que me envíen el link.\n\n`;
    
    mensaje += `Muchas gracias — quedo atenta ✨`;
    
    return mensaje;
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
            Agrega algunos productos para proceder al checkout
          </EmptyCartMessage>
          <ContinueShoppingButton onClick={() => navigate('/catalogo')}>
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
        <BreadcrumbButton onClick={() => navigate('/carrito')}>Carrito</BreadcrumbButton>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbCurrent>Pagar</BreadcrumbCurrent>
      </Breadcrumb>

      <CheckoutContainer>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <FormTitle>Completá tu información</FormTitle>
            
            <FormGroup>
              <Label htmlFor="nombre">Nombre*</Label>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre/s"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="apellido">Apellido*</Label>
              <Input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Apellido/s"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email*</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ejemplo@email.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="telefono">Número de teléfono*</Label>
              <Input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="+54 9 351 12345"
                required
              />
            </FormGroup>
          </FormSection>

          <OrderSection>
            <OrderCard>
              <OrderTitle>Tu pedido</OrderTitle>
              
              <OrderSummary>
                <OrderItems>
                  {items.map((item) => (
                    <OrderItem key={item.id}>
                      <ItemName>{item.nombre}</ItemName>
                      {item.color && <ItemDetail>Color: {item.color}</ItemDetail>}
                      {item.talle && <ItemDetail>Talla: {item.talle}</ItemDetail>}
                      <ItemDetail>Cantidad: {item.quantity}</ItemDetail>
                      <ItemPrice>${item.precio}</ItemPrice>
                    </OrderItem>
                  ))}
                </OrderItems>

                <OrderTotals>
                  <TotalRow>
                    <TotalLabel>Subtotal:</TotalLabel>
                    <TotalValue>${Math.round(totalPrice)}</TotalValue>
                  </TotalRow>
                  <TotalRow>
                    <TotalLabel>Envío:</TotalLabel>
                    <TotalValue>FREE</TotalValue>
                  </TotalRow>
                  <TotalRow className="final">
                    <TotalLabel>Total a pagar:</TotalLabel>
                    <TotalValue>${Math.round(totalPrice)}</TotalValue>
                  </TotalRow>
                </OrderTotals>

                <ContactInfo>
                  <ContactTitle>Datos de contacto</ContactTitle>
                  <ContactItem>Nombre: {formData.nombre} {formData.apellido}</ContactItem>
                  <ContactItem>Teléfono: {formData.telefono}</ContactItem>
                  <ContactItem>Email: {formData.email}</ContactItem>
                </ContactInfo>

                <NextStepInfo>
                  <NextStepTitle>Siguiente paso:</NextStepTitle>
                  <NextStepText>
                    por favor, envíenme el link de pago o el método disponible (MercadoPago / transferencia / pago en efectivo). Respondo "CONFIRMO" si todo está correcto y quiero que me envíen el link.
                  </NextStepText>
                </NextStepInfo>

                <ThankYouMessage>
                  Muchas gracias — quedo atenta ✨
                </ThankYouMessage>

                <SendButton type="submit">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Enviar
                </SendButton>
              </OrderSummary>
            </OrderCard>
          </OrderSection>
        </CheckoutForm>
      </CheckoutContainer>

      <CatalogFooter />
    </PageContainer>
  );
};

export default CheckoutPage;

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
    color: #8B5CF6;
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #B088E0;
`;

const BreadcrumbCurrent = styled.span`
  color: #262626;
  font-weight: 500;
`;

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const CheckoutForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormTitle = styled.h1`
  font-family: 'Onest', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #262626;
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #262626;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #B088E0;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const OrderSection = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const OrderTitle = styled.h2`
  font-family: 'Onest', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #262626;
  margin: 0 0 1.5rem 0;
`;

const OrderSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderItem = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin-bottom: 0.5rem;
`;

const ItemDetail = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin-right: 1rem;
`;

const ItemPrice = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #8B5CF6;
  float: right;
`;

const OrderTotals = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0;
  border-top: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  &.final {
    font-weight: 700;
    font-size: 1.1rem;
    color: #262626;
    padding-top: 0.5rem;
    border-top: 1px solid #e5e7eb;
    margin-top: 0.5rem;
  }
`;

const TotalLabel = styled.span`
  font-family: 'Onest', sans-serif;
  color: #666;
`;

const TotalValue = styled.span`
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  color: #262626;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ContactTitle = styled.h3`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 0.5rem 0;
`;

const ContactItem = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;
`;

const NextStepInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NextStepTitle = styled.h3`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 0.5rem 0;
`;

const NextStepText = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  margin: 0;
`;

const ThankYouMessage = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  color: #262626;
  text-align: center;
  margin: 1rem 0;
`;

const SendButton = styled.button`
  width: 100%;
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
  
  &:active {
    transform: translateY(0);
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
