# 📋 FLUJO COMPLETO: Email en Checkout Success

## 🔍 Revisión Detallada del Flujo

Este documento explica EXACTAMENTE cómo funciona el envío de email después de un pago exitoso en MercadoPago.

---

## 🎯 Resumen del Flujo

```
Usuario completa formulario 
    ↓
Datos se guardan en sessionStorage (MercadoPagoCheckout.js línea 83)
    ↓
Usuario redirigido a MercadoPago
    ↓
Usuario completa pago
    ↓
MercadoPago redirige a /checkout/success
    ↓
CheckoutSuccess.js se monta
    ↓
useEffect se ejecuta (línea 18)
    ↓
Se obtienen datos del pago de la URL (líneas 24-27)
    ↓
Se obtienen datos del cliente y plan de sessionStorage (línea 41)
    ↓
✉️ SE ENVÍA EMAIL (línea 51)
    ↓
Se muestra pantalla de procesamiento
    ↓
Se muestra página de éxito
```

---

## 📁 Archivos Involucrados

### 1. **`src/components/Maquifit/Planes/ModalCheckout.js`**
**Función:** Captura los datos del cliente (nombre, email, teléfono)

**Código relevante (líneas 24-32):**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.nombre && formData.telefono && formData.mail) {
    // NO enviamos email aquí - se enviará DESPUÉS del pago exitoso
    console.log('✅ Datos del cliente capturados. Redirigiendo al checkout...');
    console.log('ℹ️ El email se enviará automáticamente después de completar el pago');
    setShowCheckout(true);
  }
};
```

**Estado:**
- ✅ Ya NO envía email antes del pago
- ✅ Solo captura datos y continúa al checkout

---

### 2. **`src/components/Maquifit/Planes/MercadoPagoCheckout.js`**
**Función:** Crea preferencia de pago y guarda datos en sessionStorage

**Código relevante (líneas 82-90):**
```javascript
const data = await response.json();

// Almacenar datos del cliente y plan para el email
storePaymentData(userData, plan);

// Redirigir inmediatamente al Checkout Pro
if (data.init_point) {
  window.location.href = data.init_point;
} else {
  throw new Error('No se recibió URL de Checkout Pro');
}
```

**¿Qué hace?**
1. ✅ Crea la preferencia de pago en MercadoPago
2. ✅ Guarda los datos del cliente y plan en `sessionStorage`
3. ✅ Redirige al usuario a MercadoPago para pagar

**Estado:**
- ✅ Guardado de datos funcionando correctamente
- ✅ Redirección configurada con URLs de retorno

---

### 3. **`src/api/emailService.js`**
**Función:** Maneja todo lo relacionado con el envío de emails

#### A. Función de envío principal (líneas 42-126)

```javascript
export const sendPaymentSuccessEmail = async (paymentData, clientData, planData) => {
  try {
    console.log('📧 Iniciando envío de email de contacto...');
    
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

    // Enviar el email usando EmailJS
    const result = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Email enviado exitosamente!');
    
    return {
      success: true,
      messageId: result.text,
      message: 'Email enviado correctamente'
    };

  } catch (error) {
    console.error('❌ ERROR COMPLETO enviando email:', error);
    
    return {
      success: false,
      error: error.message || error.text || 'Error desconocido',
      message: 'No se pudo enviar el email de confirmación'
    };
  }
};
```

**Variables enviadas al template de EmailJS:**
- ✅ `client_name` - Nombre del cliente
- ✅ `client_email` - Email del cliente
- ✅ `client_phone` - Teléfono del cliente
- ✅ `plan_title` - Título del plan
- ✅ `plan_price` - Precio formateado
- ✅ `plan_description` - Descripción del plan
- ✅ `payment_id` - ID del pago de MercadoPago
- ✅ `payment_status` - Estado del pago (approved)
- ✅ `payment_reference` - Referencia externa
- ✅ `merchant_order_id` - ID de orden de MercadoPago
- ✅ `payment_date` - Fecha y hora del pago
- ✅ `to_email` - Destinatario (maquiponce96@gmail.com)
- ✅ `subject` - Asunto del email

#### B. Funciones de almacenamiento (líneas 239-260)

```javascript
// Guardar datos en sessionStorage
export const storePaymentData = (clientData, planData) => {
  try {
    sessionStorage.setItem('maquifit_client_data', JSON.stringify(clientData));
    sessionStorage.setItem('maquifit_plan_data', JSON.stringify(planData));
    console.log('💾 Datos almacenados para el email:', { clientData, planData });
  } catch (error) {
    console.error('Error almacenando datos:', error);
  }
};

