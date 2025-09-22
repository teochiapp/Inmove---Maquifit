import React from 'react';
import styled from 'styled-components';

const CopyrightOnly = () => {
  return (
    <CopyrightContainer>
      <CopyrightText>
        © 2024 Maquifit. Todos los derechos reservados.
      </CopyrightText>
    </CopyrightContainer>
  );
};

export default CopyrightOnly;

const CopyrightContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #374151;
  text-align: center;
`;

const CopyrightText = styled.p`
  color: #9ca3af;
  font-size: 14px;
  margin: 0;
`;
