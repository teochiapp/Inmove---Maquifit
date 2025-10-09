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

  // Si no hay categoría, mostrar productos aleatorios
  const productosRelacionados = useMemo(() => {
    let productos = [];

    if (categoriaId) {
      // Filtrar productos de la misma categoría
      productos = todosProductos.filter(p =>
        p.categoriaId === categoriaId && p.id !== productoActualId
      );
    }

    // Si no hay suficientes productos de la misma categoría, agregar otros productos
    if (productos.length < 4) {
      const otrosProductos = todosProductos.filter(p =>
        p.id !== productoActualId && !productos.includes(p)
      );
      productos = [...productos, ...otrosProductos];
    }

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
          precio: producto.precio
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
            <ProductCard key={producto.id}>
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
                <ProductPrice>
                  {producto.precio ? `$${producto.precio}` : '$123.00'}
                </ProductPrice>
                <ViewProductButton onClick={() => handleProductClick(producto)}>
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

const Section = styled.div`
  max-width: 1400px;
  margin: 4rem auto;
  padding: 0 1rem;
  background: #F9F5F0;

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    margin: 3rem auto;
  }
  
  @media (max-width: 480px) {
    padding: 0 1rem;
    margin: 2rem auto;
  }
`;

const Container = styled.div``;

const Title = styled.h2`
  font-family: 'Onest', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: #262626;
  margin: 0 0 2.5rem 0;
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--inmove-rosa-color);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
`;

const ProductCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  background: #F5F5F5;
  border-radius: 15px;
  
  @media (max-width: 768px) {
    height: 220px;
  }
  
  @media (max-width: 480px) {
    height: 260px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  opacity: 0.3;
`;

const ProductInfo = styled.div`
  padding: 1.5rem 0rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  
  @media (max-width: 480px) {
    padding: 1.25rem;
  }
`;

const ProductName = styled.h3`
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #262626;
  margin: 0 0 0.75rem 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.6rem;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ProductDescription = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.7rem;
`;

const ProductPrice = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--inmove-color);
  margin: 0 0 1.25rem 0;
  background: #FFF0F5;
  border: 1.5px solid #FFD6E8;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  width: fit-content;
  
  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;

const ViewProductButton = styled.button`
  width: 100%;
  padding: 12px 20px;
      background: var(--inmove-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
  
  &:hover {

    transform: translateX(2px);
  }
  
  &:active {
    transform: translateX(0);
  }
`;

const ArrowIcon = styled.span`
  font-size: 1.2rem;
  color: white;
  transition: transform 0.3s ease;
  
  ${ViewProductButton}:hover & {
    transform: translateX(4px);
  }
`;
