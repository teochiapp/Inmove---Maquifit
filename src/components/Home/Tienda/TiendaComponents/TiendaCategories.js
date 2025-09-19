import React, { useState } from 'react';
import styled from 'styled-components';

const TiendaCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState('calzas');

  const categories = [
    { id: 'calzas', name: 'Calzas', icon: '/home/tienda/calzas.png' },
    { id: 'remeras', name: 'Remeras', icon: '/home/tienda/remeras.png' },
    { id: 'tops', name: 'Tops', icon: '/home/tienda/tops.png' },
    { id: 'conjuntos', name: 'Conjuntos', icon: '/home/tienda/vestidos.png' }
  ];

  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <CategoryButton 
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
        >
          <CategoryIcon src={category.icon} alt={category.name} />
          <CategoryText>{category.name}</CategoryText>
        </CategoryButton>
      ))}
    </CategoriesContainer>
  );
};

export default TiendaCategories;

const CategoriesContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.75rem;
  padding: 0 6vw;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 30px;
  }
`;

const CategoryButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid transparent;
  border-radius: 100px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  height: 56px;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  flex: 1;
  min-width: 0;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
    flex: none;
    gap: 1rem;
  }
`;

const CategoryIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const CategoryText = styled.span`
  color: var(--text-white);
  font-weight: 400;
  font-size: 20px;
`;
