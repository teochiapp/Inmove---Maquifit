# 📧 Configuración del Sistema de Email Automático

Este documento explica cómo configurar el sistema de envío automático de emails después de un pago exitoso con MercadoPago.

## 🚀 Características Implementadas

- ✅ **Envío automático de email DESPUÉS de un pago exitoso** (actualizado)
- ✅ **Incluye información del pago** (ID, estado, referencia, fecha)
- ✅ **Modal personalizado** con mensaje de agradecimiento
- ✅ **Redirección automática** al home con modal
- ✅ **Captura de datos del cliente** (nombre, email, teléfono)
- ✅ **Solo notifica pagos completados** (no envía emails de checkouts abandonados)
- ✅ **Diseño responsive** y animaciones suaves

## ⚠️ IMPORTANTE: Cambio en el flujo
El email ahora se envía **DESPUÉS** de que el pago se complete exitosamente, no antes del checkout. Ver `NUEVO-FLUJO-EMAIL.md` para más detalles.

## 🛠️ Configuración de EmailJS

### Paso 1: Crear cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Configurar servicio de email

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz click en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. Anota el **Service ID** que se genera

### Paso 3: Crear template de email

1. Ve a **"Email Templates"**
2. Haz click en **"Create New Template"**
3. Usa el siguiente contenido como base:

**Subject:** `💳 Pago Exitoso - {{client_name}} - {{plan_title}}`

**HTML Content:**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #C58ADA 0%, #9DC6DA 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Nuevo Pago Recibido</h1>
    <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Maquifit - Sistema de Pagos</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #333; margin-top: 0;">📋 Datos del Cliente</h2>
    <p><strong>Nombre:</strong> {{client_name}}</p>
    <p><strong>Email:</strong> {{client_email}}</p>
    <p><strong>Teléfono:</strong> {{client_phone}}</p>
  </div>
  
  <div style="background: #f0f9ff; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #0369a1; margin-top: 0;">💪 Plan Adquirido</h2>
    <p><strong>Plan:</strong> {{plan_title}}</p>
    <p><strong>Precio:</strong> {{plan_price}}</p>
    <p><strong>Descripción:</strong> {{plan_description}}</p>
  </div>
  
  <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
    <h2 style="color: #166534; margin-top: 0;">💳 Detalles del Pago</h2>
    <p><strong>ID de Pago:</strong> {{payment_id}}</p>
    <p><strong>Estado:</strong> {{payment_status}}</p>
    <p><strong>Referencia:</strong> {{payment_reference}}</p>
    <p><strong>Order ID:</strong> {{merchant_order_id}}</p>
    <p><strong>Fecha:</strong> {{payment_date}}</p>
  </div>
  
  <div style="text-align: center; padding: 20px; background: #fef7ff; border-radius: 8px;">
    <p style="margin: 0; color: #7c3aed; font-size: 16px;">
      <strong>¡Contacta al cliente para continuar con su entrenamiento personalizado!</strong>
    </p>
  </div>
</div>
```

4. Configura el **"To Email"** como `maquiponce96@gmail.com`
5. Guarda el template y anota el **Template ID**

### Paso 4: Obtener Public Key

1. Ve a **"Account"** en el menú
2. En la sección **"API Keys"**, copia el **Public Key**

### Paso 5: Configurar variables de entorno

Crea o edita tu archivo `.env` y agrega:

```env
# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=tu_service_id_aqui
REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id_aqui  
REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key_aqui
```

## 🔄 Flujo de Funcionamiento (Actualizado)

1. **Cliente completa el formulario** con sus datos (nombre, email, teléfono)
2. **Datos se guardan** temporalmente en sessionStorage
3. **Cliente es redirigido a MercadoPago** para completar el pago
4. **Cliente completa el pago** en MercadoPago
5. **MercadoPago redirige** a la página de éxito (`/checkout/success`)
6. **Se envía email automáticamente** con todos los datos del cliente, plan Y pago
7. **Se muestra pantalla de procesamiento** con indicador de email
8. **Se abre modal personalizado** con mensaje de agradecimiento
9. **Cliente puede cerrar modal** y volver al home

⚠️ **Cambio importante:** El email ahora se envía DESPUÉS de que el pago se complete exitosamente, no antes del checkout.

## 📱 Experiencia del Usuario

### Pantalla de Procesamiento
- Spinner animado
- Mensaje "Procesando tu pago..."
- Indicador de email enviado

### Modal de Agradecimiento
- Animaciones suaves
- Mensaje personalizado con nombre del cliente
- Pasos siguientes claramente explicados
- Botón para volver al home

### Página de Éxito
- Información completa del pago
- Indicador visual de email enviado
- Botón para ver mensaje de Maqui
- Opción de contactar soporte

## 🛡️ Seguridad y Privacidad

- Los datos del cliente se almacenan **temporalmente** en sessionStorage
- Los datos se **eliminan automáticamente** después del envío del email
- Solo se envía email a **teochiapps@gmail.com**
- No se almacenan datos sensibles en el frontend

## 🔧 Personalización

### Cambiar el email de destino
Edita el archivo `src/api/emailService.js` línea 32:
```javascript
to_email: 'tu_nuevo_email@gmail.com',
```

### Modificar el template del email
Edita el template en tu cuenta de EmailJS o modifica la función `sendPaymentEmailAlternative` en `emailService.js`

### Personalizar el modal
Edita el componente `src/components/Home/Planes/ThankYouModal.js`

## 🐛 Solución de Problemas

### Email no se envía
1. Verifica las variables de entorno
2. Revisa la consola del navegador para errores
3. Confirma que el servicio de EmailJS está activo
4. Verifica que el template existe y está configurado correctamente

### Modal no aparece
1. Revisa que los datos se están almacenando correctamente
2. Verifica la consola para errores de JavaScript
3. Confirma que la redirección a `/checkout/success` funciona

### Datos del cliente no aparecen
1. Verifica que se están almacenando en `sessionStorage`
2. Revisa el flujo desde el formulario hasta el pago
3. Confirma que `storePaymentData` se llama antes de la redirección

## 📞 Soporte

Si tienes problemas con la configuración, revisa:
1. Los logs de la consola del navegador
2. La configuración de EmailJS
3. Las variables de entorno
4. El flujo de datos desde el formulario

El sistema está diseñado para ser robusto y continuar funcionando aunque el email falle, garantizando que el usuario siempre vea el modal de confirmación.
