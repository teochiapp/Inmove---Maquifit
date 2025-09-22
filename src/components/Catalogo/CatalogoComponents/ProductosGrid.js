import React from 'react';
import styled from 'styled-components';
import ProductoCard from './ProductoCard';
import { useProductos } from '../../../hooks/useProductos';

const ProductosGrid = () => {
  const { productos, loading, error, total } = useProductos();

  if (loading) {
    return (
      <GridContainer>
        <LoadingMessage>Cargando productos...</LoadingMessage>
      </GridContainer>
    );
  }

  if (error) {
    return (
      <GridContainer>
        <ErrorMessage>
          Error al cargar los productos: {error}
        </ErrorMessage>
      </GridContainer>
    );
  }

  if (productos.length === 0) {
    return (
      <GridContainer>
        <EmptyMessage>No hay productos disponibles</EmptyMessage>
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      <ProductsCount>Mostrando {productos.length} producto{productos.length !== 1 ? 's' : ''}</ProductsCount>
      <ProductsGrid>
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </ProductsGrid>
    </GridContainer>
  );
};

export default ProductosGrid;

const GridContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 3rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #e74c3c;
  background: #fdf2f2;
  border-radius: 8px;
  border: 1px solid #fecaca;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;

const ProductsCount = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  text-align: center;
`;
