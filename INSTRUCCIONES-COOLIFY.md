# 🚀 Guía de Despliegue en Coolify: Frontend + Backend

## 📊 Estructura de tu Proyecto

Tienes **2 aplicaciones separadas** en Coolify:

| Aplicación | Tecnología | Puerto | Dominio Sugerido |
|-----------|-----------|--------|------------------|
| **Frontend** | React (CRA) | 3000 | `https://inmove.com.ar` |
| **Backend** | Strapi v5 | 1337 | `https://api.inmove.com.ar` |

---

## 🔧 Configuración del Frontend (React)

### 1. Variables de Entorno en Coolify

En tu aplicación de **React** en Coolify, ve a:
- **Configuración** → **Environment Variables**

Y agrega estas variables:

```bash
# URL del backend Strapi (sin /api al final)
REACT_APP_STRAPI_URL=https://api.inmove.com.ar

# URL de la API (con /api al final)
REACT_APP_API_URL=https://api.inmove.com.ar/api

# EmailJS (si ya lo configuraste)
REACT_APP_EMAILJS_SERVICE_ID=service_2owznmm
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=WLL8nQofIZqlZIq9e

# Mercado Pago
REACT_APP_MP_PUBLIC_KEY=tu_public_key_aqui
```

### 2. Commit y Push de `.npmrc`

Asegúrate de que el archivo `.npmrc` esté en tu repositorio:

```bash
git add .npmrc
git commit -m "fix: add npmrc for legacy peer deps"
git push
```

---

## 🔧 Configuración del Backend (Strapi)

### 1. Variables de Entorno en Coolify

En tu aplicación de **Strapi** en Coolify, agrega:

```bash
# URLs del backend
STRAPI_ADMIN_BACKEND_URL=https://api.inmove.com.ar
STRAPI_BACKEND_URL=https://api.inmove.com.ar

# Permitir el dominio del frontend
APP_KEYS=tu_app_key_aqui
API_TOKEN_SALT=tu_salt_aqui
ADMIN_JWT_SECRET=tu_jwt_secret_aqui
TRANSFER_TOKEN_SALT=tu_transfer_salt_aqui
JWT_SECRET=tu_jwt_secret_aqui

# Base de datos (ajusta según tu configuración)
DATABASE_CLIENT=postgres
DATABASE_HOST=tu_db_host
DATABASE_PORT=5432
DATABASE_NAME=tu_db_name
DATABASE_USERNAME=tu_db_user
DATABASE_PASSWORD=tu_db_password
DATABASE_SSL=false

# Node environment
NODE_ENV=production
```

### 2. Configurar CORS en Strapi

En tu proyecto de **Strapi**, edita el archivo `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'https://inmove.com.ar',           // Tu dominio de producción
        'https://www.inmove.com.ar',       // Con www
        'http://localhost:3000',            // Para desarrollo local
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

---

## 🌐 Networking en Coolify

### Frontend (React)
- **Port**: 3000 (el que usa `react-scripts`)
- **Dominio**: Asigna tu dominio principal (ej: `inmove.com.ar`)

### Backend (Strapi)
- **Port**: 1337
- **Dominio**: Asigna un subdominio (ej: `api.inmove.com.ar`)

---

## 🧪 Cómo Probar la Conexión

### 1. Verificar que Strapi responde

Abre en tu navegador:
```
https://api.inmove.com.ar/api/productos
```

✅ Deberías ver JSON con tus productos
❌ Si ves error 502 → Strapi no está respondiendo

### 2. Verificar que React puede conectar

Abre tu sitio:
```
https://inmove.com.ar
```

✅ Si los productos se cargan → Todo funciona
❌ Si hay error CORS en consola → Revisar `middlewares.js`
❌ Si hay error 502 → Revisar `REACT_APP_API_URL`

---

## 🔍 Solución de Problemas Comunes

### Error: `502 Bad Gateway`
**Causa**: El frontend no puede comunicarse con Strapi

**Soluciones**:
1. Verifica que Strapi esté corriendo (revisa logs en Coolify)
2. Verifica que `REACT_APP_API_URL` apunte al dominio correcto
3. Verifica que el puerto 1337 esté expuesto en Coolify

### Error: `CORS policy`
**Causa**: Strapi no permite requests desde tu dominio

**Solución**:
1. Edita `config/middlewares.js` en Strapi
2. Agrega tu dominio al array `origin`
3. Haz commit y redeploy

### Error: `npm ci` falla por `react-helmet-async`
**Causa**: Incompatibilidad con React 19

**Solución**:
1. El archivo `.npmrc` con `legacy-peer-deps=true` debe estar commiteado
2. Si persiste, puedes bajar a React 18 temporalmente

---

## ✅ Checklist Final

Antes de hacer deploy, verifica:

- [ ] `.npmrc` está en el repositorio
- [ ] Variables `REACT_APP_*` configuradas en Coolify (Frontend)
- [ ] Variables `STRAPI_*` configuradas en Coolify (Backend)
- [ ] CORS configurado en `config/middlewares.js` (Strapi)
- [ ] Dominios asignados en ambas apps
- [ ] Puertos expuestos correctamente (3000 frontend, 1337 backend)

---

## 📞 Endpoint del Admin de Strapi

Tu componente `AdminRedirect` en `App.js` ya redirige `/admin` a Strapi.

Simplemente visita:
```
https://inmove.com.ar/admin
```

Y serás redirigido a:
```
https://api.inmove.com.ar/admin
```

---

🎉 **¡Listo!** Con esta configuración, tu frontend y backend deberían estar completamente conectados.

