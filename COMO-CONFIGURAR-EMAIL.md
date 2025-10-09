# 📧 Guía Rápida: Configurar Email Automático después del Pago

## ✅ Estado Actual
El sistema **YA ESTÁ IMPLEMENTADO** en el código. Solo necesitas configurar las credenciales de EmailJS.

## 📊 Progreso
- ✅ **Paso 1:** Cuenta de EmailJS creada
- ✅ **Paso 2:** Gmail conectado (`teochiapps@gmail.com`)
- ✅ **Service ID:** `service_2owznmm`
- ⚠️ **Pendiente:** Crear Email Template
- ⚠️ **Pendiente:** Obtener Public Key
- ⚠️ **Pendiente:** Configurar archivo `.env`

## 🚀 Configuración en 5 Pasos

### Paso 1: Crear cuenta en EmailJS ✅ COMPLETADO

1. ~~Ve a **https://www.emailjs.com/**~~
2. ~~Haz click en **"Sign Up"**~~
3. ~~Registrate con tu email~~
4. ~~Verifica tu email~~

**✅ Ya tienes tu cuenta creada y verificada**

### Paso 2: Conectar tu Email ✅ COMPLETADO

1. ~~En el dashboard, ve a **"Email Services"** (menú izquierdo)~~
2. ~~Click en **"Add New Service"~~
3. ~~Selecciona **"Gmail"** (o tu proveedor)~~
4. ~~Conecta tu cuenta de Gmail siguiendo las instrucciones~~
5. ✅ **Service ID obtenido:** `service_2owznmm`

**Ya tienes tu servicio de Gmail conectado como `teochiapps@gmail.com`**

### Paso 3: Crear Template de Email

1. Ve a **"Email Templates"**
2. Click en **"Create New Template"**
3. Copia y pega este código:

**Subject:**
```
Nuevo pago recibido - {{client_name}} - {{plan_title}}
```

**Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #C58ADA 0%, #9DC6DA 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Nuevo Pago Recibido</h1>
    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Maquifit - Sistema de Pagos</p>
  </div>
  
  <!-- Cliente -->
  <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #333; margin-top: 0;">📋 Datos del Cliente</h2>
    <p><strong>Nombre:</strong> {{client_name}}</p>
    <p><strong>Email:</strong> {{client_email}}</p>
    <p><strong>Teléfono:</strong> {{client_phone}}</p>
  </div>
  
  <!-- Plan -->
  <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #0369a1; margin-top: 0;">💪 Plan Adquirido</h2>
    <p><strong>Plan:</strong> {{plan_title}}</p>
    <p><strong>Precio:</strong> {{plan_price}}</p>
    <p><strong>Descripción:</strong> {{plan_description}}</p>
  </div>
  
  <!-- Pago -->
  <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #166534; margin-top: 0;">💳 Detalles del Pago</h2>
    <p><strong>ID de Pago:</strong> {{payment_id}}</p>
    <p><strong>Estado:</strong> {{payment_status}}</p>
    <p><strong>Referencia:</strong> {{payment_reference}}</p>
    <p><strong>Fecha:</strong> {{payment_date}}</p>
  </div>
  
  <!-- Acción -->
  <div style="text-align: center; padding: 20px; background: #fef7ff; border-radius: 8px;">
    <p style="margin: 0; color: #7c3aed; font-size: 16px;">
      <strong>¡Contacta al cliente para continuar con su entrenamiento personalizado!</strong>
    </p>
  </div>
</div>
```

4. En **"To Email"** configura: `{{to_email}}`
5. Guarda y anota el **Template ID** (ejemplo: `template_xyz789`)

### Paso 4: Obtener Public Key

1. Ve a **"Account"** en el menú
2. Busca la sección **"General"** > **"API Keys"**
3. Copia el **Public Key** (ejemplo: `12345abcde-XYZT`)

### Paso 5: Configurar Variables de Entorno

1. En la raíz de tu proyecto, crea un archivo `.env`
2. Agrega estas líneas con TUS valores:

```env
# MERCADOPAGO
REACT_APP_MERCADOPAGO_ACCESS_TOKEN=tu_token_de_mercadopago

