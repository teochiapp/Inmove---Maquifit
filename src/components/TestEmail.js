import React, { useState } from 'react';
import styled from 'styled-components';
import { sendPaymentSuccessEmail } from '../api/emailService';

const TestEmail = () => {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    // Datos del cliente de prueba
    nombre: 'Juan Pérez',
    mail: 'cliente.prueba@gmail.com',
    telefono: '+54 9 351 1234567',
    
    // Datos del plan de prueba
    planTitle: 'Plan Premium - 3 Meses',
    planPrice: 45000,
    planDescription: 'Plan de entrenamiento personalizado + nutrición'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTestEmail = async () => {
    setSending(true);
    setResult(null);
    
    try {
      // Verificar variables de entorno primero
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

      console.log('🔍 Verificando configuración...');
      console.log('Service ID:', serviceId);
      console.log('Template ID:', templateId);
      console.log('Public Key:', publicKey ? '✅ Configurado' : '❌ No configurado');

      // Verificar que las variables estén configuradas
      if (!serviceId || serviceId === 'service_xxxxxxx') {
        throw new Error('Service ID no configurado correctamente en el archivo .env');
      }
      
      if (!templateId || templateId === 'template_xxxxxxx') {
        throw new Error('⚠️ Template ID no configurado. Debes crear el template en EmailJS y actualizar el .env con el Template ID real.');
      }
      
      if (!publicKey || publicKey === 'tu_public_key_aqui') {
        throw new Error('Public Key no configurado correctamente en el archivo .env');
      }

      // Simular datos de pago de MercadoPago
      const paymentData = {
        paymentId: 'TEST_' + Date.now(),
        status: 'approved',
        externalReference: `test_plan_${Date.now()}`,
        merchantOrderId: 'TEST_ORDER_' + Date.now()
      };

      // Datos del cliente
      const clientData = {
        nombre: formData.nombre,
        mail: formData.mail,
        telefono: formData.telefono
      };

      // Datos del plan
      const planData = {
        title: formData.planTitle,
        price: parseFloat(formData.planPrice),
        description: formData.planDescription
      };

      console.log('🧪 Enviando email de prueba...');
      console.log('📋 Datos:', { paymentData, clientData, planData });

      // Enviar el email
      const emailResult = await sendPaymentSuccessEmail(paymentData, clientData, planData);

      console.log('📧 Resultado:', emailResult);
      setResult(emailResult);

    } catch (error) {
      console.error('❌ Error en prueba:', error);
      setResult({
        success: false,
        error: error.message || 'Error desconocido',
        message: 'Error al enviar email de prueba'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <TestContainer>
      <TestCard>
        <TestHeader>
          <TestTitle>🧪 Prueba de Envío de Email</TestTitle>
          <TestSubtitle>
            Verifica que EmailJS está correctamente configurado
          </TestSubtitle>
        </TestHeader>

        <Form>
          <Section>
            <SectionTitle>👤 Datos del Cliente</SectionTitle>
            <FormGroup>
              <Label>Nombre completo</Label>
              <Input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Juan Pérez"
              />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleInputChange}
                placeholder="cliente@ejemplo.com"
              />
            </FormGroup>

            <FormGroup>
              <Label>Teléfono</Label>
              <Input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="+54 9 351 1234567"
              />
            </FormGroup>
          </Section>

          <Section>
            <SectionTitle>💪 Datos del Plan</SectionTitle>
            <FormGroup>
              <Label>Nombre del Plan</Label>
              <Input
                type="text"
                name="planTitle"
                value={formData.planTitle}
                onChange={handleInputChange}
                placeholder="Plan Premium - 3 Meses"
              />
            </FormGroup>

            <FormGroup>
              <Label>Precio</Label>
              <Input
                type="number"
                name="planPrice"
                value={formData.planPrice}
                onChange={handleInputChange}
                placeholder="45000"
              />
            </FormGroup>

            <FormGroup>
              <Label>Descripción</Label>
              <Input
                type="text"
                name="planDescription"
                value={formData.planDescription}
                onChange={handleInputChange}
                placeholder="Plan de entrenamiento personalizado + nutrición"
              />
            </FormGroup>
          </Section>

          <ButtonContainer>
            <TestButton 
              onClick={handleTestEmail}
              disabled={sending}
            >
              {sending ? (
                <>
                  <Spinner />
                  Enviando email...
                </>
              ) : (
                <>
                  📧 Enviar Email de Prueba
                </>
              )}
            </TestButton>
          </ButtonContainer>

          {result && (
            <ResultContainer $success={result.success}>
              <ResultIcon>{result.success ? '✅' : '❌'}</ResultIcon>
              <ResultContent>
                <ResultTitle>
                  {result.success ? '¡Email enviado exitosamente!' : 'Error al enviar email'}
                </ResultTitle>
                <ResultMessage>{result.message}</ResultMessage>
                {result.error && (
                  <ErrorDetails>
                    <strong>Error:</strong> {result.error}
                  </ErrorDetails>
                )}
                {result.success && (
                  <SuccessDetails>
                    El email debería llegar a <strong>teochiapps@gmail.com</strong> en unos segundos.
                    Revisa también la carpeta de SPAM.
                  </SuccessDetails>
                )}
              </ResultContent>
            </ResultContainer>
          )}
        </Form>

        <InfoBox>
          <InfoIcon>💡</InfoIcon>
          <InfoContent>
            <InfoTitle>Información</InfoTitle>
            <InfoList>
              <InfoItem>Este email se enviará a <strong>teochiapps@gmail.com</strong></InfoItem>
              <InfoItem>Los datos son simulados y no afectan a ningún pago real</InfoItem>
              <InfoItem>Revisa la consola del navegador (F12) para ver logs detallados</InfoItem>
              <InfoItem>Si hay errores, verifica las variables en el archivo <code>.env</code></InfoItem>
            </InfoList>
          </InfoContent>
        </InfoBox>

        <ConfigStatus>
          <StatusTitle>📋 Estado de Configuración</StatusTitle>
          <StatusList>
            <StatusItem>
              <StatusLabel>Service ID:</StatusLabel>
              <StatusValue>{process.env.REACT_APP_EMAILJS_SERVICE_ID || '❌ No configurado'}</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusLabel>Template ID:</StatusLabel>
              <StatusValue>{process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '❌ No configurado'}</StatusValue>
            </StatusItem>
            <StatusItem>
              <StatusLabel>Public Key:</StatusLabel>
              <StatusValue>{process.env.REACT_APP_EMAILJS_PUBLIC_KEY ? '✅ Configurado' : '❌ No configurado'}</StatusValue>
            </StatusItem>
          </StatusList>
        </ConfigStatus>
      </TestCard>
    </TestContainer>
  );
};

export default TestEmail;

// ===== Styled Components =====

const TestContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TestCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  max-width: 800px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const TestHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
`;

const TestTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TestSubtitle = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  font-family: 'Onest', sans-serif;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Onest', sans-serif;
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TestButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Onest', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResultContainer = styled.div`
  background: ${props => props.$success ? '#f0fdf4' : '#fef2f2'};
  border: 2px solid ${props => props.$success ? '#86efac' : '#fecaca'};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ResultIcon = styled.div`
  font-size: 2rem;
  flex-shrink: 0;
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultTitle = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-family: 'Onest', sans-serif;
`;

const ResultMessage = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0 0 0.5rem 0;
  font-family: 'Onest', sans-serif;
`;

const ErrorDetails = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #dc2626;
  font-family: 'Courier New', monospace;
  word-break: break-word;
`;

const SuccessDetails = styled.div`
  background: white;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #059669;
  font-family: 'Onest', sans-serif;
`;

const InfoBox = styled.div`
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.75rem;
  font-family: 'Onest', sans-serif;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  font-size: 0.9rem;
  color: #1e40af;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  font-family: 'Onest', sans-serif;

  &:before {
    content: '•';
    position: absolute;
    left: 0.5rem;
  }

  &:last-child {
    margin-bottom: 0;
  }

  code {
    background: white;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.85rem;
    font-family: 'Courier New', monospace;
  }
`;

const ConfigStatus = styled.div`
  background: #fefce8;
  border: 1px solid #fde68a;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
`;

const StatusTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: #92400e;
  margin-bottom: 1rem;
  font-family: 'Onest', sans-serif;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Onest', sans-serif;
`;

const StatusLabel = styled.span`
  font-size: 0.9rem;
  color: #92400e;
  font-weight: 500;
`;

const StatusValue = styled.span`
  font-size: 0.9rem;
  color: #1f2937;
  font-family: 'Courier New', monospace;
`;

