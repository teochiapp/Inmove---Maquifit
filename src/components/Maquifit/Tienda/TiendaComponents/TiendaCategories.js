import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCategoriasWithFallback } from '../../../../hooks/useCategorias';

const TiendaCategories = () => {
  const { categorias, loading } = useCategoriasWithFallback();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryClick = (categoriaSlug) => {
    setSelectedCategory(categoriaSlug);
    // Navegar al catálogo con la sección de la categoría
    navigate(`/#categoria-${categoriaSlug}`);
  };

  if (loading) {
    return (
      <CategoriesContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 1, 
          ease: "easeOut",
          delay: 0.3 
        }}
      >
        <LoadingText>Cargando categorías...</LoadingText>
      </CategoriesContainer>
    );
  }

  if (categorias.length === 0) {
    return null; // No mostrar nada si no hay categorías
  }

  return (
    <CategoriesContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 1, 
        ease: "easeOut",
        delay: 0.3 
      }}
    >
      {categorias.map((categoria) => (
        <CategoryButton 
          key={categoria.id}
          onClick={() => handleCategoryClick(categoria.slug)}
          $isActive={selectedCategory === categoria.slug}
        >
          {categoria.icono ? (
            <CategoryIcon 
              src={categoria.icono} 
              alt={categoria.nombre}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <CategoryIconPlaceholder>📦</CategoryIconPlaceholder>
          )}
          <CategoryText>{categoria.nombre}</CategoryText>
        </CategoryButton>
      ))}
    </CategoriesContainer>
  );
};

export default TiendaCategories;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, auto);
  width: 100%;
  gap: 0.75rem;
  padding: 0 6vw;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding-bottom: 30px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid ${props => props.$isActive ? 'var(--inmove-color)' : 'transparent'};
  border-radius: 100px;
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 100%;
  min-width: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media screen and (max-width: 768px) {
    padding: 10px 14px;
    min-height: 44px;
    gap: 0.5rem;
  }
`;

const CategoryIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
  filter: brightness(0) invert(1);
`;

const CategoryIconPlaceholder = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
  filter: brightness(0) invert(1);
`;

const CategoryText = styled.span`
  color: var(--text-white);
  font-weight: 400;
  font-size: clamp(16px, 2vw, 20px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: 768px) {
    font-size: clamp(14px, 4vw, 18px);
  }
`;

const LoadingText = styled.div`
  color: var(--text-white);
  font-family: 'Onest', sans-serif;
  font-size: 1rem;
  text-align: center;
  padding: 1rem;
`;
