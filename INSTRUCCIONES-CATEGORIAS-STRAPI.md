# 📂 Configuración de Categorías Dinámicas en Strapi v5

Este documento explica cómo configurar las categorías de productos en Strapi v5 para que aparezcan dinámicamente en el header del catálogo.

## 🏗️ Estructura en Strapi

### Content Type: `categorias`

Tu Content Type actual en Strapi:

**Nombre del Content Type:** `categorias` (plural)
**API ID:** `categoria` (singular)

### 📋 Campos Actuales

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `Nombre` | Text | Nombre de la categoría | "Calzas" |
| `Slug` | Text | URL amigable (único) | "calzas" |
| `Portada` | Media (Single) | Imagen principal de la categoría | portada-calzas.jpg |
| `Icono` | Media (Single) | Icono pequeño de la categoría | icono-calzas.png |

### 📁 Estructura de Campos en Strapi

```
Content Type: categorias (API: categoria)
├── Nombre (Text)
│   ├── Required: Yes
│   ├── Unique: No
│   └── Max Length: 50
├── Slug (Text)
│   ├── Required: Yes
│   ├── Unique: Yes
│   └── Max Length: 50
├── Orden (Number - Integer)
│   ├── Required: No
│   ├── Default: 1
│   └── Min: 1, Max: 999
├── Icono (Media - Single)
│   ├── Required: No
│   ├── Allowed Types: Images
│   └── Multiple: No (Single file only)
└── Portada (Media - Single)
    ├── Required: No
    ├── Allowed Types: Images
    └── Multiple: No (Single file only)
```

### 🔢 Configuración del Campo Orden

**Pasos para agregar el campo Orden:**

1. **Ve a Content-Type Builder**
2. **Selecciona tu Content Type `categorias`**
3. **Click en "Add another field"**
4. **Selecciona "Number"**
5. **Configuración del campo:**
   - **Name:** `Orden`
   - **Number format:** Integer
   - **Default value:** 1
   - **Required:** No (opcional)
   - **Min value:** 1
   - **Max value:** 999

### 🖼️ Configuración del Campo Icono

**Pasos para agregar el campo Icono:**

1. **Ve a Content-Type Builder**
2. **Selecciona tu Content Type `categorias`**
3. **Click en "Add another field"**
4. **Selecciona "Media"**
5. **Configuración del campo:**
   - **Name:** `Icono`
   - **Type:** Single media
   - **Allowed types:** Images only
   - **Required:** No (opcional)

### 🖼️ Configuración del Campo Portada

**Pasos para agregar el campo Portada:**

1. **Ve a Content-Type Builder**
2. **Selecciona tu Content Type `categorias`**
3. **Click en "Add another field"**
4. **Selecciona "Media"**
5. **Configuración del campo:**
   - **Name:** `Portada`
   - **Type:** Single media
   - **Allowed types:** Images only
   - **Required:** No (opcional)

### 📊 Estructura de Respuesta Completa

Con todos los campos configurados, la respuesta de Strapi será así:

```json
{
  "data": [
    {
      "id": 2,
      "documentId": "lj7spq1m4pagbqvzyzyu3j61",
      "Nombre": "Calzas",
      "Slug": "calzas",
      "Orden": 1,
      "Icono": {
        "id": 1,
        "documentId": "abc123",
        "name": "icono-calzas.png",
        "alternativeText": null,
        "caption": null,
        "width": 64,
        "height": 64,
        "formats": null,
        "hash": "icono_calzas_abc123",
        "ext": ".png",
        "mime": "image/png",
        "size": 2.45,
        "url": "/uploads/icono_calzas_abc123.png",
        "previewUrl": null,
        "provider": "local",
        "createdAt": "2025-09-25T04:26:54.899Z",
        "updatedAt": "2025-09-25T04:26:54.899Z",
        "publishedAt": "2025-09-25T04:26:54.909Z"
      },
      "Portada": {
        "id": 2,
        "documentId": "def456",
        "name": "portada-calzas.jpg",
        "alternativeText": null,
        "caption": null,
        "width": 800,
        "height": 400,
        "formats": {
          "thumbnail": {
            "name": "thumbnail_portada_calzas.jpg",
            "hash": "thumbnail_portada_calzas_def456",
            "ext": ".jpg",
            "mime": "image/jpeg",
            "width": 400,
            "height": 200,
            "size": 15.2,
            "url": "/uploads/thumbnail_portada_calzas_def456.jpg"
          }
        },
        "hash": "portada_calzas_def456",
        "ext": ".jpg",
        "mime": "image/jpeg",
        "size": 45.8,
        "url": "/uploads/portada_calzas_def456.jpg",
        "previewUrl": null,
        "provider": "local",
        "createdAt": "2025-09-25T04:26:54.899Z",
        "updatedAt": "2025-09-25T04:26:54.899Z",
        "publishedAt": "2025-09-25T04:26:54.909Z"
      },
      "createdAt": "2025-09-25T04:26:54.899Z",
      "updatedAt": "2025-09-25T04:26:54.899Z",
      "publishedAt": "2025-09-25T04:26:54.909Z"
    },
    {
      "id": 4,
      "documentId": "tk85kdyxg7y07o0dbp4hkj0u",
      "Nombre": "Remeras",
      "Slug": "remeras",
      "Orden": 2,
      "Icono": null,
      "createdAt": "2025-09-25T04:32:27.554Z",
      "updatedAt": "2025-09-25T04:32:27.554Z",
      "publishedAt": "2025-09-25T04:32:27.569Z"
    }
  ]
}
```

