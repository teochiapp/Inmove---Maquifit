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
        
        // Consultar variantes filtrando por producto
        // Intentamos diferentes sintaxis para compatibilidad con Strapi v4/v5
        let response;
        let data;
        
        // Intento 1: Con filtro por Producto (mayúscula)
        try {
          response = await fetch(
            `${STRAPI_URL}/api/variantes?filters[Producto][id][$eq]=${productoId}&populate=Imagen`,
            { headers: { 'Content-Type': 'application/json' } }
          );
          if (response.ok) {
            data = await response.json();
          }
        } catch (e) {
          // Ignorar y probar siguiente método
        }
        
        // Intento 2: Con filtro por producto (minúscula)
        if (!data || !response?.ok) {
          try {
            response = await fetch(
              `${STRAPI_URL}/api/variantes?filters[producto][id][$eq]=${productoId}&populate=Imagen`,
              { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.ok) {
              data = await response.json();
            }
          } catch (e) {
            // Ignorar y probar siguiente método
          }
        }
        
        // Intento 3: Traer todas y filtrar del lado del cliente (última opción)
        if (!data || !response?.ok) {
          try {
            response = await fetch(
              `${STRAPI_URL}/api/variantes?populate=Imagen&populate=producto`,
              { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.ok) {
              data = await response.json();
              // Filtrar del lado del cliente
              if (data.data) {
                data.data = data.data.filter(v => {
                  const prodId = v.producto?.id || v.attributes?.producto?.data?.id;
                  return prodId == productoId;
                });
              }
            }
          } catch (e) {
            // Si ninguno funciona, no hay variantes configuradas
          }
        }

        // Si ningún método funcionó, simplemente no hay variantes
        if (!data || !response?.ok) {
          setVariantes([]);
          setLoading(false);
          return;
        }
        
        // Normalizar variantes
        const variantesNormalizadas = (data.data || []).map(variante => ({
          id: variante.id || variante.documentId,
          documentId: variante.documentId,
          color: variante.Color || variante.attributes?.Color,
          talla: variante.Talla || variante.attributes?.Talla,
          stock: variante.Stock || variante.attributes?.Stock || 0,
          imagen: variante.Imagen?.url || variante.attributes?.Imagen?.data?.attributes?.url
            ? `${STRAPI_URL}${variante.Imagen?.url || variante.attributes?.Imagen?.data?.attributes?.url}`
            : null,
        }));

        setVariantes(variantesNormalizadas);
      } catch (err) {
        // Error silencioso - no mostrar en consola para no confundir al usuario
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

