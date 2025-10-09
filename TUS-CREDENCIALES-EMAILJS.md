# 🔑 Tus Credenciales de EmailJS

## ✅ Lo que YA tienes configurado:

```
✅ Service ID:  service_2owznmm
✅ Public Key:  WLL8nQofIZqlZIq9e
⚠️ Template ID: template_xxxxxxx (FALTA CREAR)
```

## 📝 Crear tu archivo .env

### Paso 1: Crear el archivo

En la **raíz de tu proyecto** (donde está `package.json`), crea un archivo nuevo llamado `.env`

### Paso 2: Copiar este contenido

```env
# MERCADOPAGO
REACT_APP_MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago_aqui

# EMAILJS
REACT_APP_EMAILJS_SERVICE_ID=service_2owznmm
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=WLL8nQofIZqlZIq9e
```

### Paso 3: Guardar el archivo

- Guarda el archivo como `.env` (con el punto al inicio)
- **NO lo subas a Git** (ya está en `.gitignore`)

## ⚠️ FALTA: Crear el Email Template

Tu **Template ID** actual (`template_xxxxxxx`) es un placeholder. Necesitas crear el template real:

### Crear el Template en EmailJS:

1. **Ve a:** https://dashboard.emailjs.com/admin/templates

2. **Click en** "Create New Template"

3. **Configura el Subject:**
   ```
   Nuevo pago recibido - {{client_name}} - {{plan_title}}
   ```

4. **Copia este HTML en el contenido:**

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

5. **En "To Email"** pon: `{{to_email}}`

6. **Guarda el template**

7. **Copia el Template ID** que aparece (ejemplo: `template_abc123`)

8. **Actualiza tu archivo `.env`:**
   ```env
   REACT_APP_EMAILJS_TEMPLATE_ID=template_abc123
   ```
   (Reemplaza `template_abc123` con tu ID real)

9. **Reinicia el servidor:**
   ```bash
   Ctrl+C
   npm start
   ```

## 🧪 Probar el Sistema

Una vez que hayas creado el template y actualizado el `.env`:

1. **Ve a:** http://localhost:3000/test-email
2. **Click en** "📧 Enviar Email de Prueba"
3. **Revisa tu email** `teochiapps@gmail.com` (y carpeta SPAM)

## ✅ Checklist Final

- [x] Service ID configurado
- [x] Public Key configurado
- [ ] **Template creado en EmailJS**
- [ ] **Template ID actualizado en .env**
- [ ] Archivo .env creado
- [ ] Servidor reiniciado
- [ ] Prueba exitosa en /test-email

## 🎯 Resumen de lo que falta:

1. **Crear template en EmailJS** (5 minutos)
2. **Copiar el Template ID** 
3. **Actualizar .env** con el Template ID real
4. **Reiniciar servidor**
5. **Probar en /test-email**

¡Estás a un paso de completar la configuración! 🚀