### 📋 Orden de Visualización

**Cómo funciona el ordenamiento:**

1. **Las categorías se ordenan por el campo `Orden` de menor a mayor**
2. **Si una categoría no tiene valor en `Orden`, se le asigna 999 (aparecerá al final)**
3. **Puedes usar números como: 1, 2, 3, 10, 20, etc.**
4. **Para reorganizar, simplemente cambia los números en Strapi**

**Ejemplo de ordenamiento:**
- Calzas (Orden: 1) → Aparece primero
- Remeras (Orden: 2) → Aparece segundo  
- Tops (Orden: 3) → Aparece tercero
- Conjuntos (sin Orden) → Aparece al final

### 🎨 Uso de Campos de Media

**Icono vs Portada:**

- **Icono:** Se usa en el header del catálogo (navegación)
- **Portada:** Se usa como imagen de fondo en las cards de categorías
- **Ambos:** Son campos Media (Single) en Strapi
- **Fallback:** Si no hay imagen, se muestra un placeholder con emoji

**Recomendaciones:**
- **Icono:** 64x64px, PNG con fondo transparente
- **Portada:** 800x400px, JPG/PNG para fondo de card

## 🎨 Ejemplos de Categorías

### Categoría 1: Calzas
```json
{
  "Nombre": "Calzas",
  "Slug": "calzas",
  "Portada": "portada-calzas.jpg",
  "Icono": "icono-calzas.png"
}
```

### Categoría 2: Remeras
```json
{
  "Nombre": "Remeras",
  "Slug": "remeras",
  "Portada": "portada-remeras.jpg",
  "Icono": "icono-remeras.png"
}
```

### Categoría 3: Tops
```json
{
  "Nombre": "Tops",
  "Slug": "tops",
  "Portada": "portada-tops.jpg",
  "Icono": "icono-tops.png"
}
```

### Categoría 4: Vestidos
```json
{
  "Nombre": "Vestidos",
  "Slug": "vestidos",
  "Portada": "portada-vestidos.jpg",
  "Icono": "icono-vestidos.png"
}
```

## 🔗 Endpoint y API

### URL del Endpoint
```
GET http://localhost:1337/api/categorias?populate=*
```

### Respuesta Real (Strapi v5)
```json
{
  "data": [
    {
      "id": 2,
      "documentId": "lj7spq1m4pagbqvzyzyu3j61",
      "Nombre": "Calzas",
      "Slug": "calzas",
      "createdAt": "2025-09-25T04:26:54.899Z",
      "updatedAt": "2025-09-25T04:26:54.899Z",
      "publishedAt": "2025-09-25T04:26:54.909Z"
    },
    {
      "id": 4,
      "documentId": "tk85kdyxg7y07o0dbp4hkj0u",
      "Nombre": "Remeras",
      "Slug": "remeras",
      "createdAt": "2025-09-25T04:32:27.554Z",
      "updatedAt": "2025-09-25T04:32:27.554Z",
      "publishedAt": "2025-09-25T04:32:27.569Z"
    },
    {
      "id": 6,
      "documentId": "tlj6g3q84g70hdx5dhww0oj3",
      "Nombre": "Tops",
      "Slug": "tops",
      "createdAt": "2025-09-25T04:32:39.716Z",
      "updatedAt": "2025-09-25T04:32:39.716Z",
      "publishedAt": "2025-09-25T04:32:39.722Z"
    },
    {
      "id": 8,
      "documentId": "pofxp13b2gv5cnjvctcz6wjf",
      "Nombre": "Conjuntos",
      "Slug": "conjuntos",
      "createdAt": "2025-09-25T04:32:49.310Z",
      "updatedAt": "2025-09-25T04:32:49.310Z",
      "publishedAt": "2025-09-25T04:32:49.317Z"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

## 🖼️ Iconos de Categorías

### Ubicación de Iconos
Los iconos deben estar en la carpeta `public/home/tienda/` del proyecto React:

```
public/
└── home/
    └── tienda/
        ├── calzas.png
        ├── remeras.png
        ├── tops.png
        └── vestidos.png
