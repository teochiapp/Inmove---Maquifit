import React from 'react';
import styled from 'styled-components';
import { useCategoriasWithFallback } from '../../../../hooks/useCategorias';

const NavigationSection = () => {
  const { categorias, loading } = useCategoriasWithFallback();

  return (
    <NavigationContainer>
      {/* Primera fila: Calzas, Remeras, Tops */}
      <NavRow>
        {loading ? (
          <LoadingText>Cargando categorías...</LoadingText>
        ) : categorias.length > 0 ? (
          <>
            {categorias.slice(0, 3).map((categoria) => (
              <React.Fragment key={categoria.id}>
                <NavLink href={`/catalogo#categoria-${categoria.slug}`}>
                  <CategoryIconContainer>
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
                  </CategoryIconContainer>
                  <CategoryName>{categoria.nombre}</CategoryName>
                </NavLink>
                <Separator>/</Separator>
              </React.Fragment>
            ))}
          </>
        ) : (
          <LoadingText>No hay categorías disponibles</LoadingText>
        )}
      </NavRow>
      
      {/* Segunda fila: Conjuntos, FAQ, Sobre Mi */}
      <NavRow>
        {categorias.length > 3 && (
          <>
            <NavLink href={`/catalogo#categoria-${categorias[3].slug}`}>
              <CategoryIconContainer>
                {categorias[3].icono ? (
                  <CategoryIcon 
                    src={categorias[3].icono} 
                    alt={categorias[3].nombre}
                    onError={(e) => {
                      console.warn(`❌ Error cargando icono para ${categorias[3].nombre}:`, categorias[3].icono);
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <CategoryIconPlaceholder>📦</CategoryIconPlaceholder>
                )}
              </CategoryIconContainer>
              <CategoryName>{categorias[3].nombre}</CategoryName>
            </NavLink>
            <Separator>/</Separator>
          </>
        )}
        
        <NavLink href="/#faq">FAQ</NavLink>
        <Separator>/</Separator>
        <NavLink href="/#sobre-mi">Sobre Mi</NavLink>
      </NavRow>
    </NavigationContainer>
  );
};

export default NavigationSection;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  
  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.3rem;
  }
  
  @media (max-width: 480px) {
    gap: 0.2rem;
  }
`;

const NavLink = styled.a`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: var(--text-white);
  text-decoration: none;
  transition: color 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: var(--inmove-rosa-color);
  }
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    gap: 0.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    gap: 0.25rem;
  }
`;

const CategoryIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: inherit;
`;

const CategoryIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  
  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
  
  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
  }
`;

const CategoryIconPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  opacity: 0.7;
  color: var(--text-white);
  
  @media (max-width: 768px) {
    width: 14px;
    height: 14px;
    font-size: 10px;
  }
  
  @media (max-width: 480px) {
    width: 12px;
    height: 12px;
    font-size: 9px;
  }
`;

const CategoryName = styled.span`
  white-space: nowrap;
  color: inherit;
`;

const Separator = styled.span`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: var(--inmove-rosa-color);
  user-select: none;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const LoadingText = styled.span`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: var(--text-white);
  opacity: 0.7;
  font-style: italic;
`;