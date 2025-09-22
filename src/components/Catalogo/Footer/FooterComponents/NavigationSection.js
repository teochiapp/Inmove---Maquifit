import React from 'react';
import styled from 'styled-components';

const NavigationSection = () => {
  return (
    <NavigationContainer>
      <SectionTitle>Enlaces Rápidos</SectionTitle>
      <NavLinks>
        <NavLink href="#hero">Inicio</NavLink>
        <NavLink href="#productos">Productos</NavLink>
        <NavLink href="#categorias">Categorías</NavLink>
        <NavLink href="#sobre-mi">Sobre Mi</NavLink>
        <NavLink href="#strapi">Strapi</NavLink>
        <NavLink href="#planes">Planes</NavLink>
        <NavLink href="#faq">FAQ</NavLink>
      </NavLinks>
    </NavigationContainer>
  );
};

export default NavigationSection;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 1rem 0;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled.a`
  color: #d1d5db;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;