```

### Especificaciones de Iconos
- **Formato:** PNG con fondo transparente
- **Tamaño:** 64x64px (mínimo) - 128x128px (recomendado)
- **Peso:** Máximo 50KB por icono
- **Estilo:** Simple, monocromático o con los colores de la marca

## ⚙️ Configuración en Strapi Admin

### Paso 1: Crear Content Type
1. Ve a **Content-Type Builder**
2. Haz click en **"Create new collection type"**
3. Nombre: `categoria-productos`
4. Agrega los campos según la tabla anterior

### Paso 2: Configurar Permisos
1. Ve a **Settings > Users & Permissions Plugin > Roles**
2. Selecciona **Public**
3. En **categoria** marca:
   - ✅ `find`
   - ✅ `findOne`

### Paso 3: Agregar Categorías
1. Ve a **Content Manager > categorias**
2. Haz click en **"Create new entry"**
3. Completa todos los campos
4. **Importante:** Haz click en **"Publish"**

## 🔄 Cómo Funciona en el Frontend

### Hook Personalizado
El sistema usa el hook `useCategorias()` que:

1. **Consulta Strapi:** Hace una petición a `/categorias?populate=*`
2. **Normaliza datos:** Convierte la estructura de Strapi a formato usable
3. **Maneja estados:** Loading, error, y datos exitosos
4. **Actualiza header:** Las categorías aparecen automáticamente en la navegación

### Componentes Afectados
- **Header del catálogo:** Muestra categorías como navegación principal
- **Menú móvil:** Incluye las categorías en el menú hamburguesa
- **Navegación activa:** Detecta la sección actual automáticamente

## 🐛 Solución de Problemas

### No aparecen las categorías
1. **Verifica que Strapi esté corriendo:** `http://localhost:1337`
2. **Revisa el endpoint:** `http://localhost:1337/api/categorias?populate=*`
3. **Confirma permisos:** Public debe tener acceso a `find`
4. **Categorías publicadas:** Asegúrate de que estén publicadas, no en borrador

### Error 403 (Forbidden)
- **Problema:** Falta permiso de lectura
- **Solución:** Configura permisos para rol Public en categoria

### Error 404 (Not Found)  
- **Problema:** Content Type no existe o nombre incorrecto
- **Solución:** Verifica que el Content Type se llame exactamente `categorias` (plural) con API ID `categoria` (singular)

### Iconos no cargan
- **Problema:** Ruta de icono incorrecta
- **Solución:** Verifica que los iconos estén en `public/home/tienda/`

## 📱 Comportamiento Responsive

### Desktop
- **Iconos + texto:** Muestra icono y nombre de categoría
- **Hover effects:** Cambio de color según el color de la categoría
- **Indicador activo:** Línea debajo de la categoría activa

### Tablet (1024px y menos)
- **Solo iconos:** Oculta el texto, muestra solo iconos
- **Tamaño reducido:** Iconos más pequeños para ahorrar espacio

### Móvil (767px y menos)
- **Menú hamburguesa:** Categorías en menú desplegable
- **Iconos + texto:** En móvil se muestra ambos en el menú
- **Efectos visuales:** Animaciones y gradientes por categoría

## 🎯 Resultado Final

Una vez configurado correctamente, tendrás:

✅ **Navegación dinámica** con categorías desde Strapi  
✅ **Iconos personalizados** para cada categoría  
✅ **Colores únicos** por categoría  
✅ **Responsive design** en todos los dispositivos  
✅ **Detección automática** de sección activa  
✅ **Fácil mantenimiento** desde el admin de Strapi
