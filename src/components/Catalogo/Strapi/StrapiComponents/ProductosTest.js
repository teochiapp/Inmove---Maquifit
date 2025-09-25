import { useEffect, useState } from "react";
import styled from 'styled-components';

const ProductosTest = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Probar primero sin populate para ver la estructura básica
    console.log('🔍 Probando diferentes URLs:');
    
    const testUrls = [
      "http://localhost:1337/api/productos?populate=CategoriaProducto"
    ];
    
    const testFetch = async () => {
      for (let url of testUrls) {
        try {
          console.log(`🧪 Probando: ${url}`);
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ Funciona: ${url}`, data);
            setProductos(data.data);
            setLoading(false);
            return; // Salir del bucle si funciona
          } else {
            console.log(`❌ Falla: ${url} - Status: ${response.status}`);
          }
        } catch (err) {
          console.log(`❌ Error: ${url} - ${err.message}`);
        }
      }
      
      // Si ninguna URL funciona
      setError('No se pudo conectar con ninguna variación de la API');
      setLoading(false);
    };
    
    testFetch();
  }, []);

  if (loading) {
    return <Container><LoadingText>Cargando productos...</LoadingText></Container>;
  }

  if (error) {
    return <Container><ErrorText>Error: {error}</ErrorText></Container>;
  }

  return (
    <Container>
      <Title>🧪 Test de Productos con Categorías</Title>
      
      {/* Debug de la estructura completa recibida */}
      <DebugSection style={{ marginBottom: '2rem' }}>
        <DebugTitle>🔍 Estructura Completa Recibida:</DebugTitle>
        <DebugData>
          <strong>Tipo de productos:</strong> {typeof productos}<br/>
          <strong>Es array:</strong> {Array.isArray(productos) ? 'Sí' : 'No'}<br/>
          <strong>Cantidad:</strong> {productos?.length || 0}<br/>
          <strong>Primer elemento:</strong><br/>
          {JSON.stringify(productos[0], null, 2)}
        </DebugData>
      </DebugSection>
      
      <ProductList>
        {Array.isArray(productos) && productos.map((prod) => {
          // Validación para evitar errores
          if (!prod || !prod.attributes) {
            return (
              <ProductItem key={prod?.id || Math.random()}>
                <ErrorText>❌ Producto sin estructura válida</ErrorText>
                <DebugSection>
                  <DebugTitle>🔍 Debug del Producto Problemático:</DebugTitle>
                  <DebugData>
                    {JSON.stringify(prod, null, 2)}
                  </DebugData>
                </DebugSection>
              </ProductItem>
            );
          }

          return (
            <ProductItem key={prod.id}>
              <ProductTitle>{prod.attributes.Nombre || 'Nombre no disponible'}</ProductTitle>
              <ProductDetails>
                <p><strong>ID:</strong> {prod.id}</p>
                <p><strong>Talle:</strong> {prod.attributes.Talle || 'N/A'}</p>
                <p><strong>Color:</strong> {prod.attributes.Color || 'N/A'}</p>
                <p>
                  <strong>Categoría:</strong>{" "}
                  {prod.attributes.CategoriaProducto?.data?.attributes?.Nombre || "Sin categoría"}
                </p>
              </ProductDetails>
              <DebugSection>
                <DebugTitle>🔍 Debug Completo del Producto:</DebugTitle>
                <DebugData>
                  {JSON.stringify(prod.attributes, null, 2)}
                </DebugData>
              </DebugSection>
            </ProductItem>
          );
        })}
      </ProductList>
      
      {productos.length === 0 && (
        <NoDataText>No se encontraron productos</NoDataText>
      )}
    </Container>
  );
};

export default ProductosTest;

// Styled Components
const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Onest', sans-serif;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ProductTitle = styled.h3`
  color: #2c3e50;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const ProductDetails = styled.div`
  margin-bottom: 1rem;
  
  p {
    margin: 0.5rem 0;
    color: #555;
  }
  
  strong {
    color: #2c3e50;
  }
`;

const DebugSection = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  margin-top: 1rem;
`;

const DebugTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #495057;
  font-size: 0.9rem;
`;

const DebugData = styled.pre`
  background: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 0.8rem;
  color: #495057;
  overflow-x: auto;
  margin: 0;
`;

const LoadingText = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
`;

const ErrorText = styled.p`
  text-align: center;
  color: #dc3545;
  font-size: 1.2rem;
  background: #f8d7da;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #f5c6cb;
`;

const NoDataText = styled.p`
  text-align: center;
  color: #6c757d;
  font-size: 1.1rem;
  font-style: italic;
`;
