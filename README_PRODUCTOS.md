# 📦 Guía de Población de Productos

Esta guía te ayudará a poblar tu base de datos de Strapi con los productos reales.

## 🚀 Pasos para Ejecutar

### 1. Iniciar Strapi

Primero, asegúrate de que Strapi esté corriendo:

```bash
cd maquifit-backend
npm run develop
```

Strapi debería estar disponible en: http://localhost:1337

### 2. Verificar/Crear Categorías

Antes de poblar productos, necesitas tener las categorías creadas. Ejecuta este script para ver las categorías existentes:

```bash
cd maquifit
node obtener-categorias.js
```

Este script te mostrará:
- Todas las categorías existentes en Strapi
- Sus IDs correspondientes
- Un mapeo sugerido para usar en el script de productos

**Si no tienes categorías creadas:**
1. Ve a http://localhost:1337/admin
2. Content Manager → Categorias → Create new entry
3. Crea estas categorías:
   - **Calzas largas** (Slug: calzas-largas)
   - **Tops** (Slug: tops)
   - **Remeras** (Slug: remeras)
   - **Shorts** (Slug: shorts)

### 3. Actualizar IDs de Categorías

Abre el archivo `populate-productos.js` y actualiza los IDs de categoría según lo que obtuviste en el paso 2:

```javascript
// Ejemplo:
{
  Nombre: "Calza Power lycra",
  CategoriaProducto: 28,  // ← Reemplaza con el ID correcto
  // ...
}
```

### 4. Ejecutar el Script de Población

Una vez que tengas las categorías correctas, ejecuta:

```bash
node populate-productos.js
```

El script:
- ✅ Creará 12 productos con datos reales
- ✅ Agregará los campos Precio, GuiaTalles y Aclaracion
- ✅ Creará variantes para cada producto (colores y talles)
- ⚠️  NO asignará las categorías automáticamente (debes hacerlo manualmente)

### 5. Completar en el Admin de Strapi

Después de ejecutar el script, ve a http://localhost:1337/admin y:

#### Para cada producto:

1. **Asignar Categoría**
   - Abre el producto
   - En el campo "CategoriaProducto", selecciona la categoría correcta
   - Guarda

2. **Vincular Variantes**
   - En el campo "variantes", selecciona las variantes que se crearon para ese producto
   - Las variantes tienen el formato: "Color - Talles"
   - Guarda

3. **Subir Imágenes**
   - Sube la imagen de portada en el campo "Portada"
   - Sube imágenes adicionales en el campo "Galeria"

4. **Publicar**
   - Haz clic en "Publish" para que el producto sea visible en el frontend

## 📊 Productos Incluidos

### Calzas largas (5 productos)
- Calza Power lycra (negra, bordó) - $27,000
- Calza Morley chocolate - $26,000
- Calza Glossy Forest verde - $38,000
- Calza Pampa cruzada (negra, petroleo) - $25,000
- Calza Glossy negra - $38,000

### Tops (2 productos)
- Top Morley chocolate - $17,000
- Top One hombro (Negro, Chocolate) - $18,000

### Remeras (2 productos)
- Remera Gigi (Greige, Chocolate) - $25,000
- Remera Cropped Mora (Negra, Chocolate) - $22,000

### Shorts (3 productos)
- Short Urban (Negro, Chocolate, Greige) - $23,000
- Short Lycra (Negro, Bordó, Petroleo) - $21,000
- Short Lycra Negro corte cintura 2 - $21,000

## 🔧 Cambios en el Schema

Se agregaron dos nuevos campos al modelo de Producto:

- **GuiaTalles** (text): Guía de talles (ej: "S: 36-38 / M: 40-42")
- **Aclaracion** (text): Aclaraciones adicionales del producto

**Importante:** Después de modificar el schema, Strapi debe reiniciarse para que los cambios tomen efecto.

## 🎨 Sistema de Variantes

Los productos con múltiples colores se manejan como variantes:

**Ejemplo:**
```javascript
{
  Nombre: "Short Urban",
  Precio: 23000,
  variantes: [
    { Color: "Negro", Talles: "1M" },
    { Color: "Chocolate", Talles: "1M" },
    { Color: "Greige", Talles: "1M" }
  ]
}
```

Esto crea:
- 1 producto: "Short Urban"
- 3 variantes asociadas a ese producto

## ❓ Solución de Problemas

### Error: "Cannot connect to Strapi"
- Verifica que Strapi esté corriendo en http://localhost:1337
- Revisa que no haya errores en la consola de Strapi

### Error: "Category not found"
- Asegúrate de haber creado las categorías primero
- Ejecuta `node obtener-categorias.js` para verificar los IDs

### Las variantes no aparecen en el producto
- Debes vincularlas manualmente en el admin de Strapi
- Ve al producto → campo "variantes" → selecciona las variantes correspondientes

### Los productos no se ven en el frontend
- Verifica que los productos estén publicados (no en draft)
- Revisa que tengan una categoría asignada
- Asegúrate de que el frontend esté haciendo populate de las relaciones

## 📝 Notas Adicionales

- El stock de las variantes se establece en 10 por defecto
- Puedes modificar el stock manualmente en el admin de Strapi
- Los precios están en pesos argentinos
- Los talles siguen el formato: "1S-2M" = 1 talle S y 2 talles M

## 🔗 Enlaces Útiles

- Admin de Strapi: http://localhost:1337/admin
- API de Productos: http://localhost:1337/api/productos?populate=*
- API de Categorías: http://localhost:1337/api/categorias
- API de Variantes: http://localhost:1337/api/variantes
