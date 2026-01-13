// Servicio para guardar y recuperar datos de pago en Strapi

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:1337';

/**
 * Guarda los datos del cliente y plan en Strapi ANTES de ir a MercadoPago
 * @param {string} externalReference - Referencia única del pago
 * @param {Object} clientData - Datos del cliente
 * @param {Object} planData - Datos del plan
 */
export const guardarDatosEnStrapi = async (externalReference, clientData, planData) => {
  try {
    console.log('💾 Guardando datos en Strapi...');
    console.log('📋 External reference:', externalReference);
    console.log('📋 Client data:', clientData);
    console.log('📋 Plan data:', planData);
    
    const response = await fetch(`${STRAPI_URL}/api/pagos-pendientes/guardar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_reference: externalReference,
        client_data: clientData,
        plan_data: planData
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Datos guardados en Strapi:', result);
    
    return {
      success: true,
      data: result.data,
      message: 'Datos guardados en Strapi correctamente'
    };
    
  } catch (error) {
    console.error('❌ Error guardando datos en Strapi:', error);
    
    // NO lanzar error para no interrumpir el flujo del usuario
    return {
      success: false,
      error: error.message,
      message: 'No se pudieron guardar los datos en Strapi'
    };
  }
};

/**
 * Recupera los datos del pago desde Strapi usando el external_reference
 * @param {string} externalReference - Referencia única del pago
 */
export const recuperarDatosDeStrapi = async (externalReference) => {
  try {
    console.log('🔍 Recuperando datos de Strapi...');
    console.log('📋 External reference:', externalReference);
    
    const response = await fetch(`${STRAPI_URL}/api/pagos-pendientes/recuperar/${externalReference}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log('⚠️ No se encontraron datos en Strapi');
        return {
          success: false,
          hasData: false,
          message: 'No se encontraron datos'
        };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Datos recuperados de Strapi:', result);
    
    return {
      success: true,
      hasData: true,
      clientData: result.data.clientData,
      planData: result.data.planData,
      message: 'Datos recuperados correctamente'
    };
    
  } catch (error) {
    console.error('❌ Error recuperando datos de Strapi:', error);
    
    return {
      success: false,
      hasData: false,
      error: error.message,
      message: 'No se pudieron recuperar los datos de Strapi'
    };
  }
};

/**
 * Actualiza el estado del pago después de que MercadoPago procesa el pago
 * @param {string} externalReference - Referencia única del pago
 * @param {Object} paymentData - Datos del pago de MercadoPago
 * @param {boolean} emailSent - Si el email fue enviado
 */
export const actualizarEstadoPagoEnStrapi = async (externalReference, paymentData, emailSent = false) => {
  try {
    console.log('🔄 Actualizando estado en Strapi...');
    
    const response = await fetch(`${STRAPI_URL}/api/pagos-pendientes/actualizar-pago`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        external_reference: externalReference,
        payment_id: paymentData.paymentId,
        payment_status: paymentData.status,
        merchant_order_id: paymentData.merchantOrderId,
        email_sent: emailSent
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    console.log('✅ Estado actualizado en Strapi:', result);
    
    return {
      success: true,
      message: 'Estado actualizado correctamente'
    };
    
  } catch (error) {
    console.error('❌ Error actualizando estado en Strapi:', error);
    
    return {
      success: false,
      error: error.message,
      message: 'No se pudo actualizar el estado'
    };
  }
};

