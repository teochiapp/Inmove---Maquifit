# 🧪 Cómo Testear el Envío de Emails

## 🎯 Propósito

Esta página te permite probar el sistema de envío de emails **sin hacer ningún pago real** en MercadoPago.

## 🚀 Cómo Usarla

### Paso 1: Iniciar tu servidor

```bash
npm start
```

### Paso 2: Acceder a la página de prueba

Abre tu navegador y ve a:

```
http://localhost:3000/test-email
```

### Paso 3: Modificar datos (opcional)

La página viene con datos de prueba pre-cargados:
- **Cliente:** Juan Pérez
- **Email:** cliente.prueba@gmail.com
- **Plan:** Plan Premium - 3 Meses
- **Precio:** $45,000

Puedes modificar cualquier dato según necesites.

### Paso 4: Enviar email de prueba

1. Click en el botón **"📧 Enviar Email de Prueba"**
2. Espera unos segundos
3. Verás un mensaje de éxito o error

### Paso 5: Verificar el email

- El email se enviará a **teochiapps@gmail.com**
- Revisa tu bandeja de entrada
- **Si no lo ves**, revisa la carpeta de **SPAM**
- El email debería llegar en menos de 1 minuto

## ✅ Estado de Configuración

En la parte inferior de la página verás el estado de tus variables de entorno:

```
📋 Estado de Configuración
  Service ID:    service_2owznmm
  Template ID:   template_xyz789
  Public Key:    ✅ Configurado
```

### Si ves "❌ No configurado":
- Verifica que el archivo `.env` existe
- Verifica que las variables tienen el prefijo `REACT_APP_`
- Reinicia el servidor (`Ctrl+C` y luego `npm start`)

## 🔍 Debugging

### Consola del navegador (F12 → Console)

Deberías ver logs como:
```
🧪 Enviando email de prueba...
📋 Datos: {paymentData: {...}, clientData: {...}, planData: {...}}
📧 Enviando email de confirmación de pago...
✅ Email enviado exitosamente
```

### Si hay errores:

#### Error: "Service ID no configurado"
- Verifica el archivo `.env`
- La variable debe ser: `REACT_APP_EMAILJS_SERVICE_ID=service_2owznmm`

#### Error: "Template ID no configurado"
- Crea el template en EmailJS (ver `COMO-CONFIGURAR-EMAIL.md`)
- Agrega la variable: `REACT_APP_EMAILJS_TEMPLATE_ID=tu_template_id`

#### Error: "Public Key no configurado"
- Obtén el Public Key de EmailJS (Account > API Keys)
- Agrega la variable: `REACT_APP_EMAILJS_PUBLIC_KEY=tu_public_key`

#### Error al enviar:
- Verifica que las credenciales son correctas
- Revisa que tu cuenta de EmailJS está verificada
- Verifica que el servicio de Gmail está conectado

## 📧 Contenido del Email de Prueba

El email incluirá:
- 📋 **Datos del Cliente:** nombre, email, teléfono
- 💪 **Plan Adquirido:** nombre, precio, descripción
- 💳 **Detalles del Pago:** ID de prueba, estado, referencia, fecha

## ⚠️ Importante

### Para Desarrollo:
- Esta página está disponible en `http://localhost:3000/test-email`
- Úsala para verificar que todo funciona antes de hacer pagos reales

### Para Producción:
- **DEBES REMOVER** esta ruta antes de deployar
- Edita `src/App.js` y elimina la línea:
  ```javascript
  <Route path="/test-email" element={<TestEmail />} />
  ```
- También puedes eliminar el archivo `src/components/TestEmail.js`

## 💡 Casos de Uso

### 1. Primera configuración
Usa esta página para verificar que EmailJS está correctamente configurado.

### 2. Cambios en el template
Después de modificar el template en EmailJS, prueba aquí para ver los cambios.

### 3. Debugging
Si los emails no llegan en pagos reales, usa esta página para aislar el problema.

### 4. Desarrollo
Mientras desarrollas nuevas funcionalidades relacionadas con emails.

## 🎉 ¿Todo funcionó?

Si recibes el email correctamente:
- ✅ EmailJS está configurado correctamente
- ✅ El template funciona
- ✅ El sistema está listo para pagos reales

Ahora puedes hacer pagos reales en `/maquifit` y los emails se enviarán automáticamente.

## 🔗 Enlaces Útiles

- [Documentación completa](./COMO-CONFIGURAR-EMAIL.md)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [Variables de entorno](./env-configuracion-emailjs.txt)