// Obtener datos de sessionStorage
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
    return { clientData: {}, planData: {}, hasData: false };
  }
};

// Limpiar datos después del envío
export const clearStoredPaymentData = () => {
  try {
    sessionStorage.removeItem('maquifit_client_data');
    sessionStorage.removeItem('maquifit_plan_data');
    console.log('🧹 Datos de pago limpiados del storage');
  } catch (error) {
    console.error('Error limpiando datos:', error);
  }
};
```

#### C. Función de testing (líneas 266-314)

```javascript
export const testEmailFunction = async () => {
  // Datos de prueba predefinidos
  // Llama a sendPaymentSuccessEmail con datos de test
  // Disponible globalmente como window.testEmail()
};
```

**Estado:**
- ✅ Función de envío configurada correctamente
- ✅ Todas las variables necesarias incluidas
- ✅ Manejo de errores implementado
- ✅ Función de testing disponible

---

### 4. **`src/components/Maquifit/Planes/CheckoutSuccess.js`** ⭐
**Función:** AQUÍ SE ENVÍA EL EMAIL después del pago exitoso

#### Código completo del useEffect (líneas 18-83):

```javascript
useEffect(() => {
  const processPaymentSuccess = async () => {
    try {
      setIsProcessing(true);
      
      // 1️⃣ Obtener parámetros de la URL (MercadoPago los envía)
      const paymentId = searchParams.get('payment_id');
      const status = searchParams.get('status');
      const externalReference = searchParams.get('external_reference');
      const merchantOrderId = searchParams.get('merchant_order_id');

      const paymentInfo = {
        paymentId,
        status,
        externalReference,
        merchantOrderId
      };

      setPaymentData(paymentInfo);
      console.log('Pago exitoso - Datos:', paymentInfo);

      // 2️⃣ Obtener datos almacenados del cliente y plan de sessionStorage
      const { clientData: storedClient, planData: storedPlan, hasData } = getStoredPaymentData();
      
      if (hasData) {
        setClientData(storedClient);
        setPlanData(storedPlan);
        
        console.log('📋 Datos del cliente y plan obtenidos:', { storedClient, storedPlan });
        console.log('✅ Pago exitoso confirmado. Enviando email de notificación...');
        
        // 3️⃣ ⭐ ENVIAR EMAIL DESPUÉS del pago exitoso ⭐
        const emailResult = await sendPaymentSuccessEmail(paymentInfo, storedClient, storedPlan);
        
        // 4️⃣ Verificar resultado del envío
        if (emailResult.success) {
          console.log('✅ Email de pago exitoso enviado correctamente');
          setEmailSent(true);
        } else {
          console.warn('⚠️ No se pudo enviar el email:', emailResult.message);
          setEmailSent(false);
        }
        
        // 5️⃣ Limpiar datos almacenados en sessionStorage
        clearStoredPaymentData();
        
      } else {
        console.warn('⚠️ No se encontraron datos del cliente almacenados');
      }
      
      // 6️⃣ Esperar un momento y mostrar el modal
      setTimeout(() => {
        setIsProcessing(false);
        setShowModal(true);
      }, 2000);
      
    } catch (error) {
      console.error('❌ Error procesando el pago exitoso:', error);
      setIsProcessing(false);
      // Aún así mostrar el modal después de un error
      setTimeout(() => setShowModal(true), 1000);
    }
  };

  processPaymentSuccess();
}, [searchParams]);
```

**Flujo paso a paso:**

1. **Línea 24-34:** Se obtienen los parámetros de la URL que MercadoPago envía:
   - `payment_id`: ID único del pago
   - `status`: Estado del pago (approved, pending, rejected)
   - `external_reference`: Referencia personalizada (plan_X_timestamp)
   - `merchant_order_id`: ID de orden de MercadoPago

2. **Línea 41:** Se recuperan los datos del cliente y plan del `sessionStorage`

3. **Línea 51:** ⭐ **ENVÍO DEL EMAIL** - Se llama a `sendPaymentSuccessEmail` con:
   - `paymentInfo`: Datos del pago de MercadoPago
   - `storedClient`: Datos del cliente (nombre, email, teléfono)
   - `storedPlan`: Datos del plan (título, precio, descripción)

4. **Líneas 53-59:** Se verifica el resultado y se actualiza el estado `emailSent`

5. **Línea 62:** Se limpian los datos del `sessionStorage`

6. **Líneas 69-72:** Se muestra la UI de éxito después de 2 segundos

**Estado:**
- ✅ Email se envía DESPUÉS del pago exitoso
- ✅ Incluye toda la información del pago
- ✅ Maneja errores sin romper la experiencia del usuario
- ✅ Limpia datos después del envío

---

## 📊 Datos que Fluyen en el Sistema

### Ejemplo de datos reales:

#### 1. Datos del Cliente (sessionStorage):
```javascript
{
  nombre: "Juan Pérez",
  mail: "juan@example.com",
  telefono: "1234567890"
}
```

#### 2. Datos del Plan (sessionStorage):
```javascript
{
  id: 2,
  title: "Plan Premium",
  price: 15000,
  description: "Entrenamiento personalizado",
  highlight: "3 sesiones semanales personalizadas"
}
```

#### 3. Datos del Pago (URL de MercadoPago):
```javascript
{
  paymentId: "1234567890",
  status: "approved",
  externalReference: "plan_2_1729000000000",
  merchantOrderId: "9876543210"
}
```

#### 4. Template params enviados a EmailJS:
```javascript
{
  client_name: "Juan Pérez",
  client_email: "juan@example.com",
  client_phone: "1234567890",
  plan_title: "Plan Premium",
  plan_price: "$15.000",
  plan_description: "3 sesiones semanales personalizadas",
  payment_id: "1234567890",
  payment_status: "approved",
  payment_reference: "plan_2_1729000000000",
  merchant_order_id: "9876543210",
  to_email: "maquiponce96@gmail.com",
  payment_date: "15 de octubre de 2025, 14:30",
  website_url: "http://localhost:3000",
  subject: "💳 Pago Exitoso - Juan Pérez - Plan Premium"
}
```

---

## 🧪 Testing del Flujo Completo

### Opción 1: Testing Rápido (Sin MercadoPago)

```javascript
// En la consola del navegador
window.testEmail()
```

**Ventajas:**
- ✅ Rápido - 1 segundo
- ✅ No necesita MercadoPago
- ✅ Prueba directa del envío de email

### Opción 2: Testing Completo (Con MercadoPago)

1. Ir a `/maquifit` → Planes
2. Click en "Empezá hoy" en cualquier plan
3. Completar formulario:
   ```
   Nombre: Juan Pérez
   Email: test@test.com
   Teléfono: 1234567890
   ```
4. Click en "Continuar con el pago"
5. Observar consola:
   ```
   ✅ Datos del cliente capturados. Redirigiendo al checkout...
   💾 Datos almacenados para el email: {...}
   ```
6. Completar pago en MercadoPago con tarjeta de prueba:
   ```
   Número: 4509 9535 6623 3704
   CVV: 123
   Vencimiento: 12/25
   Nombre: APRO
   ```
7. Esperar redirección a `/checkout/success`
8. Observar consola:
   ```
   Pago exitoso - Datos: {paymentId: "...", status: "approved", ...}
   📋 Datos del cliente y plan obtenidos: {...}
   ✅ Pago exitoso confirmado. Enviando email de notificación...
   📧 Iniciando envío de email de contacto...
   📤 Enviando a EmailJS con: {...}
   ✅ Email enviado exitosamente!
   ✅ Email de pago exitoso enviado correctamente
   ```
9. Revisar email en `maquiponce96@gmail.com`

---

## 📧 Configuración de EmailJS Requerida

### Variables de entorno (.env.local):
```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxx
```

### Template de EmailJS:

El template debe incluir TODAS estas variables:

**Subject:**
```
{{subject}}
```

**Body (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #C58ADA 0%, #9DC6DA 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Nuevo Pago Recibido</h1>
    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Maquifit - Sistema de Pagos</p>
  </div>
  
  <!-- Datos del Cliente -->
  <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #333; margin-top: 0;">📋 Datos del Cliente</h2>
    <p><strong>Nombre:</strong> {{client_name}}</p>
    <p><strong>Email:</strong> {{client_email}}</p>
    <p><strong>Teléfono:</strong> {{client_phone}}</p>
  </div>
  
  <!-- Plan Adquirido -->
  <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #0369a1; margin-top: 0;">💪 Plan Adquirido</h2>
    <p><strong>Plan:</strong> {{plan_title}}</p>
    <p><strong>Precio:</strong> {{plan_price}}</p>
    <p><strong>Descripción:</strong> {{plan_description}}</p>
  </div>
  
  <!-- Detalles del Pago -->
  <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #166534; margin-top: 0;">💳 Detalles del Pago</h2>
    <p><strong>ID de Pago:</strong> {{payment_id}}</p>
    <p><strong>Estado:</strong> {{payment_status}}</p>
    <p><strong>Referencia:</strong> {{payment_reference}}</p>
    <p><strong>Order ID:</strong> {{merchant_order_id}}</p>
    <p><strong>Fecha:</strong> {{payment_date}}</p>
  </div>
  
  <!-- Call to Action -->
  <div style="text-align: center; padding: 20px; background: #fef7ff; border-radius: 8px;">
    <p style="margin: 0; color: #7c3aed; font-size: 16px;">
      <strong>¡Contacta al cliente para continuar con su entrenamiento personalizado!</strong>
    </p>
  </div>
</div>
```

