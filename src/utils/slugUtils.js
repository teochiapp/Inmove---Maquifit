// Utilidades para convertir nombres de productos a slugs y viceversa

/**
 * Convierte un nombre de producto a un slug URL-friendly
 * @param {string} nombre - Nombre del producto
 * @returns {string} - Slug URL-friendly
 */
export const nombreToSlug = (nombre) => {
  if (!nombre) return '';
  
  return nombre
    .toLowerCase()
    .trim()
    // Reemplazar espacios y caracteres especiales con guiones
    .replace(/[\s\W]+/g, '-')
    // Remover guiones múltiples
    .replace(/-+/g, '-')
    // Remover guiones al inicio y final
    .replace(/^-+|-+$/g, '');
};

/**
 * Convierte un slug de vuelta a un nombre legible
 * @param {string} slug - Slug URL-friendly
 * @returns {string} - Nombre legible
 */
export const slugToNombre = (slug) => {
  if (!slug) return '';
  
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Busca un producto por su nombre (slug) en una lista de productos
 * @param {Array} productos - Lista de productos de Strapi
 * @param {string} slug - Slug del producto
 * @returns {Object|null} - Producto encontrado o null
 */
export const buscarProductoPorSlug = (productos, slug) => {
  if (!productos || !slug) return null;
  
  return productos.find(producto => {
    const nombreSlug = nombreToSlug(producto.attributes?.Nombre);
    return nombreSlug === slug;
  });
};

/**
 * Genera la URL completa para un producto
 * @param {string} nombre - Nombre del producto
 * @returns {string} - URL completa
 */
export const generarUrlProducto = (nombre) => {
  const slug = nombreToSlug(nombre);
  return `/catalogo/${slug}`;
};
