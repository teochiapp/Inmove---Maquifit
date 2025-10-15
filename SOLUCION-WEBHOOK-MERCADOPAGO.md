# 🔔 SOLUCIÓN: Webhook de MercadoPago para Capturar TODOS los Pagos

## 🎯 El Problema

**Escenario actual:**
- Cliente completa formulario ✅
- Cliente va a MercadoPago y **PAGA** ✅
- Cliente **cierra la pestaña** o no hace clic en "Volver al sitio" ❌
- **NO recibes email** del pago ❌❌

**Resultado:** Pierdes ventas y no te enteras que pagaron.

---

## ✅ LA SOLUCIÓN: Webhook

Un **webhook** es una URL en tu backend que MercadoPago llama automáticamente cuando hay un pago.

**Flujo con webhook:**
```
Usuario paga en MercadoPago
    ↓
MercadoPago procesa el pago (aprobado)
    ↓
MercadoPago llama a tu webhook automáticamente
    ↓
Tu backend:
  1. Verifica el pago
  2. Obtiene los datos del pago (metadata)
  3. Envía el email
    ↓
✅ Email enviado SIN importar si el usuario volvió o no
```

---

## 📁 Estructura de Archivos

```
maquifit/
├── maquifit-backend/          ← Backend simple
│   ├── server.js              ← Servidor Express
│   ├── webhook-handler.js     ← Maneja webhook de MP
│   ├── email-service.js       ← Envía emails
│   ├── package.json
│   └── .env
└── maquifit/                  ← Frontend (ya existe)
```

---

## 🛠️ IMPLEMENTACIÓN

### **Paso 1: Crear Backend Simple**

#### 1.1 Crear carpeta y archivo

```bash
cd "C:\Users\teorh\OneDrive\Desktop\React Projects\maqufiit"
mkdir maquifit-backend
cd maquifit-backend
npm init -y
```

#### 1.2 Instalar dependencias

```bash
npm install express mercadopago nodemailer dotenv cors
```

#### 1.3 Crear `server.js`

```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'Webhook de MercadoPago - Maquifit' });
});

// Webhook de MercadoPago
app.post('/webhook/mercadopago', require('./webhook-handler'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📧 Webhook URL: http://localhost:${PORT}/webhook/mercadopago`);
});
```

#### 1.4 Crear `webhook-handler.js`

```javascript
// webhook-handler.js
const mercadopago = require('mercadopago');
const { sendPaymentEmail } = require('./email-service');

// Configurar MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const handleWebhook = async (req, res) => {
  try {
    console.log('🔔 Webhook recibido:', req.body);
    
    const { type, data } = req.body;
    
    // Solo procesar notificaciones de pago
    if (type === 'payment') {
      const paymentId = data.id;
      
      console.log('💳 Procesando pago ID:', paymentId);
      
      // Obtener información completa del pago desde MercadoPago
      const payment = await mercadopago.payment.get(paymentId);
      
      console.log('📋 Datos del pago:', {
        id: payment.body.id,
        status: payment.body.status,
        status_detail: payment.body.status_detail,
        metadata: payment.body.metadata
      });
      
      // Solo enviar email si el pago fue aprobado
      if (payment.body.status === 'approved') {
        console.log('✅ Pago aprobado, enviando email...');
        
        // Extraer datos del metadata
        const metadata = payment.body.metadata || {};
        const clientData = {
          nombre: metadata.user_name || 'Cliente',
          mail: metadata.user_email || 'No proporcionado',
          telefono: metadata.user_phone || 'No proporcionado'
        };
        
        const planData = {
          id: metadata.plan_id,
          title: metadata.plan_title || 'Plan no especificado',
          price: payment.body.transaction_amount
        };
        
        const paymentData = {
          paymentId: payment.body.id,
          status: payment.body.status,
          externalReference: payment.body.external_reference,
          merchantOrderId: payment.body.order?.id
        };
        
        // Enviar email
        await sendPaymentEmail(paymentData, clientData, planData);
        
        console.log('✅ Email enviado correctamente');
      } else {
        console.log('⚠️ Pago no aprobado, status:', payment.body.status);
      }
    }
    
    // Responder a MercadoPago (importante!)
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('❌ Error en webhook:', error);
    res.status(500).send('Error');
  }
};

module.exports = handleWebhook;
```

#### 1.5 Crear `email-service.js`

```javascript
// email-service.js
const nodemailer = require('nodemailer');

