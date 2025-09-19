import React from 'react';
import styled from 'styled-components';


const Logo = () => {
  return (
    <LogoContainer>
      <LogoIcon src="/logo.png" alt="Maquifit Logo" />
    </LogoContainer>
  );
};

export default Logo;


const LogoContainer = styled.div`
  display: flex;
`;

const LogoIcon = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  margin-left: 30px;
`;
