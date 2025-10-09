import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useProductosByCategoria } from '../../../hooks/useProductos';
import { nombreToSlug } from '../../../utils/slugUtils';

const TePuedeInteresar = ({ categoriaId, productoActualId }) => {
  const navigate = useNavigate();
  const { productosByCategoria, loading } = useProductosByCategoria();

  // Obtener todos los productos de todas las categorías
  const todosProductos = useMemo(() => {
    const productos = [];
    Object.keys(productosByCategoria).forEach(slug => {
      const productosDeCategoria = productosByCategoria[slug]?.productos || [];
      productos.push(...productosDeCategoria);
    });
    return productos;
  }, [productosByCategoria]);

  // Filtrar solo productos de la misma categoría
  const productosRelacionados = useMemo(() => {
    if (!categoriaId) return [];

    // Filtrar productos de la misma categoría, excluyendo el producto actual
    const productos = todosProductos.filter(p =>
      p.categoriaId === categoriaId && p.id !== productoActualId
    );

    return productos.slice(0, 4);
  }, [categoriaId, productoActualId, todosProductos]);

  // Si no hay productos relacionados, no mostrar la sección
  if (productosRelacionados.length === 0 || loading) return null;

  const handleProductClick = (producto) => {
    const slug = nombreToSlug(producto.nombre);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/catalogo/${slug}`, {
      state: {
        producto: {
          id: producto.id,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          talle: producto.talle,
          color: producto.color,
          imagen: producto.imagen,
          precio: producto.precio,
          categoriaId: producto.categoriaId
        }
      }
    });
  };

  return (
    <Section>
      <Container>
        <Title>Te puede interesar</Title>
        <ProductsGrid>
          {productosRelacionados.map((producto) => (
            <ProductCard 
              key={producto.id}
              onClick={() => handleProductClick(producto)}
              role="button"
              aria-label={`Ver ${producto.nombre}`}
            >
              <ProductImageContainer>
                {producto.imagen ? (
                  <ProductImage
                    src={producto.imagen}
                    alt={producto.nombre}
                    onError={(e) => {
                      e.target.src = '/catalogo/elementos.webp';
                    }}
                  />
                ) : (
                  <ImagePlaceholder>🛍️</ImagePlaceholder>
                )}
              </ProductImageContainer>

              <ProductInfo>
                <ProductName>{producto.nombre}</ProductName>
                <ProductDescription>
                  {producto.descripcion || 'Descripción básica del producto.'}
                </ProductDescription>
                {(producto.talle || producto.color) && (
                  <ProductDetails>
                    {producto.talle && (
                      <ProductDetail>Talle: {producto.talle}</ProductDetail>
                    )}
                    {producto.color && (
                      <ProductDetail>Color: {producto.color}</ProductDetail>
                    )}
                  </ProductDetails>
                )}
                <ProductPrice>
                  {producto.precio ? `$${producto.precio}` : 'Consultar precio'}
                </ProductPrice>
                <ViewProductButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(producto);
                  }}
                >
                  Ver Producto
                  <ArrowIcon>→</ArrowIcon>
                </ViewProductButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </Section>
  );
};

export default TePuedeInteresar;

const Section = styled.section`
  padding: 4rem 2rem;
  background: #f9f8f3;

  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-family: "Onest", sans-serif;
  font-weight: 500;
  font-size: 2rem;
  color: var(--text-black);
  margin: 0 0 2rem 0;
  border-left: 3px solid var(--inmove-color);
  padding-left: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    border-left-width: 3px;
    padding-left: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    border-left-width: 2px;
    padding-left: 0.75rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
  
  @media (max-width: 1400px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ProductCard = styled.div`
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  border-radius: 24px;
  height: 370px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  font-size: 3rem;
  opacity: 0.3;
`;

const ProductInfo = styled.div`
  padding: 1.5rem 0rem;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: 485px) {
    text-align: center;
  }
`;

const ProductName = styled.h3`
  font-family: "Onest", sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-black);
  margin: 0 0 0.5rem 0;
`;

const ProductDescription = styled.p`
  font-family: "Onest", sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: #807d7e;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.8rem;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const ProductDetail = styled.span`
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
  color: #6b7280;
`;

const ProductPrice = styled.div`
  color: var(--inmove-color);
  font-family: 'Onest', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  margin-bottom: 1rem;
  background: #FFF0F5;
  border: 1.5px solid #FFD6E8;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  width: fit-content;
`;

const ViewProductButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(218, 95, 139, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ArrowIcon = styled.span`
  font-size: 1.25rem;
  color: white;
  transition: transform 0.3s ease;

  ${ViewProductButton}:hover & {
    transform: translateX(4px);
  }
`;
