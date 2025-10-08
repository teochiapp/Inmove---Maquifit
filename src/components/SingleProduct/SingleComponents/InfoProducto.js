import React, { useState } from 'react';
import styled from 'styled-components';
import { useCarrito } from '../../../context/CarritoContext';
import CarritoModal from '../../Common/CarritoModal/CarritoModal';

const InfoProducto = ({
  imageUrl,
  imageAlt,
  productoView,
  productoNombre,
  attributes,
  productoId
}) => {
  const { addItem } = useCarrito();
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    const producto = {
      id: productoId,
      nombre: productoView?.nombre || productoNombre,
      descripcion: productoView?.descripcion || attributes.Descripcion || '',
      precio: productoView?.precio || attributes.Precio || '0',
      talle: productoView?.talle || attributes.Talle || '',
      color: productoView?.color || attributes.Color || '',
      imagen: imageUrl
    };

    addItem(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
<ProductDetails>
  {/* Columna izquierda */}
  <GalleryContainer>
    <Thumbnails>
      <Thumbnail src="/catalogo/thumb1.webp" />
      <Thumbnail src="/catalogo/thumb2.webp" />
      <Thumbnail src="/catalogo/thumb3.webp" />
    </Thumbnails>
    <ProductImageContainer>
      <ProductImage src={imageUrl} alt={imageAlt} />
    </ProductImageContainer>
  </GalleryContainer>

  {/* Columna derecha */}
  <ProductInfo>
    <ProductTitle>{productoView?.nombre || productoNombre}</ProductTitle>
    <ProductDescription>
      {productoView?.descripcion || attributes.Descripcion || 'Descripción del producto.'}
    </ProductDescription>
    <ProductPrice>
      {productoView?.precio || attributes.Precio
        ? `$${productoView?.precio || attributes.Precio}`
        : 'Consultar precio'}
    </ProductPrice>

    {/* Talles */}
    <SectionLabel>Selecciona tu talle</SectionLabel>
    <SizeOptions>
      <SizeButton>S</SizeButton>
      <SizeButton active>M</SizeButton>
      <SizeButton>L</SizeButton>
    </SizeOptions>

    {/* Colores */}
    <SectionLabel>Colores Disponibles</SectionLabel>
    <ColorOptions>
      <ColorCircle color="#F59E0B" />
      <ColorCircle color="#EF4444" />
      <ColorCircle color="#EC4899" />
      <ColorCircle color="#8B5CF6" />
    </ColorOptions>

    <GuideLink href="#">📏 Guía de talles</GuideLink>

    {/* Cantidad + carrito */}
    <QuantityAndCartRow>
      <QuantityContainer>
        <QuantityButton>-</QuantityButton>
        <QuantityValue>1</QuantityValue>
        <QuantityButton>+</QuantityButton>
      </QuantityContainer>
      
      <AddToCartButton onClick={handleAddToCart}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M5.33333 14.6667C5.70152 14.6667 6 14.3682 6 14C6 13.6318 5.70152 13.3333 5.33333 13.3333C4.96514 13.3333 4.66667 13.6318 4.66667 14C4.66667 14.3682 4.96514 14.6667 5.33333 14.6667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12.6667 14.6667C13.0349 14.6667 13.3333 14.3682 13.3333 14C13.3333 13.6318 13.0349 13.3333 12.6667 13.3333C12.2985 13.3333 12 13.6318 12 14C12 14.3682 12.2985 14.6667 12.6667 14.6667Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.33333 2.66667L2.66667 2.66667L4.44 10.9467C4.50505 11.25 4.67378 11.5211 4.91714 11.7133C5.1605 11.9056 5.46327 12.0069 5.77333 12L12.2933 12C12.5968 12 12.891 11.896 13.1273 11.7057C13.3637 11.5154 13.528 11.2502 13.5933 10.9538L14.6933 6.00045L3.38 6.00045" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Añadir al carrito
      </AddToCartButton>
    </QuantityAndCartRow>

    {/* Bullets de detalles */}
    <BulletList>
      <Bullet>✔ Lorem ipsum</Bullet>
      <Bullet>✔ Lorem ipsum</Bullet>
      <Bullet>✔ Lorem ipsum</Bullet>
    </BulletList>
  </ProductInfo>
</ProductDetails>

  );
};

export default InfoProducto;

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






const AddToCartButton = styled.button`
  padding: 12px 40px;
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
  gap: 12px;
  flex: 1;
  
  &:hover {
    background: var(--inmove-rosa-color);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;



const GalleryContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;

  &:hover {
    border-color: var(--inmove-color);
  }
`;

const SectionLabel = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 1rem 0 0.5rem;
  color: #444;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SizeButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: ${({ active }) => (active ? "var(--inmove-color)" : "white")};
  color: ${({ active }) => (active ? "white" : "#444")};
  font-weight: 600;
  cursor: pointer;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ColorCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ color }) => color};
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 0 0 1px #ccc;
`;

const GuideLink = styled.a`
  font-size: 0.9rem;
  color: var(--inmove-color);
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 1.5rem;
  display: inline-block;
`;

const QuantityAndCartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.5rem 0;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

const QuantityValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const BulletList = styled.ul`
  margin-top: 2rem;
  list-style: none;
  padding: 0;
`;

const Bullet = styled.li`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #444;
`;