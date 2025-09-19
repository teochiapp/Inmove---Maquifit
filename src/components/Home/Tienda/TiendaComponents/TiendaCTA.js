import React from 'react';
import styled from 'styled-components';

const TiendaCTA = () => {
  return (
    <CTAButton>
      <ButtonText>Ir a la tienda</ButtonText>
      <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
    </CTAButton>
  );
};

export default TiendaCTA;

const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  padding-right: 3px;
`;

const ArrowIcon = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
    background: var(--secondary-color);
    border-radius: 50%;
    padding: 6px;
`;
