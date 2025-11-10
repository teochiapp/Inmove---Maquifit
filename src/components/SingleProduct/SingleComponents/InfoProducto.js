import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useCarrito } from '../../../context/CarritoContext';
import CarritoModal from '../../Common/CarritoModal/CarritoModal';
import { useVariantesPorProducto, useOpcionesVariantes, useVarianteSeleccionada } from '../../../hooks/useVariantes';

const InfoProducto = ({
  imageUrl,
  imageAlt,
  productoView,
  productoNombre,
  attributes,
  productoId
}) => {
  const { addItem } = useCarrito();
  
  // Debug: Ver qué datos llegan al componente
  useEffect(() => {
    console.log('🔍 DEBUG - InfoProducto recibió:', {
      productoId,
      tieneGuiaTalles: !!attributes?.GuiaTalles,
      GuiaTalles: attributes?.GuiaTalles,
      attributesCompletos: attributes
    });
  }, [productoId, attributes]);
  
  // Obtener variantes del producto
  const { variantes, loading, tieneVariantes } = useVariantesPorProducto(productoId);
  const opcionesVariantes = useOpcionesVariantes(variantes);
  
  const [showModal, setShowModal] = useState(false);
  const [showGuiaTalles, setShowGuiaTalles] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  
  // Construir array de imágenes: Portada + Galería
  const imagenesGaleria = useMemo(() => {
    const imagenes = [];
    const strapiUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337';
    
    // Agregar Portada como primera imagen
    if (imageUrl) {
      imagenes.push({
        url: imageUrl,
        alt: imageAlt || productoNombre
      });
    }
    
    // Agregar imágenes de la galería
    const galeriaData = attributes?.Galeria?.data;
    if (galeriaData && Array.isArray(galeriaData)) {
      galeriaData.forEach((imagen, index) => {
        const imgUrl = imagen.attributes?.url;
        if (imgUrl) {
          imagenes.push({
            url: imgUrl.startsWith('http') ? imgUrl : `${strapiUrl}${imgUrl}`,
            alt: imagen.attributes?.alternativeText || `${productoNombre} - Imagen ${index + 2}`
          });
        }
      });
    }
    
    return imagenes.length > 0 ? imagenes : [{ url: imageUrl || '/catalogo/elementos.webp', alt: imageAlt || productoNombre }];
  }, [imageUrl, imageAlt, productoNombre, attributes]);
  
  // Obtener variante seleccionada
  const varianteSeleccionada = useVarianteSeleccionada(variantes, selectedSize, selectedColor);
  
  // Inicializar selección por defecto cuando se cargan las variantes
  useEffect(() => {
    if (tieneVariantes && opcionesVariantes.tallas.length > 0 && !selectedSize) {
      setSelectedSize(opcionesVariantes.tallas[0]);
    }
    if (tieneVariantes && opcionesVariantes.colores.length > 0 && !selectedColor) {
      setSelectedColor(opcionesVariantes.colores[0]);
    }
  }, [tieneVariantes, opcionesVariantes, selectedSize, selectedColor]);
  
  // Usar solo datos de Strapi (sin fallback hardcodeado)
  const tallasDisponibles = opcionesVariantes.tallas;
  const coloresDisponibles = opcionesVariantes.colores;
  
  // Imagen a mostrar (prioritiza la imagen de la variante seleccionada, sino usa la imagen de la galería seleccionada)
  const imagenActual = useMemo(() => {
    if (varianteSeleccionada?.imagen) {
      return varianteSeleccionada.imagen;
    }
    // Usar la imagen seleccionada de la galería
    if (imagenesGaleria && imagenesGaleria[activeThumb]) {
      return imagenesGaleria[activeThumb].url;
    }
    return imageUrl;
  }, [varianteSeleccionada, imagenesGaleria, activeThumb, imageUrl]);
  
  // Stock disponible
  const stockDisponible = varianteSeleccionada?.stock ?? null;

  const handleAddToCart = () => {
    // Validar stock
    if (stockDisponible !== null && stockDisponible <= 0) {
      alert('Producto sin stock disponible');
      return;
    }
    
    if (stockDisponible !== null && quantity > stockDisponible) {
      alert(`Solo hay ${stockDisponible} unidades disponibles`);
      return;
    }
    
    const producto = {
      id: productoId,
      nombre: productoView?.nombre || productoNombre,
      descripcion: productoView?.descripcion || attributes.Descripcion || '',
      precio: productoView?.precio || attributes.Precio || '0',
      talle: selectedSize,
      color: selectedColor,
      imagen: imagenActual,
      varianteId: varianteSeleccionada?.id
    };

    // Agregar la cantidad seleccionada al carrito
    for (let i = 0; i < quantity; i++) {
      addItem(producto);
    }
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));


  const scrollThumbnails = (direction) => {
    const maxIndex = imagenesGaleria.length - 1;
    if (direction === 'up' && activeThumb > 0) {
      setActiveThumb(activeThumb - 1);
    } else if (direction === 'down' && activeThumb < maxIndex) {
      setActiveThumb(activeThumb + 1);
    }
  };

  return (
    <>
<ProductDetails>
        {/* Columna izquierda - Galería */}
  <GalleryContainer>
    <ThumbnailsWrapper>
      <Thumbnails>
        {imagenesGaleria.map((imagen, index) => (
          <Thumbnail 
            key={index}
            src={imagen.url} 
            alt={imagen.alt}
            $active={activeThumb === index}
            onClick={() => setActiveThumb(index)}
          />
        ))}
      </Thumbnails>
      
      {imagenesGaleria.length > 1 && (
        <ArrowsContainer>
          <ArrowButton onClick={() => scrollThumbnails('up')} disabled={activeThumb === 0}>
            <ArrowIcon>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 7L6 2L1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ArrowIcon>
          </ArrowButton>
          
          <ArrowButton $isDown onClick={() => scrollThumbnails('down')} disabled={activeThumb === imagenesGaleria.length - 1}>
            <ArrowIcon>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ArrowIcon>
          </ArrowButton>
        </ArrowsContainer>
      )}
    </ThumbnailsWrapper>
    
          <MainImageContainer>
      <ProductImage src={imagenActual} alt={imagenesGaleria[activeThumb]?.alt || imageAlt} />
          </MainImageContainer>
  </GalleryContainer>

        {/* Columna derecha - Info */}
  <ProductInfo>
          <ProductTitle>{productoView?.nombre || productoNombre || 'Nombre del producto'}</ProductTitle>
    <ProductDescription>
      {productoView?.descripcion || attributes.Descripcion || 'Descripción del producto.'}
    </ProductDescription>
          
    <ProductPrice>
      {productoView?.precio || attributes.Precio
              ? `$${Math.round(Number(productoView?.precio || attributes.Precio))}`
              : '$123'}
    </ProductPrice>

    {/* Talles y Colores */}
          {loading ? (
            <LoadingMessage>Cargando variantes disponibles...</LoadingMessage>
          ) : !tieneVariantes ? (
            <NoVariantesMessage>
              No hay variantes disponibles para este producto. Por favor, contacta al administrador.
            </NoVariantesMessage>
          ) : (
            <SelectorsRow>
              <SelectorColumn>
                <SectionLabel>Selecciona tu talle</SectionLabel>
                {tallasDisponibles.length > 0 ? (
                  <SizeOptions>
                    {tallasDisponibles.map((talla) => (
                      <SizeButton 
                        key={talla}
                        $active={selectedSize === talla} 
                        onClick={() => setSelectedSize(talla)}
                      >
                        {talla}
                      </SizeButton>
                    ))}
                  </SizeOptions>
                ) : (
                  <EmptyMessage>No hay talles disponibles</EmptyMessage>
                )}
              </SelectorColumn>

              {/* Colores */}
              <SelectorColumn>
                <SectionLabel>Colores Disponibles</SectionLabel>
                {coloresDisponibles.length > 0 ? (
                  <ColorOptions>
                    {coloresDisponibles.map((color) => (
                      <ColorCircle 
                        key={color}
                        color={color} 
                        $active={selectedColor === color}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </ColorOptions>
                ) : (
                  <EmptyMessage>No hay colores disponibles</EmptyMessage>
                )}
              </SelectorColumn>
            </SelectorsRow>
          )}
          
          {/* Stock disponible */}
          {stockDisponible !== null && (
            <StockInfo>
              <StockLabel>Stock disponible:</StockLabel>
              <StockValue $disponible={stockDisponible > 0}>
                {stockDisponible > 0 ? `${stockDisponible} unidades` : 'Sin stock'}
              </StockValue>
            </StockInfo>
          )}

          <GuideLink 
            href="#guia-talles" 
            onClick={(e) => {
              e.preventDefault();
              setShowGuiaTalles(true);
            }}
          >
            <SizeIcon>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33366 2L2.66699 4.66667L5.33366 7.33333" stroke="#1A1F22" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2.66699 4.66663L13.3337 4.66663" stroke="#1A1F22" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.667 14L13.3337 11.3333L10.667 8.66663" stroke="#1A1F22" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.3337 11.3334L2.66699 11.3334" stroke="#1A1F22" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SizeIcon>
            Guía de talles
          </GuideLink>

          {/* Cantidad + Carrito */}
    <QuantityAndCartRow>
      <QuantityContainer>
              <QuantityButton onClick={decrementQuantity}>−</QuantityButton>
              <QuantityValue>{quantity}</QuantityValue>
              <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
      </QuantityContainer>
      
      <AddToCartButton 
        onClick={handleAddToCart}
        disabled={stockDisponible !== null && stockDisponible <= 0}
      >
              <CartIcon width="16" height="17" viewBox="0 0 16 17" fill="none">
                <path d="M5.33366 15.1666C5.70185 15.1666 6.00033 14.8682 6.00033 14.5C6.00033 14.1318 5.70185 13.8333 5.33366 13.8333C4.96547 13.8333 4.66699 14.1318 4.66699 14.5C4.66699 14.8682 4.96547 15.1666 5.33366 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.6667 15.1666C13.0349 15.1666 13.3333 14.8682 13.3333 14.5C13.3333 14.1318 13.0349 13.8333 12.6667 13.8333C12.2985 13.8333 12 14.1318 12 14.5C12 14.8682 12.2985 15.1666 12.6667 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.36621 1.86664L2.69954 1.86664L4.47288 10.1466C4.53793 10.4499 4.70666 10.721 4.95002 10.9132C5.19338 11.1055 5.49615 11.2069 5.80621 11.2L12.3262 11.2C12.6297 11.1995 12.9239 11.0955 13.1602 10.9052C13.3966 10.7149 13.561 10.4497 13.6262 10.1533L14.7262 5.19997L3.41288 5.19997" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </CartIcon>
        {stockDisponible !== null && stockDisponible <= 0 ? 'Sin stock' : 'Añadir al carrito'}
      </AddToCartButton>
    </QuantityAndCartRow>

          {/* Features con iconos */}
          <FeaturesGrid>
            <FeatureItem>
              <FeatureIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2"/>
                  <path d="M13.5 13.5L16.5 16.5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </FeatureIcon>
              <FeatureText>Lorem ipsum</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2"/>
                  <path d="M13.5 13.5L16.5 16.5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </FeatureIcon>
              <FeatureText>Lorem ipsum</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2"/>
                  <path d="M13.5 13.5L16.5 16.5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </FeatureIcon>
              <FeatureText>Lorem ipsum</FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="10" r="7" stroke="black" strokeWidth="2"/>
                  <path d="M13.5 13.5L16.5 16.5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </FeatureIcon>
              <FeatureText>Lorem ipsum</FeatureText>
            </FeatureItem>
          </FeaturesGrid>
  </ProductInfo>
</ProductDetails>

      <CarritoModal 
        isOpen={showModal}
        onClose={handleCloseModal}
        producto={{
          ...productoView,
          nombre: productoView?.nombre || productoNombre,
          imagen: imagenActual,
          talle: selectedSize,
          color: selectedColor
        }}
        cantidad={quantity}
      />

      {/* Modal de Guía de Talles */}
      {showGuiaTalles && (
        <ModalOverlay onClick={() => setShowGuiaTalles(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Guía de Talles</ModalTitle>
              <CloseButton onClick={() => setShowGuiaTalles(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              {attributes?.GuiaTalles ? (
                <GuiaTallesText>{attributes.GuiaTalles}</GuiaTallesText>
              ) : (
                <NoGuiaMessage>No hay información de guía de talles disponible para este producto.</NoGuiaMessage>
              )}
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default InfoProducto;

// === Layout Principal ===
const ProductDetails = styled.div`
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  align-items: stretch;
  background: #F9F5F0;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 0 1.5rem;
  align-items: start;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
    gap: 2rem;
  }
`;

// === Galería de Imágenes ===
const GalleryContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 100%;
`;

const ThumbnailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const ArrowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
`;

const ArrowIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    display: block;
  }
`;

const ArrowButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1.5px solid ${props => props.$isDown ? '#262626' : '#E5E7EB'};
  background: ${props => props.$isDown ? '#262626' : 'white'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  
  ${ArrowIcon} svg path {
    stroke: ${props => props.$isDown ? 'white' : '#262626'};
  }
  
  &:hover:not(:disabled) {
    border-color: var(--inmove-color);
    background: ${props => props.$isDown ? '#1a1a1a' : '#FFF5F9'};
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const Thumbnail = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  border: 3px solid ${props => props.$active ? 'var(--inmove-color)' : 'transparent'};
  transition: all 0.3s ease;
  background: white;

  &:hover {
    border-color: var(--inmove-rosa-color);
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
`;

const MainImageContainer = styled.div`
  flex: 1;
  background: white;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  height: 70vh;
  object-fit: cover;
  display: block;
  
  @media (max-width: 968px) {
    height: 450px;
  min-height: none;
  }

  @media (max-width: 768px) {
    height: 380px;
  min-height: none;
    
  }
  
  @media (max-width: 480px) {
    height: 300px;
  min-height: none;

  }
`;

// === Información del Producto ===
const ProductInfo = styled.div`
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const ProductTitle = styled.h1`
  font-family: 'Onest', sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #262626;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const ProductDescription = styled.p`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`;

const ProductPrice = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: clamp(1.75rem, 3vw, 2rem);
  font-weight: 700;
  color: #262626;
  margin: 0 0 2rem 0;
`;

// === Mensajes de Estado ===
const LoadingMessage = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  color: #666;
  padding: 1.5rem;
  text-align: center;
  background: #f9fafb;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const NoVariantesMessage = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  color: #dc2626;
  padding: 1.5rem;
  text-align: center;
  background: #fef2f2;
  border: 1.5px solid #fecaca;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`;

const EmptyMessage = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.85rem;
  color: #999;
  font-style: italic;
  padding: 0.5rem 0;
`;

// === Selectores de Talle y Color ===
const SelectorsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const SelectorColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionLabel = styled.label`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  color: #262626;
  margin-bottom: 0.75rem;
  display: block;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const SizeButton = styled.button`
  min-width: 50px;
  height: 44px;
  padding: 0 1rem;
  border-radius: 8px;
  border: 1.5px solid ${props => props.$active ? 'var(--inmove-color)' : '#D1D5DB'};
  background: ${props => props.$active ? 'var(--inmove-color)' : 'white'};
  color: ${props => props.$active ? 'white' : '#262626'};
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--inmove-color);
    ${props => !props.$active && `
      background: #FFF5F9;
    `}
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const ColorCircle = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => {
    // Si el color empieza con # o rgb, usarlo directamente
    if (props.color.startsWith('#') || props.color.startsWith('rgb')) {
      return props.color;
    }
    
    // Mapeo de colores en español a valores hexadecimales
    const colorMap = {
      // Básicos
      'negro': '#000000',
      'negra': '#000000',
      'blanco': '#FFFFFF',
      'blanca': '#FFFFFF',
      
      // Rojos y rosados
      'rojo': '#DC2626',
      'bordó': '#8B1538',
      'bordo': '#8B1538',
      'rosa': '#EC4899',
      'fucsia': '#D946EF',
      
      // Azules
      'azul': '#3B82F6',
      'azul noche': '#1E3A8A',
      'celeste': '#7DD3FC',
      'petroleo': '#0E7490',
      'petróleo': '#0E7490',
      'navy': '#1E3A8A',
      
      // Verdes
      'verde': '#22C55E',
      'verde militar': '#4D7C0F',
      'verde oliva': '#65A30D',
      'menta': '#6EE7B7',
      
      // Marrones y neutros
      'marrón': '#92400E',
      'marron': '#92400E',
      'chocolate': '#78350F',
      'café': '#92400E',
      'beige': '#E7D4B5',
      'arena': '#D4C5A9',
      'camel': '#C19A6B',
      'greige': '#C9B8A8',
      'vison': '#B8A89A',
      'visón': '#B8A89A',
      
      // Grises
      'gris': '#6B7280',
      'gris claro': '#D1D5DB',
      'gris oscuro': '#374151',
      'plomo': '#52525B',
      
      // Amarillos y naranjas
      'amarillo': '#FACC15',
      'mostaza': '#CA8A04',
      'naranja': '#F97316',
      'durazno': '#FDBA74',
      
      // Violetas
      'violeta': '#8B5CF6',
      'lila': '#C084FC',
      'morado': '#7C3AED',
      'púrpura': '#A855F7',
      'purpura': '#A855F7',
      
      // Otros
      'único': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'unico': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'multicolor': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    };
    
    // Buscar el color en el mapa (case-insensitive)
    const colorKey = props.color.toLowerCase().trim();
    return colorMap[colorKey] || props.color.toLowerCase();
  }};
  cursor: pointer;
  border: 3px solid ${props => props.$active ? '#262626' : 'white'};
  box-shadow: 0 0 0 1.5px #D1D5DB;
  transition: all 0.3s ease;
  padding: 0;
  position: relative;
  
  /* Si es un color con nombre, mostrar el nombre como tooltip */
  &::after {
    content: ${props => (!props.color.startsWith('#') && !props.color.startsWith('rgb')) ? `'${props.color}'` : '""'};
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    color: #666;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.2s;
    pointer-events: none;
  }
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px var(--inmove-color);
    
    &::after {
      opacity: ${props => (!props.color.startsWith('#') && !props.color.startsWith('rgb')) ? '1' : '0'};
    }
  }
`;

const StockInfo = styled.div`
  background: #f0fdf4;
  border: 1.5px solid #86efac;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StockLabel = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #166534;
`;

const StockValue = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: ${props => props.$disponible ? '#166534' : '#dc2626'};
`;

const GuideLink = styled.a`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: #262626;
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: var(--inmove-color);
    
    svg path {
      stroke: var(--inmove-color);
    }
  }
`;

const SizeIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// === Cantidad y Botón Carrito ===
const QuantityAndCartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  
  @media (max-width: 580px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1.5px solid var(--inmove-rosa-color);
  background: white;
  border-radius: 8px;
  padding: 0.4rem 0.75rem;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 1.2rem;
  font-weight: 400;
  color: #262626;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #F9FAFB;
    border-radius: 4px;
  }
  
  &:active {
    background: #F3F4F6;
  }
`;

const QuantityValue = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #262626;
  min-width: 30px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 12px 24px;
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
  gap: 10px;
  min-height: 48px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(218, 95, 139, 0.4);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #999;
  }
`;

const CartIcon = styled.svg`
  flex-shrink: 0;
`;

// === Features Grid ===
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #E49CC4;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: black;
  
  svg {
    color: black;
    
    path, circle {
      stroke: black;
    }
  }
`;

const FeatureText = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  color: #262626;
  font-weight: 500;
`;

// === Modal de Guía de Talles ===
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #E5E7EB;
`;

const ModalTitle = styled.h3`
  font-family: 'Onest', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #262626;
  margin: 0;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #F3F4F6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
  
  &:hover {
    background: #E5E7EB;
    color: #262626;
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: 2rem;
  overflow-y: auto;
  max-height: calc(80vh - 80px);
`;

const GuiaTallesText = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: #262626;
  white-space: pre-wrap;
  
  /* Estilo para listas si el texto las contiene */
  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin: 0.5rem 0;
  }
`;

const NoGuiaMessage = styled.div`
  font-family: 'Onest', sans-serif;
  font-size: 0.95rem;
  color: #999;
  text-align: center;
  padding: 2rem;
  font-style: italic;
`;