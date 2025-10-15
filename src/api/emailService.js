// Servicio para envío de emails después del pago exitoso
import emailjs from '@emailjs/browser';

// Configuración de EmailJS
const EMAIL_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_maquifit';
const EMAIL_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_payment_success';
const EMAIL_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key_here';

console.log('🔧 EmailJS Config COMPLETA:', {
  serviceId: EMAIL_SERVICE_ID,
  templateId: EMAIL_TEMPLATE_ID,
  publicKey: EMAIL_PUBLIC_KEY,
  publicKeyLength: EMAIL_PUBLIC_KEY?.length
});

// Hacer las variables globales para poder verificarlas en la consola (solo para debug)
window.DEBUG_EMAILJS_CONFIG = {
  serviceId: EMAIL_SERVICE_ID,
  templateId: EMAIL_TEMPLATE_ID,
  publicKey: EMAIL_PUBLIC_KEY,
  hasEnvFile: EMAIL_PUBLIC_KEY !== 'your_public_key_here'
};

console.log('💡 Para ver la config en consola, escribe: window.DEBUG_EMAILJS_CONFIG');

// Inicializar EmailJS
if (!EMAIL_PUBLIC_KEY || EMAIL_PUBLIC_KEY === 'your_public_key_here') {
  console.error('❌ PUBLIC KEY NO CONFIGURADA o es el valor por defecto!');
  console.error('❌ Verifica tu archivo .env');
  console.error('❌ La Public Key actual es:', EMAIL_PUBLIC_KEY);
} else {
  emailjs.init(EMAIL_PUBLIC_KEY);
  console.log('✅ EmailJS inicializado correctamente');
}

/**
 * Envía un email con los datos del cliente DESPUÉS de un pago exitoso
 * @param {Object} paymentData - Datos del pago de MercadoPago (opcional)
 * @param {Object} clientData - Datos del cliente del formulario
 * @param {Object} planData - Datos del plan seleccionado
 */
export const sendPaymentSuccessEmail = async (paymentData, clientData, planData) => {
  try {
    console.log('📧 Iniciando envío de email de contacto...');
    console.log('📧 Config EmailJS:', { 
      serviceId: EMAIL_SERVICE_ID, 
      templateId: EMAIL_TEMPLATE_ID,
      publicKeySet: !!EMAIL_PUBLIC_KEY 
    });
    console.log('📧 Datos recibidos:', {
      clientData,
      planData
    });
    
    // Preparar los datos para el template de email
    const templateParams = {
      // Datos del cliente
      client_name: clientData.nombre || 'Cliente',
      client_email: clientData.mail || 'No proporcionado',
      client_phone: clientData.telefono || 'No proporcionado',
      
      // Datos del plan
      plan_title: planData.title || 'Plan no especificado',
      plan_price: planData.price ? `$${planData.price.toLocaleString("es-AR")}` : 'Precio no disponible',
      plan_description: planData.highlight || planData.description || 'Sin descripción',
      
      // Datos del pago (si están disponibles)
      payment_id: paymentData?.paymentId || 'N/A',
      payment_status: paymentData?.status || 'approved',
      payment_reference: paymentData?.externalReference || 'N/A',
      merchant_order_id: paymentData?.merchantOrderId || 'N/A',
      
      // Email de destino (siempre a maquiponce96@gmail.com)
      to_email: 'maquiponce96@gmail.com',
      
      // Fecha y hora del pago
      payment_date: new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // Información adicional
      website_url: window.location.origin,
      subject: `💳 Pago Exitoso - ${clientData.nombre} - ${planData.title}`
    };

    console.log('📋 Template params preparados:', templateParams);
    console.log('📤 Enviando a EmailJS con:', {
      serviceId: EMAIL_SERVICE_ID,
      templateId: EMAIL_TEMPLATE_ID
    });

    // Enviar el email usando EmailJS
    const result = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Email enviado exitosamente!');
    console.log('✅ Resultado:', result);
    
    return {
      success: true,
      messageId: result.text,
      message: 'Email enviado correctamente'
    };

  } catch (error) {
    console.error('❌ ERROR COMPLETO enviando email:', {
      message: error.message,
      text: error.text,
      error: error
    });
    
    // No lanzar error para no interrumpir el flujo del usuario
    return {
      success: false,
      error: error.message || error.text || 'Error desconocido',
      message: 'No se pudo enviar el email de confirmación'
    };
  }
};

