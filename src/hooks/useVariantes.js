import { useState, useEffect } from 'react';

const STRAPI_URL = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';

/**
 * Hook para obtener variantes de un producto específico
 * @param {string|number} productoId - ID del producto
 */
export const useVariantesPorProducto = (productoId) => {
  const [variantes, setVariantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVariantes = async () => {
      if (!productoId) {
        setVariantes([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Consultar variantes filtrando por producto con populate de imagen
        const response = await fetch(
          `${STRAPI_URL}/api/variantes?filters[producto][documentId][$eq]=${productoId}&populate=Imagen`,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (!response.ok) {
          console.warn('No se pudieron obtener variantes para el producto:', productoId);
          setVariantes([]);
          setLoading(false);
          return;
        }

        const data = await response.json();
        
        // Debug: Ver qué datos llegan
        console.log('🔍 DEBUG - Datos de variantes desde Strapi:', {
          productoId,
          totalVariantes: data.data?.length || 0,
          primeraVariante: data.data?.[0]
        });
        
        // Normalizar variantes (compatibilidad con Strapi v4/v5)
        const variantesNormalizadas = (data.data || []).map(variante => {
          // Extraer atributos (puede venir directo o en attributes)
          const attrs = variante.attributes || variante;
          const imagenData = attrs.Imagen?.data || attrs.Imagen;
          const imagenUrl = imagenData?.attributes?.url || imagenData?.url;
          
          const normalizada = {
            id: variante.id || variante.documentId,
            documentId: variante.documentId,
            nombre: attrs.Nombre || attrs.nombre || null,
            color: attrs.Color,
            talla: attrs.Talla,
            stock: attrs.Stock || 0,
            imagen: imagenUrl ? `${STRAPI_URL}${imagenUrl}` : null,
          };
          
          console.log('🔍 DEBUG - Variante normalizada:', normalizada);
          return normalizada;
        });

        console.log('✅ Total variantes normalizadas:', variantesNormalizadas.length);
        setVariantes(variantesNormalizadas);
      } catch (err) {
        console.error('Error al obtener variantes:', err);
        setError(err.message);
        setVariantes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVariantes();
  }, [productoId]);

  return {
    variantes,
    loading,
    error,
    tieneVariantes: variantes.length > 0
  };
};

/**
 * Hook para obtener opciones únicas de tallas y colores de las variantes
 * @param {Array} variantes - Array de variantes
 */
export const useOpcionesVariantes = (variantes) => {
  const [opciones, setOpciones] = useState({
    tallas: [],
    colores: []
  });

  useEffect(() => {
    if (!variantes || variantes.length === 0) {
      setOpciones({ tallas: [], colores: [] });
      return;
    }

    // Extraer tallas únicas
    const tallasUnicas = [...new Set(variantes.map(v => v.talla).filter(Boolean))];
    
    // Extraer colores únicos
    const coloresUnicos = [...new Set(variantes.map(v => v.color).filter(Boolean))];

    setOpciones({
      tallas: tallasUnicas,
      colores: coloresUnicos
    });
  }, [variantes]);

  return opciones;
};

/**
 * Hook para encontrar una variante específica por talla y color
 * @param {Array} variantes - Array de variantes
 * @param {string} talla - Talla seleccionada
 * @param {string} color - Color seleccionado
 */
export const useVarianteSeleccionada = (variantes, talla, color) => {
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  useEffect(() => {
    if (!variantes || variantes.length === 0) {
      setVarianteSeleccionada(null);
      return;
    }

    const variante = variantes.find(v => {
      const matchTalla = !talla || v.talla === talla;
      const matchColor = !color || v.color === color;
      return matchTalla && matchColor;
    });

    setVarianteSeleccionada(variante || null);
  }, [variantes, talla, color]);

  return varianteSeleccionada;
};

export default useVariantesPorProducto;