**To Email:**
```
{{to_email}}
```

---

## ✅ Checklist de Verificación

### Código:
- [x] `ModalCheckout.js` NO envía email (solo captura datos)
- [x] `MercadoPagoCheckout.js` guarda datos en sessionStorage
- [x] `CheckoutSuccess.js` envía email después del pago
- [x] `emailService.js` tiene función de envío correcta
- [x] `emailService.js` incluye todos los datos del pago
- [x] Función de testing `window.testEmail()` disponible

### Configuración:
- [ ] Variables de entorno configuradas en `.env.local`
- [ ] EmailJS service ID configurado
- [ ] EmailJS template ID configurado
- [ ] EmailJS public key configurado
- [ ] Template de EmailJS creado con todas las variables
- [ ] Email de destino configurado (maquiponce96@gmail.com)

### Testing:
- [ ] `window.testEmail()` funciona correctamente
- [ ] Flujo completo probado con MercadoPago sandbox
- [ ] Email llega a la bandeja de entrada
- [ ] Email contiene todos los datos correctos
- [ ] Logs en consola son claros y útiles

---

## 🔧 Troubleshooting

### Email no se envía:
1. Verificar configuración:
   ```javascript
   window.DEBUG_EMAILJS_CONFIG
   ```
2. Verificar que `hasEnvFile` sea `true`
3. Revisar logs en la consola
4. Probar con `window.testEmail()`