/**
 * Función alternativa usando fetch para enviar email a través de un servicio web
 * (por si prefieres usar otro servicio como Formspree, Netlify Forms, etc.)
 */
export const sendPaymentEmailAlternative = async (paymentData, clientData, planData) => {
  try {
    console.log('📧 Enviando email alternativo...');
    
    const emailData = {
      to: 'teochiapps@gmail.com',
      subject: `Nuevo pago recibido - ${clientData.nombre} - ${planData.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #C58ADA 0%, #9DC6DA 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Nuevo Pago Recibido</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Maquifit - Sistema de Pagos</p>
          </div>
          
          <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">📋 Datos del Cliente</h2>
            <p><strong>Nombre:</strong> ${clientData.nombre}</p>
            <p><strong>Email:</strong> ${clientData.mail}</p>
            <p><strong>Teléfono:</strong> ${clientData.telefono}</p>
          </div>
          
          <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #0369a1; margin-top: 0;">💪 Plan Adquirido</h2>
            <p><strong>Plan:</strong> ${planData.title}</p>
            <p><strong>Precio:</strong> $${planData.price?.toLocaleString("es-AR")}</p>
            <p><strong>Descripción:</strong> ${planData.description}</p>
          </div>
          
          <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #166534; margin-top: 0;">💳 Detalles del Pago</h2>
            <p><strong>ID de Pago:</strong> ${paymentData.paymentId}</p>
            <p><strong>Estado:</strong> ${paymentData.status}</p>
            <p><strong>Referencia:</strong> ${paymentData.externalReference}</p>
            <p><strong>Order ID:</strong> ${paymentData.merchantOrderId}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-AR', {
              year: 'numeric',
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
          
          <div style="text-align: center; padding: 20px; background: #fef7ff; border-radius: 8px;">
            <p style="margin: 0; color: #7c3aed; font-size: 16px;">
              <strong>¡Contacta al cliente para continuar con su entrenamiento personalizado!</strong>
            </p>
          </div>
        </div>
      `
    };

    // Aquí puedes usar el servicio de email que prefieras
    // Por ejemplo, Formspree:
    // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(emailData)
    // });

    console.log('📧 Email preparado:', emailData);
    
    return {
      success: true,
      message: 'Email preparado (implementar servicio)'
    };

  } catch (error) {
    console.error('❌ Error preparando email alternativo:', error);
    return {
      success: false,
      error: error.message,
      message: 'Error preparando email alternativo'
    };
  }
};

/**
 * Función para obtener los datos del cliente y plan desde localStorage Y sessionStorage
 * (útil en la página de éxito cuando no tenemos acceso directo a los datos)
 * Intenta primero con localStorage (más persistente) y luego con sessionStorage
 */
export const getStoredPaymentData = () => {
  try {
    console.log('🔍 Intentando obtener datos de localStorage...');
    
    // Intentar primero con localStorage (más persistente durante redirecciones)
    let clientData = JSON.parse(localStorage.getItem('maquifit_client_data') || '{}');
    let planData = JSON.parse(localStorage.getItem('maquifit_plan_data') || '{}');
    
    let hasDataInLocalStorage = Object.keys(clientData).length > 0 && Object.keys(planData).length > 0;
    
    if (hasDataInLocalStorage) {
      console.log('✅ Datos encontrados en localStorage');
      return { clientData, planData, hasData: true };
    }
    
    // Si no hay datos en localStorage, intentar con sessionStorage
    console.log('⚠️ No hay datos en localStorage, intentando sessionStorage...');
    clientData = JSON.parse(sessionStorage.getItem('maquifit_client_data') || '{}');
    planData = JSON.parse(sessionStorage.getItem('maquifit_plan_data') || '{}');
    
    const hasDataInSessionStorage = Object.keys(clientData).length > 0 && Object.keys(planData).length > 0;
    
    if (hasDataInSessionStorage) {
      console.log('✅ Datos encontrados en sessionStorage');
      return { clientData, planData, hasData: true };
    }
    
    console.log('❌ No se encontraron datos en ningún storage');
    return {
      clientData: {},
      planData: {},
      hasData: false
    };
  } catch (error) {
    console.error('Error obteniendo datos almacenados:', error);
    return {
      clientData: {},
      planData: {},
      hasData: false
    };
  }
};

