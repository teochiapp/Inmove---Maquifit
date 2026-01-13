# 💪 Maquifit - Plataforma de Entrenamiento Personalizado

<div align="center">

![Maquifit](public/logo.png)

**Plataforma web para gestión de planes de entrenamiento personalizados y orientación nutricional**

[![React](https://img.shields.io/badge/React-18.x-61dafb?logo=react)](https://reactjs.org/)
[![Styled Components](https://img.shields.io/badge/Styled_Components-6.x-db7093?logo=styled-components)](https://styled-components.com/)
[![MercadoPago](https://img.shields.io/badge/MercadoPago-API-00b1ea)](https://www.mercadopago.com.ar/)
[![Strapi](https://img.shields.io/badge/Strapi-CMS-4945ff?logo=strapi)](https://strapi.io/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Flujo de Compra](#-flujo-de-compra)
- [Deployment](#-deployment)

---

## 🎯 Descripción

**Maquifit** es una plataforma web moderna diseñada para ofrecer planes de entrenamiento 100% personalizados, orientación nutricional y seguimiento continuo. Los usuarios pueden elegir entre diferentes planes mensuales, completar sus datos y procesar el pago de forma segura a través de MercadoPago.

### ¿Qué ofrece Maquifit?

- ✅ Planes de entrenamiento personalizados (3 a 6 días)
- 🥗 Orientación nutricional adaptada a objetivos
- 📹 Videos explicativos de cada ejercicio
- 📚 Ideas de recetas y colaciones fit
- 📸 Control de progreso con fotos y medidas
- 💬 Asesoramiento por WhatsApp
- 👥 Acceso al grupo exclusivo Team Maquifit

---

## ✨ Características

### Para Clientes

- 🎨 **Interfaz Moderna**: Diseño responsive con animaciones fluidas usando Framer Motion
- 🛒 **Sistema de Checkout**: Integración completa con MercadoPago Checkout Pro
- 📧 **Notificaciones**: Emails automáticos de confirmación de pago
- 📱 **Responsive**: Optimizado para dispositivos móviles, tablets y desktop
- 🔒 **Seguridad**: Procesamiento seguro de pagos con MercadoPago

### Funcionalidades Técnicas

- 🎭 **Animaciones**: Transiciones suaves con Framer Motion
- 💾 **Persistencia**: Backup de datos en localStorage y Strapi
- 🔄 **Recovery**: Recuperación de datos de pago desde múltiples fuentes
- 📊 **Estado de Pagos**: Manejo de estados (success, pending, failure)
- 🎁 **Modal de Agradecimiento**: Experiencia post-compra personalizada

---

## 🛠️ Tecnologías

### Frontend

- **React 18.x** - Biblioteca de UI
- **React Router DOM** - Navegación y rutas
- **Styled Components** - Estilos CSS-in-JS
- **Framer Motion** - Animaciones y transiciones
- **Axios** - Cliente HTTP para APIs

### Backend

- **Strapi** - Headless CMS para gestión de contenido
- **Node.js** - Runtime de JavaScript
- **API REST** - Comunicación con servicios externos

### Servicios Externos

- **MercadoPago API** - Procesamiento de pagos
- **Email Service** - Envío de notificaciones

### Herramientas de Desarrollo

- **Create React App** - Configuración inicial
- **ES6+** - JavaScript moderno
- **npm** - Gestor de paquetes

---

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** >= 14.x
- **npm** >= 6.x o **yarn** >= 1.22.x
- **Git**

### Cuentas Necesarias

- Cuenta de [MercadoPago](https://www.mercadopago.com.ar/) (modo sandbox para desarrollo)
- Backend de Strapi configurado y ejecutándose

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/maquifit.git
cd maquifit
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

---

## ⚙️ Configuración

### Variables de Entorno

Edita el archivo `.env` con tus credenciales:

```env
# API de Strapi
REACT_APP_STRAPI_URL=http://localhost:1337
REACT_APP_STRAPI_API_TOKEN=tu_token_de_strapi

# MercadoPago
REACT_APP_MERCADOPAGO_PUBLIC_KEY=tu_public_key
REACT_APP_MERCADOPAGO_ACCESS_TOKEN=tu_access_token

# Email Service
REACT_APP_EMAIL_SERVICE_URL=tu_servicio_de_email

# URLs de Retorno (Checkout)
REACT_APP_SUCCESS_URL=http://localhost:3000/checkout/success
REACT_APP_PENDING_URL=http://localhost:3000/checkout/pending
REACT_APP_FAILURE_URL=http://localhost:3000/checkout/failure
```

### Backend (Strapi)

Asegúrate de que el backend de Strapi esté ejecutándose en `http://localhost:1337` (o la URL configurada).

El backend debe tener los siguientes modelos configurados:

- **planes** - Planes de entrenamiento
- **clientes** - Datos de clientes
- **pagos** - Información de transacciones

---

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm start
```

Ejecuta la aplicación en modo desarrollo.  
Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

La página se recargará automáticamente al hacer cambios.

### Testing

```bash
npm test
```

Ejecuta el conjunto de pruebas en modo interactivo.

### Build de Producción

```bash
npm run build
```

Genera la aplicación optimizada para producción en la carpeta `build`.

- ✅ Código minificado
- ✅ Nombres de archivo con hash
- ✅ Optimización de rendimiento

### Análisis del Bundle

```bash
npm run build
source-map-explorer 'build/static/js/*.js'
```

Analiza el tamaño del bundle para optimización.


### Componentes del Flujo

1. **ModalCheckout**: Formulario de datos del cliente
2. **MercadoPagoCheckout**: Creación de preferencia y redirección
3. **CheckoutSuccess**: Confirmación de pago exitoso
4. **CheckoutPending**: Pago en proceso
5. **CheckoutFailure**: Error en el pago
6. **ThankYouModal**: Mensaje personalizado de Maqui

---


### Hosting Manual

```bash
npm run build
```

Sube el contenido de la carpeta `build` a tu servidor.


---

## 📄 Licencia

Este proyecto es de uso privado. Todos los derechos reservados © 2026 Maquifit.

---

## 🙏 Agradecimientos

- [Create React App](https://create-react-app.dev/)
- [Styled Components](https://styled-components.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MercadoPago Developers](https://www.mercadopago.com.ar/developers/)
- [Strapi](https://strapi.io/)

---

<div align="center">

**Hecho con 💜 por el equipo SurCodes**

[Instagram](https://instagram.com/maquifit) • [Website](https://maquifit.com)

</div>
