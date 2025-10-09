import React from 'react';
import styled from 'styled-components';

const TiendaLogo = () => {
  return (
    <LogoSection>
      <LogoIcon src="/home/tienda/inmove-icon.png" alt="In Move Logo" />
    </LogoSection>
  );
};

export default TiendaLogo;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const LogoIcon = styled.img`
  width: 143px;
  object-fit: contain;
`;
