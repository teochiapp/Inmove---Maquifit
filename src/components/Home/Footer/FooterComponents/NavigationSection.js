import React from 'react';
import styled from 'styled-components';

const NavigationSection = () => {
  return (
    <NavigationContainer>
      <NavRow>
        <NavLink href="#hero">Inicio</NavLink>
        <Separator>/</Separator>
        <NavLink href="#sobre-mi ">Sobre Mi</NavLink>
        <Separator>/</Separator>
        <NavLink href="#beneficios">Cambios</NavLink>
      </NavRow>
      <NavRow>
        <NavLink href="#planes">Planes</NavLink>
        <Separator>/</Separator>
        <NavLink href="#team">App Maquifit</NavLink>
        <Separator>/</Separator>
        <NavLink href="#contacto">Contacto</NavLink>
      </NavRow>
    </NavigationContainer>
  );
};

export default NavigationSection;

const NavigationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const NavLink = styled.a`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #262626;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #B088E0;
  }
`;

const Separator = styled.span`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #B088E0;
  user-select: none;
`;
