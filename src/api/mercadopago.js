// API para manejar las preferencias de MercadoPago
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configurar MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc'
  }
});

// Función para crear una preferencia de pago
export const createPreference = async (preferenceData) => {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: preferenceData
    });

    console.log('Preferencia creada:', result);
    return result;

  } catch (error) {
    console.error('Error creando preferencia:', error);
    throw error;
  }
};

// Función para obtener información de un pago
export const getPaymentInfo = async (paymentId) => {
  try {
    const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_MERCADOPAGO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error obteniendo información del pago:', error);
    throw error;
  }
};

// Función simulada para desarrollo/testing (cuando no hay backend)
export const createPreferenceSimulated = async (preferenceData) => {
  try {
    console.log('🧪 MODO SIMULADO - Creando preferencia:', preferenceData);
    
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Generar ID simulado
    const simulatedId = `TEST-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    const simulatedResponse = {
      id: simulatedId,
      init_point: `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${simulatedId}`,
      sandbox_init_point: `https://sandbox.mercadopago.com.ar/checkout/v1/redirect?pref_id=${simulatedId}`,
      date_created: new Date().toISOString(),
      items: preferenceData.items,
      payer: preferenceData.payer,
      back_urls: preferenceData.back_urls,
      auto_return: preferenceData.auto_return,
      external_reference: preferenceData.external_reference
    };

    console.log('✅ Preferencia simulada creada:', simulatedResponse);
    return simulatedResponse;

  } catch (error) {
    console.error('❌ Error en simulación:', error);
    throw error;
  }
};
