import { useState, useEffect } from 'react';

// Función para obtener la URL base dinámicamente
const getAPIBaseURL = () => {
  // Prioridad 1: Variable de entorno (para producción)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Prioridad 2: Detectar entorno basado en hostname
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  
  // Desarrollo local
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:1337/api';
  }
  
  // Producción - usar el mismo dominio pero puerto 1337
  // Esto funciona si tienes Strapi en el mismo servidor
  return `${protocol}//${hostname}:1337/api`;
};

export const useAPI = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const API_BASE_URL = getAPIBaseURL();
        
        // Agregar populate automáticamente para endpoints que lo necesiten
        let fullURL = `${API_BASE_URL}${endpoint}`;
        
        // Popular relaciones para productos y categorías
        if (endpoint.includes('/productos') && !endpoint.includes('populate')) {
          const separator = endpoint.includes('?') ? '&' : '?';
          // Strapi v5 syntax: populate específico con notación de objeto
          fullURL = `${fullURL}${separator}populate[0]=Portada&populate[1]=CategoriaProducto&populate[2]=variantes&populate[3]=variantes.Imagen&pagination[pageSize]=100`;
        } else if (endpoint.includes('/categorias') && !endpoint.includes('populate')) {
          const separator = endpoint.includes('?') ? '&' : '?';
          // Strapi v5 syntax: populate all relations + sin límite de paginación
          fullURL = `${fullURL}${separator}populate=*&pagination[pageSize]=100`;
        }
        
        console.log('Fetching from:', fullURL); // Para debugging
        
        // Configuración de headers para Strapi
        const fetchOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
          },
          ...options
        };
        
        const response = await fetch(fullURL, fetchOptions);
        
        if (!response.ok) {
          // Intentar obtener detalles del error
          let errorDetails = '';
          try {
            const errorData = await response.json();
            errorDetails = errorData.error?.message || JSON.stringify(errorData);
          } catch (e) {
            errorDetails = response.statusText;
          }
          
          // Manejo específico de errores de Strapi
          if (response.status === 400) {
            throw new Error(`Error de solicitud (400): ${errorDetails}`);
          } else if (response.status === 404) {
            throw new Error('Recurso no encontrado');
          } else if (response.status === 500) {
            throw new Error('Error interno del servidor');
          } else if (response.status === 403) {
            throw new Error('Acceso denegado');
          } else {
            throw new Error(`HTTP error! status: ${response.status} - ${errorDetails}`);
          }
        }
        
        const result = await response.json();
        
        // Debug: ver la respuesta completa
        console.log('📦 Respuesta de Strapi:', result);
        if (endpoint.includes('/productos') && result.data) {
          console.log('📋 Productos recibidos:', result.data.length);
          console.log('🔍 Primer producto (sample):', result.data[0]);
        }
        
        // Validar estructura de respuesta de Strapi
        if (result && typeof result === 'object') {
          setData(result);
        } else {
          throw new Error('Respuesta inválida del servidor');
        }
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
        console.error('Attempted URL:', `${getAPIBaseURL()}${endpoint}`);
        
        // Limpiar datos en caso de error
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
};

export default useAPI;
