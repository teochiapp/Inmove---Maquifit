# 🧪 Testing de Email desde la Consola del Navegador

Esta guía te explica cómo probar el envío de emails directamente desde la consola del navegador, sin necesidad de pasar por todo el flujo de Mercado Pago.

---

## 🚀 Cómo Usar la Función de Testing

### Opción 1: Función Simple (Recomendada)

1. **Abre tu aplicación** en el navegador (`npm start`)
2. **Abre la consola del navegador**:
   - Windows/Linux: `F12` o `Ctrl + Shift + J`
   - Mac: `Cmd + Option + J`
3. **Ejecuta el comando**:
   ```javascript
   window.testEmail()
   ```
4. **¡Listo!** El email se enviará automáticamente con datos de prueba

### Salida esperada en consola:

```
🧪 Iniciando test de email...
📋 Datos de prueba: {payment: {...}, client: {...}, plan: {...}}
📧 Iniciando envío de email de contacto...
📧 Config EmailJS: {serviceId: "...", templateId: "...", publicKeySet: true}
📋 Template params preparados: {...}
📤 Enviando a EmailJS con: {serviceId: "...", templateId: "..."}
✅ Email enviado exitosamente!
✅ Resultado: {status: 200, text: "OK"}
✅ ¡Email de prueba enviado exitosamente!
📧 Revisa tu bandeja de entrada en: maquiponce96@gmail.com
```

---

## 🎨 Opción 2: Envío Personalizado

Si quieres probar con datos personalizados, puedes llamar directamente a la función de envío:

```javascript
// Importar la función desde window
const sendEmail = window.DEBUG_EMAILJS_CONFIG ? true : false;

// Datos personalizados
const paymentData = {
  paymentId: '9999999999',
  status: 'approved',
  externalReference: 'plan_1_1234567890',
  merchantOrderId: '1111111111'
};

const clientData = {
  nombre: 'Tu Nombre',
  mail: 'tu@email.com',
  telefono: '1122334455'
};

const planData = {
  id: 1,
  title: 'Plan Básico',
  price: 10000,
  description: 'Plan de entrenamiento básico',
  highlight: 'Entrenamiento 2x semana'
};

// Nota: Para enviar con datos personalizados, necesitas importar la función
// Más fácil es modificar los datos de prueba en emailService.js
```

---

## 🔍 Verificar Configuración de EmailJS

Antes de enviar un email de prueba, verifica que tu configuración esté correcta:

```javascript
// Ver la configuración actual
window.DEBUG_EMAILJS_CONFIG
```

Deberías ver algo como:

```javascript
{
  serviceId: "service_xxxxx",
  templateId: "template_xxxxx",
  publicKey: "xxxxxxxxxxxxxxxxxxx",
  hasEnvFile: true  // Debe ser true
}
```

Si `hasEnvFile` es `false`, significa que tu archivo `.env.local` no está configurado correctamente.

---

## ✅ Datos de Prueba por Defecto

La función `window.testEmail()` usa estos datos de prueba:

### 💳 Datos del Pago:
```javascript
{
  paymentId: '1234567890',
  status: 'approved',
  externalReference: 'plan_2_1729000000000',
  merchantOrderId: '9876543210'
}
```

### 👤 Datos del Cliente:
```javascript
{
  nombre: 'Juan Pérez (TEST)',
  mail: 'test@example.com',
  telefono: '1234567890'
}
```

### 💪 Datos del Plan:
```javascript
{
  id: 2,
  title: 'Plan Premium (TEST)',
  price: 15000,
  description: 'Plan de prueba',
  highlight: 'Entrenamiento personalizado 3x semana'
}
```

---

## 📧 Revisar el Email Enviado

Después de ejecutar `window.testEmail()`, revisa tu bandeja de entrada en:

**Email destino:** `maquiponce96@gmail.com`

