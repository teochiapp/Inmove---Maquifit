/**
 * Utilidades para manejar imágenes de Strapi
 */

/**
 * Obtiene la URL completa de una imagen de Strapi
 * @param {Object} imagen - Objeto de imagen de Strapi
 * @param {string} size - Tamaño de la imagen (thumbnail, small, medium, large)
 * @returns {string} - URL completa de la imagen
 */
export const getStrapiImageUrl = (imagen, size = 'medium') => {
  if (!imagen) return null;
  
  const baseUrl = getStrapiBaseUrl();
  
  // Si es un objeto con data (estructura anidada)
  if (imagen.data) {
    const imageData = imagen.data.attributes || imagen.data;
    if (imageData.formats && imageData.formats[size]) {
      return `${baseUrl}${imageData.formats[size].url}`;
    }
    return `${baseUrl}${imageData.url}`;
  }
  
  // Si es un objeto directo con url (estructura directa)
  if (imagen.url) {
    if (imagen.formats && imagen.formats[size]) {
      return `${baseUrl}${imagen.formats[size].url}`;
    }
    return `${baseUrl}${imagen.url}`;
  }
  
  // Si es un string (URL completa)
  if (typeof imagen === 'string') {
    return imagen.startsWith('http') ? imagen : `${baseUrl}${imagen}`;
  }
  
  return null;
};

/**
 * Obtiene la URL base de Strapi para imágenes
 * @returns {string} - URL base de Strapi
 */
export const getStrapiBaseUrl = () => {
  // Prioridad 1: Variable de entorno
  if (process.env.REACT_APP_STRAPI_URL) {
    return process.env.REACT_APP_STRAPI_URL;
  }
  
  // Prioridad 2: Detectar entorno basado en hostname
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Desarrollo local
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:1337';
  }
  
  // Producción
  return `${protocol}//${hostname}:1337`;
};

/**
 * Obtiene la URL de portada de un producto
 * @param {Object} producto - Producto de Strapi
 * @param {string} size - Tamaño de la imagen
 * @returns {string} - URL de la imagen de portada o placeholder
 */
export const getProductoPortada = (producto, size = 'medium') => {
  const portada = producto?.attributes?.Portada;
  const imagenUrl = getStrapiImageUrl(portada, size);
  
  // Si no hay imagen, usar placeholder
  return imagenUrl || '/placeholder.jpg';
};

/**
 * Obtiene el alt text para una imagen de producto
 * @param {Object} producto - Producto de Strapi
 * @returns {string} - Texto alternativo
 */
export const getProductoAltText = (producto) => {
  const nombre = producto?.attributes?.Nombre;
  return nombre ? `Imagen de ${nombre}` : 'Imagen del producto';
};
