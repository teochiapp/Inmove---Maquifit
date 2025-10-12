import { useState, useEffect, useMemo } from 'react';
import useAPI from './useAPI';

/**
 * Función auxiliar para extraer texto de rich text de Strapi v5
 */
const extractTextFromRichText = (richText) => {
  if (!richText) return '';
  if (typeof richText === 'string') return richText;
  if (Array.isArray(richText)) {
    return richText
      .map(block => {
        if (block.children) {
          return block.children
            .map(child => child.text || '')
            .join('');
        }
        return '';
      })
      .join(' ');
  }
  return '';
};

/**
 * Hook específico para productos de Strapi
 * Optimiza las consultas y maneja la estructura de datos
 */
export const useProductos = () => {
  const { data, loading, error } = useAPI('/productos');
  
  // Procesar datos de Strapi v5 (sin attributes wrapper)
  const productos = useMemo(() => data?.data || [], [data]);
  const meta = data?.meta || {};
  
  // Normalizar productos para mantener compatibilidad con el código existente (memoizado)
  const productosNormalizados = useMemo(() => {
    return productos.map(producto => ({
      id: producto.id || producto.documentId,
      documentId: producto.documentId,
      attributes: {
        Nombre: producto.Nombre,
        Descripcion: extractTextFromRichText(producto.Descripcion),
        Precio: producto.Precio,
        Portada: producto.Portada ? {
          data: {
            attributes: {
              url: producto.Portada.url,
              formats: producto.Portada.formats,
              alternativeText: producto.Portada.alternativeText,
              name: producto.Portada.name
            }
          }
        } : null,
        Galeria: producto.Galeria ? {
          data: producto.Galeria.map(imagen => ({
            id: imagen.id || imagen.documentId,
            attributes: {
              url: imagen.url,
              formats: imagen.formats,
              alternativeText: imagen.alternativeText,
              name: imagen.name
            }
          }))
        } : null,
        Talle: producto.Talle,
        Color: producto.Color,
        Categoria: producto.CategoriaProducto ? {
          data: {
            id: producto.CategoriaProducto.id || producto.CategoriaProducto.documentId,
            documentId: producto.CategoriaProducto.documentId,
            attributes: {
              Nombre: producto.CategoriaProducto.Nombre,
              slug: producto.CategoriaProducto.Slug,
              Slug: producto.CategoriaProducto.Slug
            }
          }
        } : null,
        // Agregar variantes normalizadas (en minúscula como en Strapi)
        Variantes: producto.variantes ? {
          data: producto.variantes.map(variante => ({
            id: variante.id || variante.documentId,
            documentId: variante.documentId,
            attributes: {
              Color: variante.Color,
              Talla: variante.Talla,
              Stock: variante.Stock,
              Imagen: variante.Imagen ? {
                data: {
                  attributes: {
                    url: variante.Imagen.url,
                    formats: variante.Imagen.formats,
                    alternativeText: variante.Imagen.alternativeText,
                    name: variante.Imagen.name
                  }
                }
              } : null
            }
          }))
        } : null,
        createdAt: producto.createdAt,
        updatedAt: producto.updatedAt,
        publishedAt: producto.publishedAt
      }
    }));
  }, [productos]);
  
  return {
    productos: productosNormalizados,
    meta,
    loading,
    error,
    total: meta.pagination?.total || 0,
    pageCount: meta.pagination?.pageCount || 0
  };
};

/**
 * Hook para buscar un producto específico por slug
 * @param {string} slug - Slug del producto
 */
export const useProductoPorSlug = (slug) => {
  const { productos, loading, error } = useProductos();
  const [producto, setProducto] = useState(null);
  
  useEffect(() => {
    if (productos.length > 0 && slug) {
      const productoEncontrado = productos.find(p => {
        const nombreSlug = p.attributes?.Nombre
          ?.toLowerCase()
          .trim()
          .replace(/[\s\W]+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-+|-+$/g, '');
        return nombreSlug === slug;
      });
      
      setProducto(productoEncontrado || null);
    } else if (!loading && productos.length === 0) {
      setProducto(null);
    }
  }, [productos, slug, loading]);
  
  return {
    producto,
    loading,
    error,
    encontrado: !!producto
  };
};

/**
 * Hook para obtener un producto por ID
 * @param {string|number} id - ID del producto
 */
export const useProductoPorId = (id) => {
  const { productos, loading, error } = useProductos();
  const [producto, setProducto] = useState(null);
  
  useEffect(() => {
    if (productos.length > 0 && id) {
      const productoEncontrado = productos.find(p => p.id.toString() === id.toString());
      setProducto(productoEncontrado || null);
    }
  }, [productos, id]);
  
  return {
    producto,
    loading,
    error,
    encontrado: !!producto
  };
};

/**
 * Hook para obtener productos agrupados por categoría
 * Retorna un objeto donde las claves son los slugs de categoría
 */
export const useProductosByCategoria = () => {
  const { productos, loading, error } = useProductos();
  
  // Agrupar productos por categoría (memoizado)
  const productosByCategoria = useMemo(() => {
    const grouped = {};
    
    productos.forEach(producto => {
      const categoriaData = producto.attributes?.Categoria?.data;
      
      if (categoriaData) {
        const categoriaSlug = categoriaData.attributes?.slug || categoriaData.attributes?.Slug;
        
        if (categoriaSlug) {
          if (!grouped[categoriaSlug]) {
            grouped[categoriaSlug] = {
              categoria: categoriaData,
              productos: []
            };
          }
          
          // Añadir producto con datos normalizados
          grouped[categoriaSlug].productos.push({
            id: producto.id,
            nombre: producto.attributes?.Nombre || '',
            descripcion: producto.attributes?.Descripcion || '',
            talle: producto.attributes?.Talle || '',
            color: producto.attributes?.Color || '',
            precio: producto.attributes?.Precio || '',
            categoriaId: categoriaData.id,
            categoriaSlug: categoriaSlug,
            imagen: producto.attributes?.Portada?.data?.attributes?.url 
              ? `${process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'}${producto.attributes.Portada.data.attributes.url}`
              : null,
            createdAt: producto.attributes?.createdAt,
            updatedAt: producto.attributes?.updatedAt
          });
        }
      }
    });
    
    return grouped;
  }, [productos]);
  
  return {
    productosByCategoria,
    loading,
    error
  };
};

export default useProductos;
