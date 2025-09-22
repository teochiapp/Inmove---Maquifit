import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useAPI from '../../../../hooks/useAPI';
import { useProductos } from '../../../../hooks/useProductos';
import { getProductoPortada, getStrapiBaseUrl } from '../../../../utils/imageUtils';

const StrapiDebug = () => {
  const { data: rawData, loading: rawLoading, error: rawError } = useAPI('/productos');
  const { productos, loading, error, total } = useProductos();

  return (
    <DebugContainer
      as={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
        ease: "easeOut",
        delay: window.innerWidth <= 768 ? 0.1 : 0.3 
      }}
    >
      <h3>🔍 Debug de Strapi</h3>
      
      <Section>
        <h4>📡 Datos Raw de la API:</h4>
        <Status loading={rawLoading} error={rawError}>
          {rawLoading ? 'Cargando...' : rawError ? `Error: ${rawError}` : '✅ Conectado'}
        </Status>
        <JsonData>
          {JSON.stringify(rawData, null, 2)}
        </JsonData>
      </Section>

      <Section>
        <h4>🔄 Datos Procesados:</h4>
        <Status loading={loading} error={error}>
          {loading ? 'Cargando...' : error ? `Error: ${error}` : '✅ Procesado'}
        </Status>
        <Info>
          <p><strong>Total productos:</strong> {total}</p>
          <p><strong>Productos cargados:</strong> {productos.length}</p>
        </Info>
        <JsonData>
          {JSON.stringify(productos, null, 2)}
        </JsonData>
      </Section>

      <Section>
        <h4>📋 Lista de Productos:</h4>
        {productos.map((producto, index) => (
          <ProductoItem key={producto.id}>
            <strong>#{index + 1}</strong> - ID: {producto.id} | 
            Nombre: {producto.attributes?.Nombre} | 
            Talle: {producto.attributes?.Talle} | 
            Color: {producto.attributes?.Color}
            <br />
            <strong>Imagen:</strong> {producto.attributes?.Portada ? '✅ Disponible' : '❌ No disponible'}
            {producto.attributes?.Portada && (
              <>
                <br />
                <strong>URL Original:</strong> {producto.attributes.Portada.url}
                <br />
                <strong>URL Procesada:</strong> {getProductoPortada(producto)}
                <br />
                <strong>Thumbnail:</strong> {producto.attributes.Portada.formats?.thumbnail?.url}
                <br />
                <ProductoImage src={getProductoPortada(producto)} alt={producto.attributes?.Nombre} />
              </>
            )}
          </ProductoItem>
        ))}
      </Section>

      <Section>
        <h4>🔗 Configuración de Imágenes:</h4>
        <Info>
          <p><strong>URL Base de Strapi:</strong> {getStrapiBaseUrl()}</p>
          <p><strong>Endpoint de imágenes:</strong> {getStrapiBaseUrl()}/uploads/</p>
        </Info>
      </Section>
    </DebugContainer>
  );
};

export default StrapiDebug;

const DebugContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Onest', sans-serif;
`;

const Section = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const Status = styled.div.withConfig({
  shouldForwardProp: (prop) => !['loading', 'error'].includes(prop),
})`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
  background: ${props => 
    props.loading ? '#fff3cd' : 
    props.error ? '#f8d7da' : 
    '#d4edda'
  };
  color: ${props => 
    props.loading ? '#856404' : 
    props.error ? '#721c24' : 
    '#155724'
  };
`;

const JsonData = styled.pre`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 4px;
  overflow: auto;
  font-size: 0.8rem;
  max-height: 300px;
  border: 1px solid #e9ecef;
`;

const Info = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
`;

const ProductoItem = styled.div`
  padding: 0.5rem;
  margin: 0.25rem 0;
  background: white;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  font-size: 0.9rem;
`;

const ProductoImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-top: 0.5rem;
  border: 1px solid #ddd;
`;