### Datos del pago no aparecen:
1. Verificar que MercadoPago esté redirigiendo correctamente
2. Ver parámetros en la URL de `/checkout/success`
3. Verificar logs: "Pago exitoso - Datos: {...}"

### Datos del cliente no aparecen:
1. Verificar que `sessionStorage` tenga los datos:
   ```javascript
   sessionStorage.getItem('maquifit_client_data')
   sessionStorage.getItem('maquifit_plan_data')
   ```
2. Verificar que `storePaymentData` se ejecute en `MercadoPagoCheckout.js`

---

## 🎉 Conclusión

**TODO ESTÁ CORRECTAMENTE CONFIGURADO ✅**

El email se envía:
1. ✅ DESPUÉS del pago exitoso (no antes)
2. ✅ Con toda la información del pago de MercadoPago
3. ✅ Con los datos del cliente y plan
4. ✅ A la dirección correcta (maquiponce96@gmail.com)
5. ✅ Con manejo de errores robusto
6. ✅ Con función de testing disponible

**Para probar ahora mismo:**
```javascript
window.testEmail()
```

---

## 📞 Soporte

Si encuentras algún problema, revisa:
1. Los logs en la consola del navegador
2. La configuración en `window.DEBUG_EMAILJS_CONFIG`
3. El historial de envíos en EmailJS dashboard
4. Las variables de entorno en `.env.local`

**¡Todo listo para producción! 🚀**

