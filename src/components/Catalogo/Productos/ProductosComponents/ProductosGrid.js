import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const ProductosGrid = ({ categorias }) => {
  return (
    <GridContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
        ease: "easeOut",
        delay: window.innerWidth <= 768 ? 0.1 : 0.3 
      }}
    >
      {categorias.map((categoria, index) => (
        <CategoriaCard 
          key={categoria.id} 
          $color={categoria.color}
          as={motion.div}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            delay: index * 0.1
          }}
        >
          <CategoriaIcon $color={categoria.color}>
            <IconPlaceholder>📦</IconPlaceholder>
          </CategoriaIcon>
          <CategoriaTitle $color={categoria.color}>
            {categoria.nombre}
          </CategoriaTitle>
          <CategoriaDescription>
            {categoria.descripcion}
          </CategoriaDescription>
          <VerProductosButton $color={categoria.color}>
            Ver Productos
          </VerProductosButton>
        </CategoriaCard>
      ))}
    </GridContainer>
  );
};

export default ProductosGrid;

const GridContainer = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  
  @media (max-width: 370px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CategoriaCard = styled.div`
  background: #F9F8F3;
  border-radius: 30px;
  padding: 2.5rem 2rem;
  border: 2.5px solid ${(props) => props.$color};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  position: relative;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 370px) {
    padding: 2rem 1.5rem;
  }
`;

const CategoriaIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${(props) => props.$color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const IconPlaceholder = styled.span`
  font-size: 2rem;
`;

const CategoriaTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => props.$color};
  text-transform: uppercase;
  letter-spacing: 1.25px;
  margin-bottom: 0.5rem;
`;

const CategoriaDescription = styled.p`
  text-align: center;
  color: var(--text-black);
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 1.5rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const VerProductosButton = styled.button`
  background: ${(props) => props.$color};
  border: none;
  border-radius: 100px;
  padding: 0.75rem 1.5rem;
  color: white;
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 0.6rem 1.2rem;
  }
`;
