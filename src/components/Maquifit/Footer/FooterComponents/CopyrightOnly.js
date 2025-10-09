import React from 'react';
import styled from 'styled-components';

const CopyrightOnly = () => {
  return (
    <CopyrightContainer>
      <MutantoCopyright>
        Diseñada por <MutantoLink href="https://mutanto.com.ar" target="_blank" rel="noopener noreferrer">Mutanto</MutantoLink>.
      </MutantoCopyright>
      <SurCodesCopyright>
        Desarrollada por <SurCodesLink href="https://surcodes.com" target="_blank" rel="noopener noreferrer">SurCodes</SurCodesLink>.
      </SurCodesCopyright>
      <Copyright>
        © 2025 — Copyright, Todos los derechos reservados.
      </Copyright>
    </CopyrightContainer>
  );
};

export default CopyrightOnly;

const CopyrightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* centra horizontalmente */
  text-align: center; /* asegura que el texto esté alineado al centro */
  gap: 0.5rem;

  @media (max-width: 425px) {
    gap: 1rem;
  }
`;

const MutantoCopyright = styled.p`
  font-family: var(--copyright-font);
  font-weight: 400;
  font-size: 0.875rem;
  color: #262626;
  margin: 0;
`;

const SurCodesCopyright = styled.p`
  font-family: var(--copyright-font);
  font-weight: 400;
  font-size: 0.875rem;
  color: #262626;
  margin: 0;
`;

const Copyright = styled.p`
  font-family: var(--copyright-font);
  font-weight: 400;
  font-size: 0.875rem;
  color: #262626;
  margin: 0;
`;

const MutantoLink = styled.a`
  color: #262626;
  text-decoration: underline;
  font-weight: 400;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.7;
  }
`;

const SurCodesLink = styled.a`
  color: #262626;
  text-decoration: underline;
  font-weight: 400;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 0.7;
  }
`;
