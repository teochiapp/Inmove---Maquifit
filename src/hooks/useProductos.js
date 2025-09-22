import { useState, useEffect, useMemo } from 'react';
import useAPI from './useAPI';

/**
 * Hook específico para productos de Strapi
 * Optimiza las consultas y maneja la estructura de datos
 */
export const useProductos = () => {
  const { data, loading, error } = useAPI('/productos');
  
  // Procesar datos de Strapi
  const productos = data?.data || [];
  const meta = data?.meta || {};
  
  // Normalizar productos para que tengan la estructura esperada (memoizado)
  const productosNormalizados = useMemo(() => {
    return productos.map(producto => ({
      id: producto.id,
      attributes: {
        Nombre: producto.Nombre,
        Descripcion: producto.Descripcion,
        Portada: producto.Portada, // Ya viene con populate=*
        Talle: producto.Talle,
        Color: producto.Color,
        Categoria: producto.Categoria,
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

export default useProductos;
