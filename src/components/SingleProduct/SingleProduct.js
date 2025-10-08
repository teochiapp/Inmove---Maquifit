import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useProductoPorSlug } from '../../hooks/useProductos';
import { slugToNombre } from '../../utils/slugUtils';
import { getProductoPortada, getProductoAltText } from '../../utils/imageUtils';
import CatalogHeader from '../Catalogo/Header/Header';
import InfoProducto from './SingleComponents/InfoProducto';
import InfoSection from '../Catalogo/Info/Info';
import TePuedeInteresar from './SingleComponents/TePuedeInteresar';
import CategoriasNav from './SingleComponents/CategoriasNav';
import CatalogFooter from '../Catalogo/Footer/Footer';

const SingleProduct = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { producto, loading, error, encontrado } = useProductoPorSlug(nombre);
  const [productoNombre, setProductoNombre] = useState('Producto');
  
  // Datos pasados por navigate state como fallback inmediato
  const productoState = useMemo(() => {
    return location?.state?.producto || null;
  }, [location]);
  
  // Construir una vista unificada del producto desde Strapi o desde state
  const productoView = useMemo(() => {
    if (producto) {
      return {
        id: producto.id,
        nombre: producto.attributes?.Nombre,
        descripcion: typeof producto.attributes?.Descripcion === 'string' ? producto.attributes.Descripcion : '',
        talle: producto.attributes?.Talle,
        color: producto.attributes?.Color,
        precio: producto.attributes?.Precio,
        imagen: null // imagen manejada por util getProductoPortada
      };
    }
    if (productoState) {
      return productoState;
    }
    return null;
  }, [producto, productoState]);

  const imageUrl = useMemo(() => {
    let url = null;
    if (producto) {
      url = getProductoPortada(producto, 'large');
    }
    if (!url) {
      url = productoView?.imagen || null;
    }
    return url || '/catalogo/elementos.webp';
  }, [producto, productoView]);

  const imageAlt = useMemo(() => {
    if (producto) {
      return getProductoAltText(producto);
    }
    return productoView?.nombre || 'Producto';
  }, [producto, productoView]);
  
  // Al montar, llevar al inicio de la página
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Actualizar el nombre del producto cuando cambien los datos
  useEffect(() => {
    if (producto?.attributes?.Nombre) {
      setProductoNombre(producto.attributes.Nombre);
    } else if (nombre) {
      // Fallback al nombre del slug si no hay datos del producto
      setProductoNombre(slugToNombre(nombre));
    }
  }, [producto, nombre]);

  // Funciones de navegación
  const handleNavigateHome = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleNavigateCatalog = (e) => {
    e.preventDefault();
    navigate('/catalogo');
  };
  
  // Si está cargando, mostrar loading
  if (loading && !productoState) {
    return (
      <ProductContainer>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Cargando producto...</LoadingText>
        </LoadingContainer>
      </ProductContainer>
    );
  }

  // Si hay error, mostrar mensaje de error
  if (error) {
    return (
      <ProductContainer>
        <ErrorContainer>
          <ErrorTitle>Error al cargar el producto</ErrorTitle>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton to="/catalogo">Volver al Catálogo</BackButton>
        </ErrorContainer>
      </ProductContainer>
    );
  }

  // Si no se encontró el producto
  if (!loading && !encontrado && !productoState) {
    return (
      <ProductContainer>
        <NotFoundContainer>
          <NotFoundTitle>Producto no encontrado</NotFoundTitle>
          <NotFoundMessage>El producto "{slugToNombre(nombre)}" no existe o ha sido eliminado.</NotFoundMessage>
          <BackButton to="/catalogo">Volver al Catálogo</BackButton>
        </NotFoundContainer>
      </ProductContainer>
    );
  }

  const attributes = producto?.attributes || {};
  const productoId = productoView?.id || producto?.id;

  return (
    <ProductContainer>
      <CatalogHeader />
      <HeaderSpacer />
      <Breadcrumb>
        <BreadcrumbButton onClick={handleNavigateHome}>Inicio</BreadcrumbButton>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbButton onClick={handleNavigateCatalog}>Catálogo</BreadcrumbButton>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbCurrent>{productoNombre}</BreadcrumbCurrent>
      </Breadcrumb>
      
      <InfoProducto 
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        productoView={productoView}
        productoNombre={productoNombre}
        attributes={attributes}
        productoId={productoId}
      />

      <InfoSection />

      <TePuedeInteresar />
      <CategoriasNav />
      <CatalogFooter />
    </ProductContainer>
  );
};

export default SingleProduct;

// Styled Components
const ProductContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f7f2;
  padding: 2rem 0;
`;

const HeaderSpacer = styled.div`
  height: 100px;
`;

const Breadcrumb = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;

  @media (max-width: 768px) {
    padding: 0 1rem 1.5rem;
    font-size: 0.8rem;
  }
`;

const BreadcrumbButton = styled.button`
  background: none;
  border: none;
  color: #B088E0;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  padding: 0;
  
  &:hover {
    color: var(--inmove-color);
  }
  
  &:focus {
    outline: none;
    color: var(--inmove-color);
  }
`;

const BreadcrumbSeparator = styled.span`
  color: #B088E0;
`;

const BreadcrumbCurrent = styled.span`
  color: #262626;
  font-weight: 500;
`;

const ProductDetails = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1rem;
  }
`;

const ProductImageContainer = styled.div`
  position: sticky;
  top: 2rem;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 768px) {
    position: static;
    padding: 1.5rem;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ProductInfo = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProductTitle = styled.h1`
  font-family: 'Onest', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #262626;
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductCategory = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  color: #B088E0;
  font-weight: 500;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductPrice = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--inmove-color);
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ProductDescription = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const CharacteristicsSection = styled.div`
  margin-bottom: 2rem;
`;

const CharacteristicsTitle = styled.h3`
  font-family: 'Onest', sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: #262626;
  margin-bottom: 1rem;
`;

const CharacteristicsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CharacteristicItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.75rem;
  line-height: 1.5;
`;

const CheckIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #B088E0 0%, #8B5CF6 100%);
  color: white;
  border-radius: 50%;
  font-size: 0.8rem;
  font-weight: bold;
  flex-shrink: 0;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #B088E0;
`;

const StockLabel = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  color: #666;
`;

const StockValue = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #262626;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #B088E0 0%, #8B5CF6 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const WishlistButton = styled.button`
  padding: 1rem 2rem;
  background: white;
  color: #B088E0;
  border: 2px solid #B088E0;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #B088E0;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(176, 136, 224, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const RelatedProductsSection = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-top: 3rem;
  }
`;

const RelatedProductsTitle = styled.h2`
  font-family: 'Onest', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #262626;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const RelatedProductsPlaceholder = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
`;

// Loading, Error and NotFound Components
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #B088E0;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
`;

const ErrorTitle = styled.h2`
  font-family: 'Onest', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #e74c3c;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
  text-align: center;
  padding: 2rem;
`;

const NotFoundTitle = styled.h2`
  font-family: 'Onest', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #262626;
  margin-bottom: 1rem;
`;

const NotFoundMessage = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #B088E0 0%, #8B5CF6 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
  }
`;

const ProductDetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
`;

const DetailValue = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: #262626;
`;