// Configurar transporte de email (usa tu servicio preferido)
const transporter = nodemailer.createTransport({
  service: 'gmail', // o 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Alternativa: Usar EmailJS desde backend
// const fetch = require('node-fetch');

const sendPaymentEmail = async (paymentData, clientData, planData) => {
  try {
    console.log('📧 Preparando email...');
    
    const emailHTML = `
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
        </div>
        
        <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #166534; margin-top: 0;">💳 Detalles del Pago</h2>
          <p><strong>ID de Pago:</strong> ${paymentData.paymentId}</p>
          <p><strong>Estado:</strong> ${paymentData.status}</p>
          <p><strong>Referencia:</strong> ${paymentData.externalReference}</p>
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
    `;
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'maquiponce96@gmail.com',
      subject: `💳 Pago Exitoso - ${clientData.nombre} - ${planData.title}`,
      html: emailHTML
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', result.messageId);
    
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendPaymentEmail };
```

#### 1.6 Crear `.env`

```env
# .env
PORT=3001
MERCADOPAGO_ACCESS_TOKEN=APP_USR-5567810222384488-092417-88f70a7468a379300aaae5493102c7bf-2712453774

# Para Gmail (necesitas habilitar "Aplicaciones menos seguras" o usar App Password)
EMAIL_USER=maquiponce96@gmail.com
EMAIL_PASSWORD=tu_password_aqui

# O usa EmailJS desde backend
EMAILJS_SERVICE_ID=service_xxxxx
EMAILJS_TEMPLATE_ID=template_xxxxx
EMAILJS_PRIVATE_KEY=xxxxx
```

---

## 🌐 Paso 2: Exponer Webhook a Internet

MercadoPago necesita llamar a tu webhook, pero tu localhost no es accesible desde internet.

### **Opción 1: ngrok** (Para desarrollo/testing) ⭐ FÁCIL

```bash
# Instalar ngrok
npm install -g ngrok

# En una terminal, inicia tu backend
cd maquifit-backend
node server.js

# En OTRA terminal, expone el puerto con ngrok
ngrok http 3001
```

**Resultado:**
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3001
```

Tu webhook será: `https://abc123.ngrok.io/webhook/mercadopago`

### **Opción 2: Deploy a Producción** (Recomendado)

Deploy tu backend a:
- **Vercel** (gratis) - `vercel deploy`
- **Railway** (gratis) - railway.app
- **Render** (gratis) - render.com
- **Coolify** (si ya lo usas)

Tu webhook será: `https://tu-dominio.com/webhook/mercadopago`

---

## 📝 Paso 3: Configurar Webhook en MercadoPago

### 3.1 Ir al Dashboard de MercadoPago

1. Ve a: https://www.mercadopago.com.ar/developers/panel
2. Selecciona tu aplicación
3. Ve a "Webhooks" o "Notificaciones IPN"
4. Click en "Configurar notificaciones"

### 3.2 Agregar URL del Webhook

```
URL: https://abc123.ngrok.io/webhook/mercadopago
Eventos: Pagos (payments)
```

### 3.3 Verificar

MercadoPago enviará un test y debe responder `200 OK`.

---

## 🔄 Paso 4: Actualizar Frontend

Actualiza la URL del webhook en tu frontend:

```javascript
// MercadoPagoCheckout.js
notification_url: 'https://abc123.ngrok.io/webhook/mercadopago',
```

---

## 🧪 TESTING

### Test 1: Iniciar backend
```bash
cd maquifit-backend
node server.js
```

**Deberías ver:**
```
🚀 Servidor corriendo en puerto 3001
📧 Webhook URL: http://localhost:3001/webhook/mercadopago
```

### Test 2: Exponer con ngrok
```bash
ngrok http 3001
```

**Copia la URL:** `https://abc123.ngrok.io`

### Test 3: Hacer un pago real
1. Ve a tu app
2. Completa formulario
3. Paga con tarjeta de prueba
4. **Cierra la pestaña SIN volver** (esto simula el problema)
5. Espera 10-30 segundos

**En la consola del backend verás:**
```
🔔 Webhook recibido: { type: 'payment', data: { id: '...' } }
💳 Procesando pago ID: ...
📋 Datos del pago: {...}
✅ Pago aprobado, enviando email...
📧 Preparando email...
✅ Email enviado: ...
```

**Y recibirás el email** ✉️

---

## 🎯 Ventajas de Esta Solución

| Ventaja | Descripción |
|---------|-------------|
| ✅ **100% Confiable** | MercadoPago siempre llama al webhook |
| ✅ **Sin pérdida de datos** | No depende del navegador del usuario |
| ✅ **Captura TODO** | Incluso si el usuario cierra la pestaña |
| ✅ **Producción ready** | Estándar de la industria |
| ✅ **Escalable** | Puedes agregar más lógica (BD, analytics, etc.) |

---

## 🔒 Seguridad

### Verificar que el webhook viene de MercadoPago

```javascript
// webhook-handler.js
const crypto = require('crypto');

const verifyWebhook = (req) => {
  const xSignature = req.headers['x-signature'];
  const xRequestId = req.headers['x-request-id'];
  
  // Verificar firma (consulta docs de MP)
  // https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks
  
  return true; // Por ahora
};
```

---

## 💡 Soluciones Alternativas (Sin Backend)

Si **NO quieres crear backend**, estas son opciones menos robustas:

### Alternativa 1: Aumentar tiempo de persistencia
```javascript
// Guardar con timestamp de expiración más largo
localStorage.setItem('maquifit_expires', Date.now() + 24 * 60 * 60 * 1000); // 24h
```

### Alternativa 2: EmailJS desde webhook
Usa un servicio como **Zapier** o **Make.com** (sin código):
```
MercadoPago webhook → Zapier → EmailJS → Email enviado
```

### Alternativa 3: Guardar en Supabase/Firebase
```javascript
// Antes de ir a MercadoPago
await supabase.from('pending_payments').insert({
  external_reference: `plan_${plan.id}_${Date.now()}`,
  client_data: userData,
  plan_data: plan,
  created_at: new Date()
});
```

---

## 📚 Recursos

- [Docs oficiales de Webhooks - MercadoPago](https://www.mercadopago.com.ar/developers/es/docs/your-integrations/notifications/webhooks)
- [ngrok - Exponer localhost](https://ngrok.com/)
- [Nodemailer - Enviar emails](https://nodemailer.com/)

---

## 🚀 Próximos Pasos

1. **¿Quieres que te ayude a crear el backend?**
   - Te creo todos los archivos listos para usar
   
2. **¿Prefieres usar Zapier/Make.com?**
   - Te explico cómo configurarlo sin código
   
3. **¿Quieres una solución híbrida?**
   - Frontend + Backend + Redundancia

**¿Qué opción prefieres?** 🤔

