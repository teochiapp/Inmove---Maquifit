import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useCategoriasWithFallback } from "../../../hooks/useCategorias";
import { useProductosByCategoria } from "../../../hooks/useProductos";
import { useNavigate } from "react-router-dom";
import { nombreToSlug } from "../../../utils/slugUtils";
import { useCarrito } from "../../../context/CarritoContext";
import CarritoModal from "../../Common/CarritoModal/CarritoModal";

const Productos = () => {
  const { categorias, loading: categoriasLoading } = useCategoriasWithFallback();
  const { productosByCategoria, loading: productosLoading, error } = useProductosByCategoria();
  const navigate = useNavigate();
  const { addItem, removeItem, updateQuantity, getItemQuantity, isInCart } = useCarrito();
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [productQuantities, setProductQuantities] = useState({});

  const loading = categoriasLoading || productosLoading;
  
  // Debug: ver qué productos hay por categoría
  console.log('🔍 Productos por categoría:', productosByCategoria);
  console.log('🔍 Categorías:', categorias);

  const getLocalQuantity = (productoId) => {
    return productQuantities[productoId] || 0;
  };

  const handleQuantityChange = (e, producto, change) => {
    e.stopPropagation();
    
    const currentQuantity = getLocalQuantity(producto.id);
    const newQuantity = Math.max(0, currentQuantity + change);
    
    setProductQuantities(prev => ({
      ...prev,
      [producto.id]: newQuantity
    }));
  };

  const handleQuantityInputChange = (e, producto) => {
    e.stopPropagation();
    
    const newQuantity = Math.max(0, parseInt(e.target.value) || 0);
    
    setProductQuantities(prev => ({
      ...prev,
      [producto.id]: newQuantity
    }));
  };

  const handleAddToCart = (e, producto) => {
    e.stopPropagation();
    
    const quantity = getLocalQuantity(producto.id);
    if (quantity <= 0) return;
    
    const productoParaCarrito = {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      talle: producto.talle,
      color: producto.color,
      imagen: producto.imagen
    };

    // Agregar la cantidad especificada al carrito
    for (let i = 0; i < quantity; i++) {
      addItem(productoParaCarrito);
    }

    // Guardar la cantidad antes de resetear
    setSelectedQuantity(quantity);
    
    setSelectedProduct(productoParaCarrito);
    setShowModal(true);
    
    // Resetear la cantidad local
    setProductQuantities(prev => ({
      ...prev,
      [producto.id]: 0
    }));
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setSelectedQuantity(1);
  };

  if (loading) {
    return (
      <ProductosSection>
        <Container>
          <LoadingMessage>Cargando productos...</LoadingMessage>
        </Container>
      </ProductosSection>
    );
  }

  if (error) {
    return (
      <ProductosSection>
        <Container>
          <ErrorMessage>Error al cargar productos: {error}</ErrorMessage>
        </Container>
      </ProductosSection>
    );
  }

  if (categorias.length === 0) {
    return (
      <ProductosSection>
        <Container>
          <ErrorMessage>No hay categorías disponibles. Configura categorías en Strapi.</ErrorMessage>
        </Container>
      </ProductosSection>
    );
  }

  return (
    <ProductosSection>
      <Container>      
        {categorias.map((categoria, index) => {
          const categoriaSlug = categoria.slug;
          const productosDeCategoria = productosByCategoria[categoriaSlug]?.productos || [];
          
          // No renderizar nada si la categoría no tiene productos
          if (productosDeCategoria.length === 0) {
            return null;
          }
          
          const mostrarBotones = productosDeCategoria.length > 4; // Desktop: más de 4
          const mostrarCarruselMobile = productosDeCategoria.length > 1; // Mobile: más de 1
          
          // Debug log
          console.log(`📦 Categoría: ${categoria.nombre} | Productos: ${productosDeCategoria.length} | Desktop Carrusel: ${mostrarBotones} | Mobile Carrusel: ${mostrarCarruselMobile}`);
          
          return (
            <CategoriaSection 
              key={categoria.id}
              id={`categoria-${categoria.slug}`}
              as={motion.section}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1
              }}
            >
              <CategoriaHeader>
                <CategoriaIconContainer>
                  {categoria.icono ? (
                    <CategoriaIcon 
                      src={categoria.icono} 
                      alt={categoria.nombre}
                      onError={(e) => {
                        console.warn(`❌ Error cargando icono para ${categoria.nombre}:`, categoria.icono);
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <CategoriaIconPlaceholder>📦</CategoriaIconPlaceholder>
                  )}
                </CategoriaIconContainer>
                <CategoriaTitle>{categoria.nombre}</CategoriaTitle>
              </CategoriaHeader>
              
              <CarruselContainer>
                {(mostrarBotones || mostrarCarruselMobile) && (
                  <CarruselButton 
                    $position="left"
                    $esCarruselDesktop={mostrarBotones} 
                    onClick={(e) => {
                      const carrusel = e.currentTarget.parentElement.querySelector('[data-carrusel]');
                      if (carrusel) {
                        const scrollAmount = carrusel.offsetWidth * 0.8;
                        carrusel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Anterior"
                  >
                    <svg viewBox="0 0 20 20" fill="none">
                      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </CarruselButton>
                )}
                
                <ProductosCarrusel data-carrusel $mostrarScroll={mostrarBotones} $mostrarCarruselMobile={mostrarCarruselMobile}>
                  {productosDeCategoria.map((producto) => (
                    <ProductoCard
                      key={producto.id}
                      onClick={() => {
                        const slug = nombreToSlug(producto.nombre);
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
                      }}
                      role="button"
                      aria-label={`Ver ${producto.nombre}`}
                    >
                      <ProductoImage>
                        {producto.imagen ? (
                          <ProductoImageSrc 
                            src={producto.imagen} 
                            alt={producto.nombre}
                            onError={(e) => {
                              console.warn(`❌ Error cargando imagen para ${producto.nombre}:`, producto.imagen);
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <ImagePlaceholder>🛍️</ImagePlaceholder>
                        )}
                      </ProductoImage>
                      <ProductoInfo>
                        <ProductoNombre>{producto.nombre}</ProductoNombre>
                        <ProductoDescripcion>{producto.descripcion}</ProductoDescripcion>
                        <ProductoDetalles>
                          {producto.talle && <ProductoDetalle>Talle: {producto.talle}</ProductoDetalle>}
                          {producto.color && <ProductoDetalle>Color: {producto.color}</ProductoDetalle>}
                        </ProductoDetalles>
                        <ProductoPrecio>
                          {producto.precio ? `$${producto.precio}` : 'Consultar precio'}
                        </ProductoPrecio>
                        <CartRow>
                          <QuantitySelector>
                            <QuantityButton onClick={(e) => handleQuantityChange(e, producto, -1)}>
                              −
                            </QuantityButton>
                            <QuantityInput
                              type="number"
                              value={getLocalQuantity(producto.id)}
                              onChange={(e) => handleQuantityInputChange(e, producto)}
                              min="0"
                            />
                            <QuantityButton onClick={(e) => handleQuantityChange(e, producto, 1)}>
                              +
                            </QuantityButton>
                          </QuantitySelector>
                          <CartIconButton 
                            onClick={(e) => handleAddToCart(e, producto)}
                            disabled={getLocalQuantity(producto.id) === 0}
                          >
                            <CartIcon>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.33333 14.6667C5.70152 14.6667 6 14.3682 6 14C6 13.6318 5.70152 13.3333 5.33333 13.3333C4.96514 13.3333 4.66667 13.6318 4.66667 14C4.66667 14.3682 4.96514 14.6667 5.33333 14.6667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12.6667 14.6667C13.0349 14.6667 13.3333 14.3682 13.3333 14C13.3333 13.6318 13.0349 13.3333 12.6667 13.3333C12.2985 13.3333 12 13.6318 12 14C12 14.3682 12.2985 14.6667 12.6667 14.6667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1.33333 2.66667L2.66667 2.66667L4.44 10.9467C4.50505 11.25 4.67378 11.5211 4.91714 11.7133C5.1605 11.9056 5.46327 12.0069 5.77333 12L12.2933 12C12.5968 12 12.891 11.896 13.1273 11.7057C13.3637 11.5154 13.528 11.2502 13.5933 10.9538L14.6933 6.00045L3.38 6.00045" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </CartIcon>
                          </CartIconButton>
                        </CartRow>
                      </ProductoInfo>
                    </ProductoCard>
                  ))}
                </ProductosCarrusel>
                
                {(mostrarBotones || mostrarCarruselMobile) && (
                  <CarruselButton 
                    $position="right"
                    $esCarruselDesktop={mostrarBotones} 
                    onClick={(e) => {
                      const carrusel = e.currentTarget.parentElement.querySelector('[data-carrusel]');
                      if (carrusel) {
                        const scrollAmount = carrusel.offsetWidth * 0.8;
                        carrusel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Siguiente"
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </CarruselButton>
                )}
              </CarruselContainer>
            </CategoriaSection>
          );
        })}
      </Container>
      
      <CarritoModal 
        isOpen={showModal}
        onClose={handleCloseModal}
        producto={selectedProduct}
        cantidad={selectedQuantity}
      />
    </ProductosSection>
  );
};

export default Productos;

const ProductosSection = styled.section`
  padding: 4rem 2rem;
  background: #F9F8F3;
  
  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-size: 1.2rem;
  padding: 3rem 0;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #6b7280;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  padding: 3rem 0;
  font-style: italic;
`;

const CategoriaSection = styled.section`
  margin-bottom: 4rem;
  overflow: visible;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoriaHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  flex-direction: column;
  margin-bottom: 2rem;
  border-left: 3px solid var(--inmove-color);
  padding-left: 1.5rem;
  
  @media (max-width: 768px) {
    border-left-width: 3px;
    padding-left: 1rem;
  }
  
  @media (max-width: 480px) {
    border-left-width: 2px;
    padding-left: 0.75rem;
  }
`;

const CategoriaIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoriaIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const CategoriaIconPlaceholder = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  opacity: 0.6;
`;

const CategoriaTitle = styled.h2`
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 2rem;
  color: var(--text-black);
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const CarruselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
  
  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const ProductosCarrusel = styled.div`
  /* Carrusel mode cuando hay más de 4 productos en DESKTOP */
  ${props => props.$mostrarScroll ? `
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    scroll-behavior: smooth;
    gap: 2rem;
    width: 100%;
    padding: 1rem 0;
    
    /* Ocultar scrollbar completamente */
    scrollbar-width: none;
    -ms-overflow-style: none;
    
    &::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
    }
    
    /* Scroll suave con snap */
    scroll-snap-type: x mandatory;
    
    & > * {
      flex: 0 0 calc(25% - 1.5rem);
      min-width: 280px;
      max-width: calc(25% - 1.5rem);
      scroll-snap-align: start;
    }
    
    @media (max-width: 1200px) {
      gap: 1.5rem;
      
      & > * {
        flex: 0 0 calc(33.333% - 1rem);
        min-width: 250px;
        max-width: calc(33.333% - 1rem);
      }
    }
  ` : `
    /* Grid mode cuando hay 4 o menos productos en DESKTOP */
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
  `}
  
  /* En MOBILE siempre carrusel si hay más de 1 producto */
  @media (max-width: 768px) {
    display: ${props => props.$mostrarCarruselMobile ? 'flex' : 'grid'};
    
    ${props => props.$mostrarCarruselMobile && `
      flex-wrap: nowrap;
      overflow-x: scroll;
      scroll-behavior: smooth;
      gap: 1.5rem;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-snap-type: x mandatory;
      
      &::-webkit-scrollbar {
        display: none;
      }
      
      & > * {
        flex: 0 0 calc(50% - 0.75rem);
        min-width: 200px;
        max-width: calc(50% - 0.75rem);
        scroll-snap-align: start;
      }
    `}
    
    ${props => !props.$mostrarCarruselMobile && `
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
    `}
  }
  
  @media (max-width: 480px) {
    ${props => props.$mostrarCarruselMobile ? `
      display: flex;
      flex-wrap: nowrap;
      overflow-x: scroll;
      scroll-behavior: smooth;
      gap: 1rem;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-snap-type: x mandatory;
      
      &::-webkit-scrollbar {
        display: none;
      }
      
      & > * {
        flex: 0 0 calc(100% - 0.5rem);
        min-width: calc(100% - 0.5rem);
        max-width: calc(100% - 0.5rem);
        scroll-snap-align: start;
      }
    ` : `
      grid-template-columns: 1fr;
      gap: 1rem;
    `}
  }
`;

const CarruselButton = styled.button`
  position: absolute;
  top: 185px; /* Centrado con la imagen de 370px (370px / 2 = 185px) */
  ${props => props.$position === 'left' ? 'left: -25px;' : 'right: -25px;'}
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  color: var(--inmove-color);
  opacity: 0.7;
  
  svg {
    width: 30px;
    height: 30px;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    opacity: 1;
    transform: translateY(-50%) scale(1.2);
    
    svg {
      transform: ${props => props.$position === 'left' ? 'translateX(-3px)' : 'translateX(3px)'};
    }
  }
  
  &:active {
    transform: translateY(-50%) scale(1);
    opacity: 0.8;
    
    svg {
      transform: ${props => props.$position === 'left' ? 'translateX(-1px)' : 'translateX(1px)'};
    }
  }
  
  /* En desktop: mostrar solo cuando hay más de 4 productos */
  @media (min-width: 769px) {
    display: ${props => props.$esCarruselDesktop ? 'flex' : 'none'};
  }
  
  @media (max-width: 1400px) {
    ${props => props.$position === 'left' ? 'left: -20px;' : 'right: -20px;'}
  }
  
  @media (max-width: 1200px) {
    ${props => props.$position === 'left' ? 'left: -15px;' : 'right: -15px;'}
    width: 45px;
    height: 45px;
    
    svg {
      width: 26px;
      height: 26px;
    }
  }
  
  @media (max-width: 768px) {
    ${props => props.$position === 'left' ? 'left: 5px;' : 'right: 5px;'}
    width: 40px;
    height: 40px;
    /* Centrado en toda la card */
    top: 50%;
    display: flex; /* Siempre visible en mobile si el botón se renderiza */
    
    svg {
      width: 22px;
      height: 22px;
    }
  }
  
  @media (max-width: 480px) {
    ${props => props.$position === 'left' ? 'left: 0;' : 'right: 0;'}
    width: 35px;
    height: 35px;
    /* Centrado en toda la card */
    top: 50%;
    display: flex; /* Siempre visible en mobile si el botón se renderiza */
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const ProductoCard = styled.div`
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  max-width: 350px;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const ProductoImage = styled.div`
  width: 100%;
  border-radius: 24px;
  height: 370px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const ProductoImageSrc = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  font-size: 3rem;
  opacity: 0.3;
`;

const ProductoInfo = styled.div`
  padding: 1.5rem;
`;

const ProductoNombre = styled.h3`
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text-black);
  margin: 0 0 0.5rem 0;
`;

const ProductoDescripcion = styled.p`
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  color: #807D7E;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
`;

const ProductoDetalles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const ProductoDetalle = styled.span`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 0.85rem;
  color: #6b7280;
`;

const ProductoPrecio = styled.div`
  background: #DA5F8B1A;
  color: var(--inmove-color);
  padding: 10px 12px;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

const CartRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const CartIconButton = styled.button`
  width: 40px;
  height: 40px;
  background: var(--inmove-rosa-color);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  
  &:hover:not(:disabled) {
    background: var(--inmove-color);
    transform: scale(1.1);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.95);
    transition: all 0.1s ease;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const CartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 18px;
    height: 18px;
    color: white;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(218, 95, 139, 0.1);
  border-radius: 25px;
  padding: 0.4rem;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: var(--inmove-rosa-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--inmove-color);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.9);
    transition: all 0.1s ease;
  }
`;

const QuantityInput = styled.input`
  width: 45px;
  height: 32px;
  border: none;
  background: transparent;
  text-align: center;
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: var(--inmove-color);
  
  &:focus {
    outline: none;
  }
  
  /* Ocultar las flechas del input number */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;