/**
 * Función para almacenar los datos del cliente y plan antes del pago
 * Guarda en AMBOS: localStorage (más persistente) Y sessionStorage (backup)
 */
export const storePaymentData = (clientData, planData) => {
  try {
    console.log('💾 Guardando datos en localStorage y sessionStorage...');
    
    // Guardar en localStorage (más persistente durante redirecciones externas)
    localStorage.setItem('maquifit_client_data', JSON.stringify(clientData));
    localStorage.setItem('maquifit_plan_data', JSON.stringify(planData));
    
    // También guardar en sessionStorage como backup
    sessionStorage.setItem('maquifit_client_data', JSON.stringify(clientData));
    sessionStorage.setItem('maquifit_plan_data', JSON.stringify(planData));
    
    console.log('✅ Datos almacenados en AMBOS storages:', { clientData, planData });
    console.log('✅ localStorage:', {
      client: localStorage.getItem('maquifit_client_data'),
      plan: localStorage.getItem('maquifit_plan_data')
    });
    console.log('✅ sessionStorage:', {
      client: sessionStorage.getItem('maquifit_client_data'),
      plan: sessionStorage.getItem('maquifit_plan_data')
    });
  } catch (error) {
    console.error('❌ Error almacenando datos:', error);
  }
};

/**
 * Función para limpiar los datos almacenados después del envío del email
 * Limpia AMBOS: localStorage Y sessionStorage
 */
export const clearStoredPaymentData = () => {
  try {
    // Limpiar localStorage
    localStorage.removeItem('maquifit_client_data');
    localStorage.removeItem('maquifit_plan_data');
    
    // Limpiar sessionStorage
    sessionStorage.removeItem('maquifit_client_data');
    sessionStorage.removeItem('maquifit_plan_data');
    
    console.log('🧹 Datos de pago limpiados de AMBOS storages');
  } catch (error) {
    console.error('Error limpiando datos:', error);
  }
};

/**
 * 🧪 FUNCIÓN DE TESTING - Para probar el envío de emails desde la consola
 * Llama esta función desde la consola del navegador:
 * window.testEmail()
 */
export const testEmailFunction = async () => {
  console.log('🧪 Iniciando test de email...');
  
  // Datos de prueba
  const testPaymentData = {
    paymentId: '1234567890',
    status: 'approved',
    externalReference: 'plan_2_1729000000000',
    merchantOrderId: '9876543210'
  };
  
  const testClientData = {
    nombre: 'Juan Pérez (TEST)',
    mail: 'test@example.com',
    telefono: '1234567890'
  };
  
  const testPlanData = {
    id: 2,
    title: 'Plan Premium (TEST)',
    price: 15000,
    description: 'Plan de prueba',
    highlight: 'Entrenamiento personalizado 3x semana'
  };
  
  console.log('📋 Datos de prueba:', {
    payment: testPaymentData,
    client: testClientData,
    plan: testPlanData
  });
  
  // Enviar email de prueba
  const result = await sendPaymentSuccessEmail(testPaymentData, testClientData, testPlanData);
  
  if (result.success) {
    console.log('✅ ¡Email de prueba enviado exitosamente!');
    console.log('📧 Revisa tu bandeja de entrada en:', 'maquiponce96@gmail.com');
  } else {
    console.error('❌ Error enviando email de prueba:', result.message);
  }
  
  return result;
};

// Exponer la función de testing globalmente para poder usarla desde la consola
if (typeof window !== 'undefined') {
  window.testEmail = testEmailFunction;
  console.log('🧪 Función de testing disponible! Usa: window.testEmail()');
}
