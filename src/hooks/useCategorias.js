import { useState, useEffect, useMemo } from 'react';
import useAPI from './useAPI';

/**
 * Hook específico para categorías de productos de Strapi
 * Optimiza las consultas y maneja la estructura de datos
 */
export const useCategorias = () => {
  const { data, loading, error } = useAPI('/categorias?populate=*');
  
  // Debug logs
  console.log('🔍 API Response:', data);
  console.log('🔍 Loading:', loading);
  console.log('🔍 Error:', error);
  
  // Procesar datos de Strapi
  const categorias = data?.data || [];
  const meta = data?.meta || {};
  
  // Función helper para asignar colores basados en el ID
  const getColorByIndex = (id) => {
    const colors = ['#C58ADA', '#9DC6DA', '#9FC329', '#BFE839', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
    return colors[(id - 1) % colors.length];
  };
  
  // Normalizar categorías para que tengan la estructura esperada (memoizado)
  const categoriasNormalizadas = useMemo(() => {
    console.log('🔍 Categorias raw data:', categorias); // Debug log
    
    // Ordenar por campo Orden ascendente
    const categoriasOrdenadas = [...categorias].sort((a, b) => {
      const ordenA = a.Orden || a.orden || 999; // Fallback a 999 si no tiene orden
      const ordenB = b.Orden || b.orden || 999;
      return ordenA - ordenB;
    });
    console.log('🔍 Categorias ordenadas por Orden:', categoriasOrdenadas); // Debug log
    
    return categoriasOrdenadas.map(categoria => {
      console.log('🔍 Categoria individual:', categoria); // Debug log
      
      // Para Strapi v5, los campos están directamente en el objeto, no en attributes
      const nombre = categoria.Nombre || categoria.nombre || `Categoría ${categoria.id}`;
      const slug = categoria.Slug || categoria.slug || nombre.toLowerCase().replace(/\s+/g, '-');
      
      console.log('🔍 Nombre extraído:', nombre); // Debug log
      console.log('🔍 Slug extraído:', slug); // Debug log
      
      // Función helper para obtener URL de media en Strapi v5
      const getMediaUrl = (mediaField) => {
        const media = categoria[mediaField];
        console.log(`🔍 Media ${mediaField}:`, media); // Debug log
        
        // En Strapi v5, los media fields pueden tener diferentes estructuras
        if (media) {
          let mediaUrl = null;
          
          // Si es un array (multiple media)
          if (Array.isArray(media) && media.length > 0) {
            mediaUrl = media[0]?.url;
          }
          // Si es un objeto directo (single media)
          else if (media.url) {
            mediaUrl = media.url;
          }
          // Si tiene estructura anidada
          else if (media.data?.attributes?.url) {
            mediaUrl = media.data.attributes.url;
          }
          
          // Construir URL completa si existe
          if (mediaUrl) {
            // Si la URL ya es completa, devolverla tal como está
            if (mediaUrl.startsWith('http')) {
              console.log(`🔗 URL completa encontrada:`, mediaUrl);
              return mediaUrl;
            }
            // Si es una URL relativa, agregar el dominio de Strapi
            // Usar la misma lógica que useAPI.js
            const getStrapiBaseUrl = () => {
              if (process.env.REACT_APP_API_URL) {
                return process.env.REACT_APP_API_URL.replace('/api', '');
              }
              
              const hostname = window.location.hostname;
              const protocol = window.location.protocol;
              
              if (hostname === 'localhost' || hostname === '127.0.0.1') {
                return 'http://localhost:1337';
              }
              
              return `${protocol}//${hostname}:1337`;
            };
            
            const strapiBaseUrl = getStrapiBaseUrl();
            const fullUrl = `${strapiBaseUrl}${mediaUrl}`;
            console.log(`🔗 URL construida:`, fullUrl);
            return fullUrl;
          }
        }
        return null;
      };
      
      // Extraer campo Orden
      const orden = categoria.Orden || categoria.orden || 999;
      console.log('🔍 Orden extraído:', orden); // Debug log
      
      // Extraer icono y portada con logs detallados
      const iconoUrl = getMediaUrl('Icono') || null;
      const portadaUrl = getMediaUrl('Portada') || null;
      console.log(`🖼️ Icono final para ${nombre}:`, iconoUrl);
      console.log(`🖼️ Portada final para ${nombre}:`, portadaUrl);
      
      return {
        id: categoria.id,
        documentId: categoria.documentId, // Nuevo campo en Strapi v5
        nombre: nombre,
        slug: slug,
        orden: orden, // Campo de ordenamiento
        // Usar el campo Icono para el overlay
        icono: iconoUrl,
        // Usar el campo Portada para el fondo
        portada: portadaUrl,
        // Generar descripción básica
        descripcion: `Productos de ${nombre}`,
        // Color por defecto basado en el índice para variedad visual
        color: getColorByIndex(categoria.id),
        // Datos de Strapi v5
        createdAt: categoria.createdAt,
        updatedAt: categoria.updatedAt,
        publishedAt: categoria.publishedAt
      };
    });
  }, [categorias]);
  
  return {
    categorias: categoriasNormalizadas,
    meta,
    loading,
    error,
    total: meta.pagination?.total || 0,
    pageCount: meta.pagination?.pageCount || 0
  };
};

/**
 * Hook para buscar una categoría específica por slug
 * @param {string} slug - Slug de la categoría
 */
export const useCategoriaPorSlug = (slug) => {
  const { categorias, loading, error } = useCategorias();
  const [categoria, setCategoria] = useState(null);
  
  useEffect(() => {
    if (categorias.length > 0 && slug) {
      const categoriaEncontrada = categorias.find(c => c.slug === slug);
      setCategoria(categoriaEncontrada || null);
    } else if (!loading && categorias.length === 0) {
      setCategoria(null);
    }
  }, [categorias, slug, loading]);
  
  return {
    categoria,
    loading,
    error,
    encontrada: !!categoria
  };
};

/**
 * Hook para obtener una categoría por ID
 * @param {string|number} id - ID de la categoría
 */
export const useCategoriaPorId = (id) => {
  const { categorias, loading, error } = useCategorias();
  const [categoria, setCategoria] = useState(null);
  
  useEffect(() => {
    if (categorias.length > 0 && id) {
      const categoriaEncontrada = categorias.find(c => c.id.toString() === id.toString());
      setCategoria(categoriaEncontrada || null);
    }
  }, [categorias, id]);
  
  return {
    categoria,
    loading,
    error,
    encontrada: !!categoria
  };
};

/**
 * Hook principal para usar categorías dinámicas desde Strapi
 * Sin fallback - usa únicamente datos de Strapi
 */
export const useCategoriasWithFallback = () => {
  const { categorias, loading, error, meta } = useCategorias();
  
  return {
    categorias: categorias || [],
    loading,
    error,
    total: meta.pagination?.total || categorias.length,
    pageCount: meta.pagination?.pageCount || 0
  };
};

export default useCategorias;