# EMAILJS - Reemplaza con tus valores
REACT_APP_EMAILJS_SERVICE_ID=service_2owznmm
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789
REACT_APP_EMAILJS_PUBLIC_KEY=12345abcde-XYZT
```

**💡 También puedes copiar el contenido del archivo `env-configuracion-emailjs.txt` que está en la raíz del proyecto.**

3. Guarda el archivo
4. **Reinicia tu servidor:** Ctrl+C y luego `npm start`

## 🧪 Probar el Sistema

### Opción 1: Página de Prueba (Recomendada) ⚡

**Sin hacer ningún pago real:**

1. Asegúrate de tener tu servidor corriendo: `npm start`
2. Ve a: **`http://localhost:3000/test-email`**
3. Modifica los datos de prueba si quieres
4. Click en **"📧 Enviar Email de Prueba"**
5. Revisa tu email `teochiapps@gmail.com` (y carpeta SPAM)

### Opción 2: Pago Real en MercadoPago

1. Ve a tu página de Maquifit: `http://localhost:3000/maquifit`
2. Selecciona un plan
3. Completa el formulario con tus datos
4. Haz un pago de prueba con MercadoPago
5. Después del pago exitoso, revisa tu email configurado

## ✉️ ¿A quién se envía el email?

Actualmente está configurado para enviar a: **`teochiapps@gmail.com`**

### Para cambiar el destinatario:

Edita el archivo `src/api/emailService.js` en la línea 41:

```javascript
// Cambiar esto:
to_email: 'teochiapps@gmail.com',

// Por tu email:
to_email: 'tu_email@ejemplo.com',
```

## 📊 ¿Qué incluye el email?

El email automático contiene:
- ✅ Nombre, email y teléfono del cliente
- ✅ Plan seleccionado con precio
- ✅ ID de pago de MercadoPago
- ✅ Estado del pago
- ✅ Fecha y hora del pago
- ✅ Referencia externa para seguimiento

## 🔍 Verificar que funciona

### En la página de prueba (`/test-email`):
- ✅ Verifica que aparezcan tus IDs en "Estado de Configuración"
- ✅ Completa el formulario y envía
- ✅ Debe aparecer "✅ Email enviado exitosamente!"

### En la consola del navegador (F12):
- ✅ `"💾 Datos almacenados para el email"`
- ✅ `"📧 Enviando email de confirmación de pago..."`
- ✅ `"✅ Email enviado exitosamente"`

## 🐛 Solución de Problemas

### Error: "Access token no configurado"
- Verifica que el archivo `.env` existe
- Verifica que las variables empiezan con `REACT_APP_`
- Reinicia el servidor

### Email no se envía
- Revisa la consola del navegador (F12)
- Verifica que el Service ID, Template ID y Public Key son correctos
- Verifica que tu cuenta de EmailJS está verificada
- Revisa que el template tiene configurado `{{to_email}}`

### Email no llega
- Revisa la carpeta de SPAM
- Verifica en el dashboard de EmailJS si el email se envió
- Verifica que el email destino está bien escrito

## 💡 Límites del Plan Gratuito

EmailJS plan gratuito incluye:
- ✅ 200 emails/mes
- ✅ 2 servicios de email
- ✅ Templates ilimitados
- ✅ Perfecto para empezar

## 🎯 Próximos Pasos

Una vez que recibas un pago exitoso:
1. ✅ Recibirás el email automáticamente
2. 📱 Contacta al cliente por WhatsApp
3. 💪 Comienza el entrenamiento personalizado

## 📞 ¿Necesitas ayuda?

Si tienes problemas, revisa:
1. La consola del navegador (F12 → Console)
2. El archivo `INSTRUCCIONES-EMAIL.md` (más detalles)
3. La documentación de EmailJS: https://www.emailjs.com/docs/

---

**🎉 ¡Listo! Una vez configurado, los emails se enviarán automáticamente después de cada pago exitoso.**

