# 🔍 Debug de EmailJS - Instrucciones

## 📋 Verificaciones de Configuración

### 1. **Variables de Entorno Actuales**
```env
REACT_APP_EMAILJS_PUBLIC_KEY=Egizjd8jOmECOzre0
REACT_APP_EMAILJS_SERVICE_ID=service_2owznmm
REACT_APP_EMAILJS_TEMPLATE_ID=template_pjck9zy
```

✅ **Acción:** Verifica que estas variables estén en tu archivo `.env` en la raíz del proyecto `maquifit/`

---

## 🎯 Título que se pasa a MercadoPago

**Ubicación:** `src/components/Maquifit/Planes/MercadoPagoCheckout.js` línea 24

Se está pasando:
```javascript
title: plan.title,  // El título del plan seleccionado
```

Esto depende de lo que venga de Strapi en el campo `Titulo` del plan.

---

## 📧 Configuración del Template en EmailJS

### Paso 1: Verifica los campos del template en EmailJS

Entra a [EmailJS Dashboard](https://dashboard.emailjs.com/) y ve a tu template `template_pjck9zy`

**El template DEBE tener estos campos:**

```
{{client_name}}           - Nombre del cliente
{{client_email}}          - Email del cliente
{{client_phone}}          - Teléfono del cliente
{{plan_title}}            - Título del plan
{{plan_price}}            - Precio del plan
{{plan_description}}      - Descripción del plan (subtítulo)
{{contact_date}}          - Fecha y hora del contacto
{{to_email}}              - Email destino (maquiponce96@gmail.com)
{{subject}}               - Asunto del email
{{website_url}}           - URL del sitio
```

⚠️ **NOTA IMPORTANTE:** El email se envía cuando el cliente hace clic en "Continuar con el pago", NO después del pago. Por lo tanto, no incluye datos de pago (payment_id, etc.).

### Paso 2: Ejemplo de template básico para EmailJS

```html
Asunto: {{subject}}

Para: {{to_email}}

Cuerpo:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 NUEVO CLIENTE INTERESADO - MAQUIFIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 DATOS DEL CLIENTE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: {{client_name}}
Email: {{client_email}}
Teléfono: {{client_phone}}

💪 PLAN SELECCIONADO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Plan: {{plan_title}}
Precio: {{plan_price}}
Descripción: {{plan_description}}

📅 FECHA DE CONTACTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{contact_date}}

🌐 Desde: {{website_url}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️ IMPORTANTE: El cliente completará el pago en MercadoPago.
¡Contacta al cliente para continuar con su entrenamiento!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Paso 3: Configuración del servicio

En EmailJS Dashboard:
1. Ve a **Email Services**
2. Verifica que `service_2owznmm` esté activo
3. Asegúrate de que el email configurado sea el correcto
4. El email debe estar verificado

---

## 🐛 Debug en el navegador

### 1. Abre la consola del navegador (F12)

Después de un pago exitoso, deberías ver:

```
🔧 EmailJS Config: { serviceId: 'service_2owznmm', templateId: 'template_pjck9zy', publicKey: 'Egizj...' }
💾 Datos almacenados para el email: {...}
Pago exitoso - Datos: {...}
📋 Datos del cliente y plan obtenidos: {...}
📧 Enviando email de confirmación de pago...
📋 Datos del email: {...}
✅ Email enviado exitosamente: {...}
```

Si ves **errores**, verifica:

#### Error común 1: "Public Key inválida"
- Ve a EmailJS Dashboard → Account → API Keys
- Copia la **Public Key** exacta (no la Private Key)

#### Error común 2: "Template no encontrado"
- Verifica que `template_pjck9zy` existe y está publicado
- El template ID es case-sensitive

#### Error común 3: "Service no encontrado"
- Verifica que `service_2owznmm` existe y está conectado
- El email del servicio debe estar verificado

---

## 🔄 Flujo completo del email:

1. Usuario llena formulario (nombre, teléfono, email)
2. Usuario hace clic en **"Continuar con el pago"**
3. 📧 **SE ENVÍA EL EMAIL** inmediatamente con los datos del cliente y plan
4. Botón muestra "📧 Enviando..."
5. Email enviado a `maquiponce96@gmail.com`
6. Usuario es redirigido a MercadoPago para completar el pago
7. Usuario vuelve a `/checkout/success` (sin enviar email nuevamente)

---

## 🧪 Test rápido

Para probar si EmailJS funciona sin hacer un pago real:

1. Abre la consola del navegador en `/maquifit`
2. Pega esto:

```javascript
// Test rápido de EmailJS
const testData = {
  nombre: 'Test Usuario',
  mail: 'test@example.com',
  telefono: '1234567890'
};

const testPlan = {
  title: 'Plan Test',
  price: 10000,
  description: 'Plan de prueba'
};

sessionStorage.setItem('maquifit_client_data', JSON.stringify(testData));
sessionStorage.setItem('maquifit_plan_data', JSON.stringify(testPlan));

console.log('✅ Datos de prueba almacenados. Ahora navega a /checkout/success?payment_id=test123&status=approved');
```

3. Luego navega manualmente a: `/checkout/success?payment_id=test123&status=approved`
4. Revisa la consola para ver si el email se envía

---

## ✅ Checklist de Verificación

- [ ] Archivo `.env` existe en `maquifit/` con las 3 variables
- [ ] Las variables empiezan con `REACT_APP_`
- [ ] Servidor reiniciado después de agregar `.env` (importante en React)
- [ ] Template `template_pjck9zy` existe en EmailJS Dashboard
- [ ] Template tiene todos los campos necesarios (ver lista arriba)
- [ ] Service `service_2owznmm` está activo y verificado
- [ ] Public Key es correcta (no la Private Key)
- [ ] Email destino en el servicio es `teochiapps@gmail.com` o el correcto

---

## 🚨 Error: "Account not found" (404)

Si recibes este error, significa que EmailJS no encuentra tu cuenta. Posibles causas:

### ❌ Causa 1: Public Key incorrecta

La Public Key debe ser la **User ID/Public Key** de tu cuenta, NO una API Key privada.

**Dónde obtenerla:**
1. Ve a [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Click en tu nombre (arriba a la derecha) → **Account**
3. En la sección "API Keys", busca **"Public Key"** o **"User ID"**
4. Debe verse algo como: `Egizjd8jOmECOzre0` (exactamente 17 caracteres)
5. **NO uses** la Private Key (empieza con "private_")

### ❌ Causa 2: Las variables no se están leyendo

Verifica en la consola del navegador que veas:

```
🔧 EmailJS Config COMPLETA: {
  serviceId: 'service_2owznmm',
  templateId: 'template_pjck9zy',
  publicKey: 'Egizjd8jOmECOzre0',
  publicKeyLength: 17
}
✅ EmailJS inicializado con la public key
```

Si ves valores por defecto como `service_maquifit` o `your_public_key_here`, entonces:
- ❌ El archivo `.env` no existe
- ❌ El archivo `.env` está en la ubicación incorrecta
- ❌ El servidor no fue reiniciado

### ❌ Causa 3: Service ID incorrecto

Verifica en EmailJS Dashboard → Email Services que:
- El Service ID sea exactamente: `service_2owznmm`
- El servicio esté activo (verde)
- El email del servicio esté verificado

### ❌ Causa 4: Template ID incorrecto

Verifica en EmailJS Dashboard → Email Templates que:
- El Template ID sea exactamente: `template_pjck9zy`
- El template esté guardado y publicado

---

## 🚨 Solución Común: Reiniciar el servidor

Si acabas de agregar el archivo `.env`:

```bash
# Detén el servidor (Ctrl+C)
# Luego reinicia:
npm start
```

Las variables de entorno solo se cargan al iniciar React.

---

## 🔑 Cómo verificar tu Public Key

En la consola del navegador, después de iniciar la app:

```javascript
// Ver las variables de entorno
console.log('SERVICE_ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
console.log('TEMPLATE_ID:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
console.log('PUBLIC_KEY:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
```

Si ves `undefined`, tu `.env` no está funcionando.

---

## 📞 Contacto

Si sigues sin recibir emails después de verificar todo:
- Revisa la carpeta de SPAM
- Verifica que el email del servicio EmailJS esté verificado
- Intenta hacer un test directo desde EmailJS Dashboard


