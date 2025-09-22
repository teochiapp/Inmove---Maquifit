import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const CategoriaSection = ({ categoria, index }) => {
  return (
    <CategoriaContainer
      as={motion.div}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: index * 0.2
      }}
    >
      <CategoriaHeader $color={categoria.color}>
        <CategoriaTitle $color={categoria.color}>
          {categoria.nombre}
        </CategoriaTitle>
        <CategoriaDescription>
          {categoria.descripcion}
        </CategoriaDescription>
      </CategoriaHeader>

      <ProductosGrid>
        {categoria.productos.map((producto, productIndex) => (
          <ProductoCard 
            key={producto.id}
            as={motion.div}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: (index * 0.2) + (productIndex * 0.1)
            }}
          >
            <ProductoImagen>
              <ImagenPlaceholder>🛍️</ImagenPlaceholder>
            </ProductoImagen>
            <ProductoInfo>
              <ProductoNombre>{producto.nombre}</ProductoNombre>
              <ProductoPrecio $color={categoria.color}>
                ${producto.precio.toLocaleString("es-AR")}
              </ProductoPrecio>
            </ProductoInfo>
            <VerProductoButton $color={categoria.color}>
              Ver Producto
            </VerProductoButton>
          </ProductoCard>
        ))}
      </ProductosGrid>
    </CategoriaContainer>
  );
};

export default CategoriaSection;

const CategoriaContainer = styled.div`
  margin-bottom: 4rem;
`;

const CategoriaHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: ${(props) => props.$color}20;
  border-radius: 20px;
  border: 2px solid ${(props) => props.$color};
`;

const CategoriaTitle = styled.h3`
  font-size: 36px;
  font-weight: 700;
  color: ${(props) => props.$color};
  text-transform: uppercase;
  letter-spacing: 1.25px;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const CategoriaDescription = styled.p`
  color: var(--text-black);
  font-size: 18px;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ProductosGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  
  @media (max-width: 370px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ProductoCard = styled.div`
  background: #F9F8F3;
  border-radius: 20px;
  padding: 1.5rem;
  border: 2px solid rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProductoImagen = styled.div`
  width: 100%;
  height: 200px;
  background: #f0f0f0;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ImagenPlaceholder = styled.span`
  font-size: 3rem;
  opacity: 0.5;
`;

const ProductoInfo = styled.div`
  width: 100%;
`;

const ProductoNombre = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-black);
  margin-bottom: 0.5rem;
`;

const ProductoPrecio = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.$color};
`;

const VerProductoButton = styled.button`
  background: ${(props) => props.$color};
  border: none;
  border-radius: 100px;
  padding: 0.6rem 1.2rem;
  color: white;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }
`;
