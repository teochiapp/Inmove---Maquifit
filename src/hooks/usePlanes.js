import { useState, useEffect, useMemo } from 'react';
import useAPI from './useAPI';

/**
 * Hook específico para planes de Strapi
 * Optimiza las consultas y maneja la estructura de datos
 */
export const usePlanes = () => {
  const { data, loading, error } = useAPI('/planes');
  
  // Procesar datos de Strapi
  const planes = data?.data || [];
  const meta = data?.meta || {};
  
  // Normalizar planes para que tengan la estructura esperada (memoizado)
  const planesNormalizados = useMemo(() => {
    return planes.map(plan => ({
      id: plan.id,
      attributes: {
        Titulo: plan.Titulo,
        Precio: plan.Precio,
        Subtitulo: plan.Subtitulo,
        Descripcion: plan.Descripcion,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
        publishedAt: plan.publishedAt
      }
    }));
  }, [planes]);
  
  return {
    planes: planesNormalizados,
    meta,
    loading,
    error,
    total: meta.pagination?.total || 0,
    pageCount: meta.pagination?.pageCount || 0
  };
};

/**
 * Hook para buscar un plan específico por ID
 * @param {string|number} id - ID del plan
 */
export const usePlanPorId = (id) => {
  const { planes, loading, error } = usePlanes();
  const [plan, setPlan] = useState(null);
  
  useEffect(() => {
    if (planes.length > 0 && id) {
      const planEncontrado = planes.find(p => p.id.toString() === id.toString());
      setPlan(planEncontrado || null);
    }
  }, [planes, id]);
  
  return {
    plan,
    loading,
    error,
    encontrado: !!plan
  };
};

export default usePlanes;

