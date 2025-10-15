import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
    const numeroWhatsApp = '5493513797137'; // WhatsApp: 351-3797137
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Limpiar carrito después del envío
    clearCart();
    
    // Redirigir al catálogo (home)
    navigate('/');
  };

  const generarMensajeWhatsApp = () => {
    const nombreCompleto = `${formData.nombre} ${formData.apellido}`;
    
    let mensaje = `Hola, buen día! soy ${nombreCompleto}. Quisiera confirmar el siguiente pedido para proceder al pago:\n\n`;
    
    mensaje += `Resumen del pedido\n`;
    items.forEach((item, index) => {
      if (items.length > 1) mensaje += `${index + 1}) `;
      mensaje += `${item.nombre}`;
      if (item.color) mensaje += ` — Color: ${item.color}`;
      if (item.talle) mensaje += ` — Talla: ${item.talle}`;
      mensaje += ` — Cantidad: ${item.quantity} — $${item.precio}\n`;
    });
    
    mensaje += `\nEnvío: A coordinar\n`;
    mensaje += `Total a pagar: $${Math.round(totalPrice)}\n\n`;
    
    mensaje += `Datos de contacto\n`;
    mensaje += `• Nombre: ${nombreCompleto}\n`;
    mensaje += `• Teléfono: ${formData.telefono}\n`;
    mensaje += `• Email: ${formData.email}\n\n`;
    
    mensaje += `Siguiente paso: por favor, envíenme el link de pago o el método disponible (MercadoPago / transferencia / pago en efectivo). Respondo "CONFIRMO" si todo está correcto y quiero que me envíen el link.\n\n`;
    
    mensaje += `Muchas gracias — quedo atenta ✨`;
    
    return mensaje;
  };

  if (items.length === 0) {
    return (
      <PageContainer>
        <Helmet>
          <title>Inmove - Pago</title>
          <meta name="description" content="Completa tu información para finalizar tu compra en Inmove." />
        </Helmet>
        <CatalogHeader />
        <HeaderSpacer />
        <EmptyCartContainer>
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyCartTitle>Tu carrito está vacío</EmptyCartTitle>
          <EmptyCartMessage>
            Agrega algunos productos para proceder al checkout
          </EmptyCartMessage>
          <ContinueShoppingButton onClick={() => navigate('/')}>
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
        <title>Inmove - Finalizar Compra</title>
        <meta name="description" content={`Completa tu compra. Total: $${Math.round(totalPrice || 0)} - ${totalItems || 0} ${totalItems === 1 ? 'producto' : 'productos'}.`} />
      </Helmet>
      <CatalogHeader />
      <HeaderSpacer />
      
      <Breadcrumb>
        <BreadcrumbButton onClick={() => navigate('/')}>Catálogo</BreadcrumbButton>
        <BreadcrumbSeparator>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="#BEBCBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </BreadcrumbSeparator>
        <BreadcrumbButton onClick={() => navigate('/carrito')}>Carrito</BreadcrumbButton>
        <BreadcrumbSeparator>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 12L10 8L6 4" stroke="#BEBCBD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </BreadcrumbSeparator>
        <BreadcrumbCurrent>Pagar</BreadcrumbCurrent>
      </Breadcrumb>

      <CheckoutContainer>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormSection>
            <FormTitle>Completá tu información</FormTitle>
            
            <FormGroup>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre/s"
                required
              />
              <Label htmlFor="nombre">Nombre*</Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                placeholder="Apellido/s"
                required
              />
              <Label htmlFor="apellido">Apellido*</Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="ejemplo@email.com"
                required
              />
              <Label htmlFor="email">Email*</Label>
            </FormGroup>

            <FormGroup>
              <Input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="+54 9 351 12345"
                required
              />
              <Label htmlFor="telefono">Número de teléfono*</Label>
            </FormGroup>
          </FormSection>

          <OrderSection>
            <OrderCard>
              <OrderTitle>Tu pedido</OrderTitle>
              
              <MessagePreview>
                <MessageText>
                  Hola, buen día! soy {formData.nombre && formData.apellido ? `${formData.nombre} ${formData.apellido}` : ''}. Quisiera confirmar el siguiente pedido para proceder al pago:
                </MessageText>
                
                <MessageText>
                  <strong>Resumen del pedido</strong>
                  <br />
                  {items.map((item, index) => (
                    <span key={item.id}>
                      {items.length > 1 && `${index + 1}) `}{item.nombre}
                      {item.color && ` — Color: ${item.color}`}
                      {item.talle && ` — Talla: ${item.talle}`}
                      {` — Cantidad: ${item.quantity} — $${item.precio}`}
                      <br />
                    </span>
                  ))}
                </MessageText>

                <MessageText>
                  Envío: A coordinar
                  <br />
                  Total a pagar: <strong>${Math.round(totalPrice)}</strong>
                </MessageText>

                <MessageText>
                  <strong>Datos de contacto</strong>
                  <br />
                  • Nombre: {formData.nombre} {formData.apellido}
                  <br />
                  • Teléfono: {formData.telefono}
                  <br />
                  • Email: {formData.email}
                </MessageText>

                <MessageText>
                  <strong>Siguiente paso:</strong> por favor, envíenme el link de pago o el método disponible (MercadoPago / transferencia / pago en efectivo). Respondo "CONFIRMO" si todo está correcto y quiero que me envíen el link.
                </MessageText>

                <MessageText>
                  Muchas gracias — quedo atenta ✨
                </MessageText>
                
              </MessagePreview>
            </OrderCard>

            <SendButton type="submit">
              Enviar
               <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h14M8 1l7 7-7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SendButton>
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
  color: #BEBCBD;
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
  color: #BEBCBD;
  display: flex;
  align-items: center;
`;

const BreadcrumbCurrent = styled.span`
  color: #000000;
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
  gap: 1.5rem;
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
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  position: absolute;
  top: -8px;
  left: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #666;
  background: #f8f7f2;
  padding: 0 6px;
  pointer-events: none;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid rgba(0,0,0, 0.5);
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: #f8f7f2;

  &:focus {
    outline: none;
    border-color: var(--inmove-color);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const OrderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  width: 100%;
  max-width: 650px;
  margin: 0 auto;
`;

const OrderCard = styled.div`
  background: #F3F2EC;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  max-width: 650px;

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

const MessagePreview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MessageText = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  color: #262626;
  line-height: 1.6;
  margin: 0;
  white-space: pre-line;

  strong {
    font-weight: 600;
    color: #000;
  }
`;

const SendButton = styled.button`
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

  @media (max-width: 768px) {
    width: 100%;
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
