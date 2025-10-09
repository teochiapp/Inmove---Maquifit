# 🎨 Configuración de Variantes en Strapi

## ✅ Sistema de Variantes Implementado

Tu aplicación ahora soporta **variantes dinámicas** de productos desde Strapi. Esto te permite tener múltiples combinaciones de **tallas**, **colores**, **stock** e **imágenes** para cada producto.

---

## 📋 Configuración en Strapi

### 1️⃣ Content Type: **Variante**

Ya has creado el Content Type `Variante` con los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `Color` | Text | Color de la variante (ej: "Rojo", "#EF4444") |
| `Talla` | Text | Talla de la variante (ej: "S", "M", "L", "XL") |
| `Stock` | Number | Cantidad disponible en inventario |
| `Imagen` | Media (Single) | Imagen específica de esta variante |
| `Producto` | Relation | Relación con el producto (Many-to-One) |

### 2️⃣ Relación Producto ↔ Variante

En el Content Type **Producto**, debes tener una relación:
- **Tipo:** One-to-Many
- **Nombre:** `Variantes`
- **Relacionado con:** `Variante`

---

## 🎯 Cómo Funciona

### Sistema Dinámico

1. **Si el producto tiene variantes:**
   - Los selectores de talla y color se generan automáticamente desde Strapi
   - La imagen cambia según la variante seleccionada
   - El stock se muestra y valida por variante
   - El botón "Añadir al carrito" se deshabilita si no hay stock

2. **Si el producto NO tiene variantes:**
   - Se usan opciones por defecto (S, M, L) y colores predefinidos
   - No se muestra información de stock
   - Funciona como antes, sin cambios

---

## 📝 Ejemplo de Configuración en Strapi

### Producto: **"Top Deportivo Básico"**

**Variantes:**

| ID | Color | Talla | Stock | Imagen |
|----|-------|-------|-------|--------|
| 1 | Rojo | S | 10 | top-rojo-s.jpg |
| 2 | Rojo | M | 15 | top-rojo-m.jpg |
| 3 | Rojo | L | 5 | top-rojo-l.jpg |
| 4 | Azul | S | 0 | top-azul-s.jpg |
| 5 | Azul | M | 20 | top-azul-m.jpg |
| 6 | Azul | L | 8 | top-azul-l.jpg |

### Resultado en el Frontend:

- **Tallas disponibles:** S, M, L (extraídas automáticamente)
- **Colores disponibles:** Rojo, Azul (extraídos automáticamente)
- **Stock dinámico:**
  - Si selecciona "Azul + S" → **"Sin stock"** (botón deshabilitado)
  - Si selecciona "Rojo + M" → **"15 unidades"** (botón habilitado)
- **Imagen dinámica:** Cambia según la combinación seleccionada

---

## 🎨 Formatos de Color Soportados

Puedes usar cualquiera de estos formatos en el campo `Color`:

### 1. **Códigos Hexadecimales**
```
#EF4444  → Rojo
#3B82F6  → Azul
#10B981  → Verde
```

### 2. **Nombres de Colores CSS**
```
red      → Rojo
blue     → Azul
green    → Verde
hotpink  → Rosa Fuerte
```

### 3. **Códigos RGB**
```
rgb(239, 68, 68)   → Rojo
rgb(59, 130, 246)  → Azul
```

💡 **Tip:** Si usas nombres de colores (ej: "Rojo", "Azul"), se mostrará el nombre como tooltip al pasar el mouse sobre el círculo de color.

---

## 🔄 Flujo de Trabajo

### Paso 1: Crear Producto en Strapi
1. Ve a **Content Manager → Productos**
2. Crea un nuevo producto con su información básica
3. **NO asignes tallas ni colores** en el producto principal

### Paso 2: Crear Variantes
1. Ve a **Content Manager → Variantes**
2. Crea una variante por cada combinación de:
   - Color
   - Talla
   - Stock
   - Imagen específica
3. **Relaciona cada variante con su producto**

### Paso 3: Publicar
1. Publica el producto
2. Publica todas las variantes relacionadas

---

## 🚀 API Endpoint

El endpoint usado es:

```
GET /api/variantes?filters[Producto][id][$eq]={productoId}&populate=Imagen
```

Esto devuelve todas las variantes de un producto específico con sus imágenes.

---

## ✨ Características Implementadas

### ✅ Selectores Dinámicos
- Tallas y colores se generan automáticamente desde las variantes
- Solo se muestran las opciones disponibles

### ✅ Imágenes Dinámicas
- La imagen principal cambia según la variante seleccionada
- Si la variante no tiene imagen, se usa la imagen principal del producto

### ✅ Control de Stock
- Se muestra el stock disponible de la variante seleccionada
- Validación al agregar al carrito:
  - No permite agregar si no hay stock
  - No permite agregar más unidades de las disponibles
- Botón deshabilitado cuando `Stock = 0`

### ✅ Retrocompatibilidad
- Productos sin variantes siguen funcionando con opciones por defecto
- No rompe productos existentes

---

## 🎯 Próximos Pasos Recomendados

1. **Agregar variantes a tus productos existentes**
2. **Subir imágenes específicas para cada variante**
3. **Configurar el stock inicial de cada variante**
4. **Probar el flujo completo:**
   - Seleccionar diferentes combinaciones
   - Verificar que las imágenes cambien
   - Intentar agregar al carrito con y sin stock

---

## 💡 Tips y Mejores Prácticas

### Organización de Variantes
- Usa nombres consistentes para colores (ej: siempre "Rojo", no "rojo" o "ROJO")
- Usa nomenclatura estándar para tallas (S, M, L, XL, XXL)
- Nombra las imágenes descriptivamente (ej: `producto-color-talla.jpg`)

### Gestión de Stock
- Actualiza el stock después de cada venta
- Establece alertas cuando el stock esté bajo
- Considera usar `0` para "Sin stock" y `-1` para "Disponible bajo pedido"

### Imágenes
- Usa imágenes del mismo tamaño para todas las variantes
- Formato recomendado: WebP o JPEG
- Resolución recomendada: 1200x1600px

---

## 🐛 Solución de Problemas

### No se muestran las variantes
- ✅ Verifica que las variantes estén **publicadas** en Strapi
- ✅ Verifica que la relación `Producto` esté configurada correctamente
- ✅ Revisa la consola del navegador para ver si hay errores en la API

### Los colores no se muestran bien
- ✅ Usa códigos hexadecimales (#RRGGBB) para mayor precisión
- ✅ Si usas nombres, usa nombres CSS válidos

### Las imágenes no cambian
- ✅ Verifica que el campo `Imagen` esté populado en las variantes
- ✅ Asegúrate de que las imágenes estén subidas correctamente en Strapi

---

¡Tu sistema de variantes está completamente funcional! 🎉