El email debería contener:
- ✅ Nombre del cliente: "Juan Pérez (TEST)"
- ✅ Email del cliente: test@example.com
- ✅ Teléfono: 1234567890
- ✅ Plan: Plan Premium (TEST)
- ✅ Precio: $15.000
- ✅ ID de Pago: 1234567890
- ✅ Estado: approved
- ✅ Referencia: plan_2_1729000000000
- ✅ Order ID: 9876543210
- ✅ Fecha y hora actual

---

## 🛠️ Modificar Datos de Prueba

Si quieres cambiar los datos de prueba que se usan por defecto:

1. Abre el archivo: `src/api/emailService.js`
2. Busca la función `testEmailFunction`
3. Modifica los valores en:
   - `testPaymentData`
   - `testClientData`
   - `testPlanData`
4. Guarda el archivo
5. Recarga la página en el navegador
6. Ejecuta `window.testEmail()` de nuevo

---

## ❌ Solución de Problemas

### Error: "window.testEmail is not a function"

**Causa:** El archivo `emailService.js` no se ha cargado correctamente.

**Solución:**
1. Verifica que el servidor de desarrollo esté corriendo
2. Recarga la página con `Ctrl + F5` (hard refresh)
3. Verifica en la consola que aparezca: `"🧪 Función de testing disponible! Usa: window.testEmail()"`

### Error: "❌ ERROR COMPLETO enviando email"

**Posibles causas:**

1. **Credenciales incorrectas de EmailJS**
   - Verifica tu `.env.local`
   - Asegúrate que las 3 variables estén configuradas correctamente

2. **Public Key no inicializada**
   ```javascript
   // Verifica en consola
   window.DEBUG_EMAILJS_CONFIG.hasEnvFile  // Debe ser true
   ```

3. **Problemas de red**
   - Verifica tu conexión a internet
   - Revisa la consola para más detalles del error

4. **Límite de envíos alcanzado**
   - EmailJS tiene un límite gratuito de 200 emails/mes
   - Verifica tu cuenta de EmailJS

### Email no llega a la bandeja

1. **Revisa la carpeta de SPAM**
2. **Verifica el email de destino** en el template de EmailJS
3. **Revisa los logs de EmailJS**:
   - Ve a tu dashboard de EmailJS
   - Sección "History"
   - Busca el email reciente

---

## 🎯 Comandos Útiles en Consola

```javascript
// 1. Enviar email de prueba
window.testEmail()

// 2. Ver configuración de EmailJS
window.DEBUG_EMAILJS_CONFIG

// 3. Ver datos almacenados en sessionStorage
sessionStorage.getItem('maquifit_client_data')
sessionStorage.getItem('maquifit_plan_data')

// 4. Limpiar datos almacenados
sessionStorage.clear()
```

---

## 📊 Casos de Uso

### Caso 1: Verificar que EmailJS está configurado
```javascript
// Paso 1: Verificar config
window.DEBUG_EMAILJS_CONFIG

// Paso 2: Si todo está bien, enviar test
window.testEmail()
```

### Caso 2: Testing rápido después de cambios
```javascript
// Después de modificar el template o código
window.testEmail()
```

### Caso 3: Debugging de errores
```javascript
// Enviar test y ver logs detallados en consola
window.testEmail().then(result => console.log('Resultado:', result))
```

---

## ✨ Ventajas de este Método

✅ **Rápido** - No necesitas pasar por todo el flujo de pago  
✅ **Repetible** - Puedes probar cuantas veces quieras  
✅ **Sin costo** - No gastas créditos de sandbox de MercadoPago  
✅ **Debugging fácil** - Ves todos los logs en la consola  
✅ **Personalizable** - Puedes modificar los datos de prueba fácilmente

---

## 🔐 Nota de Seguridad

Esta función de testing está disponible en el navegador solo para desarrollo. En producción:
- ✅ Sigue funcionando, pero solo para debugging
- ⚠️ No expongas credenciales sensibles en el código cliente
- ✅ Las credenciales de EmailJS están en variables de entorno

---

¡Listo para usar! 🚀

**Comando principal:**
```javascript
window.testEmail()
```

