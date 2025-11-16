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
 * Hook para obtener opciones filtradas dinámicamente según la selección actual
 * @param {Array} variantes - Array de variantes
 * @param {string} selectedSize - Talla seleccionada
 * @param {string} selectedColor - Color seleccionado
 */
export const useOpcionesFiltradas = (variantes, selectedSize, selectedColor) => {
  const [opcionesFiltradas, setOpcionesFiltradas] = useState({
    tallas: [],
    colores: []
  });

  useEffect(() => {
    if (!variantes || variantes.length === 0) {
      setOpcionesFiltradas({ tallas: [], colores: [] });
      return;
    }

    // Filtrar variantes con stock > 0
    const variantesConStock = variantes.filter(v => v.stock > 0);

    // NUEVA LÓGICA: Mostrar todas las opciones con stock disponible
    // Solo filtrar si AMBOS (color Y talla) están seleccionados
    
    let tallasDisponibles;
    let coloresDisponibles;
    
    // Si ambos están seleccionados, verificar que la combinación existe
    if (selectedColor && selectedSize) {
      // Verificar si existe la combinación exacta
      const existeCombinacion = variantesConStock.some(
        v => v.color === selectedColor && v.talla === selectedSize
      );
      
      if (existeCombinacion) {
        // La combinación existe, mantener ambas selecciones
        tallasDisponibles = [selectedSize];
        coloresDisponibles = [selectedColor];
      } else {
        // La combinación no existe, mostrar opciones compatibles
        tallasDisponibles = [...new Set(
          variantesConStock
            .filter(v => v.color === selectedColor)
            .map(v => v.talla)
            .filter(Boolean)
        )];
        coloresDisponibles = [...new Set(
          variantesConStock
            .filter(v => v.talla === selectedSize)
            .map(v => v.color)
            .filter(Boolean)
        )];
      }
    } else if (selectedColor) {
      // Solo color seleccionado: mostrar tallas disponibles para ese color
      tallasDisponibles = [...new Set(
        variantesConStock
          .filter(v => v.color === selectedColor)
          .map(v => v.talla)
          .filter(Boolean)
      )];
      // Mostrar todos los colores con stock
      coloresDisponibles = [...new Set(
        variantesConStock
          .map(v => v.color)
          .filter(Boolean)
      )];
    } else if (selectedSize) {
      // Solo talla seleccionada: mostrar colores disponibles para esa talla
      coloresDisponibles = [...new Set(
        variantesConStock
          .filter(v => v.talla === selectedSize)
          .map(v => v.color)
          .filter(Boolean)
      )];
      // Mostrar todas las tallas con stock
      tallasDisponibles = [...new Set(
        variantesConStock
          .map(v => v.talla)
          .filter(Boolean)
      )];
    } else {
      // Ninguno seleccionado: mostrar TODAS las opciones con stock
      tallasDisponibles = [...new Set(
        variantesConStock
          .map(v => v.talla)
          .filter(Boolean)
      )];
      coloresDisponibles = [...new Set(
        variantesConStock
          .map(v => v.color)
          .filter(Boolean)
      )];
    }

    setOpcionesFiltradas({
      tallas: tallasDisponibles,
      colores: coloresDisponibles
    });
  }, [variantes, selectedSize, selectedColor]);

  return opcionesFiltradas;
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

