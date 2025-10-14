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
 * Envía un email con los datos del cliente después de un pago exitoso
 * @param {Object} paymentData - Datos del pago de MercadoPago
 * @param {Object} clientData - Datos del cliente del formulario
 * @param {Object} planData - Datos del plan seleccionado
 */
/**
 * Envía un email cuando el cliente hace clic en "Continuar con el pago"
 * NO después del pago - esto es antes del checkout
 */
export const sendClientContactEmail = async (clientData, planData) => {
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
      
      // Email de destino (siempre a maquiponce96@gmail.com)
      to_email: 'maquiponce96@gmail.com',
      
      // Fecha y hora del contacto
      contact_date: new Date().toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // Información adicional
      website_url: window.location.origin,
      subject: `Nuevo cliente interesado - ${clientData.nombre} - ${planData.title}`
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

// Mantener esta función para compatibilidad, pero ya no se usa después del pago
export const sendPaymentSuccessEmail = sendClientContactEmail;

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
 * Función para obtener los datos del cliente y plan desde el localStorage o sessionStorage
 * (útil en la página de éxito cuando no tenemos acceso directo a los datos)
 */
export const getStoredPaymentData = () => {
  try {
    const clientData = JSON.parse(sessionStorage.getItem('maquifit_client_data') || '{}');
    const planData = JSON.parse(sessionStorage.getItem('maquifit_plan_data') || '{}');
    
    return {
      clientData,
      planData,
      hasData: Object.keys(clientData).length > 0 && Object.keys(planData).length > 0
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
 */
export const storePaymentData = (clientData, planData) => {
  try {
    sessionStorage.setItem('maquifit_client_data', JSON.stringify(clientData));
    sessionStorage.setItem('maquifit_plan_data', JSON.stringify(planData));
    console.log('💾 Datos almacenados para el email:', { clientData, planData });
  } catch (error) {
    console.error('Error almacenando datos:', error);
  }
};

/**
 * Función para limpiar los datos almacenados después del envío del email
 */
export const clearStoredPaymentData = () => {
  try {
    sessionStorage.removeItem('maquifit_client_data');
    sessionStorage.removeItem('maquifit_plan_data');
    console.log('🧹 Datos de pago limpiados del storage');
  } catch (error) {
    console.error('Error limpiando datos:', error);
  }
};
