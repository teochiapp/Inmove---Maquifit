import React from 'react';
import styled from 'styled-components';

const BottomSection = () => {
  return (
    <BottomContainer>
      <MutantoCopyright>
        Diseñada por <MutantoLink href="https://mutanto.com.ar" target="_blank" rel="noopener noreferrer">Mutanto</MutantoLink>
      </MutantoCopyright>
      
      <Copyright>
        © 2025 — Copyright, Todos los derechos reservados.
      </Copyright>
      
      <SurCodesCopyright>
        Desarrollada por <SurCodesLink href="https://surcodes.com" target="_blank" rel="noopener noreferrer">SurCodes</SurCodesLink>
      </SurCodesCopyright>
    </BottomContainer>
  );
};

export default BottomSection;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 2rem 0 0;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }
`;

const MutantoCopyright = styled.p`
  font-family: var(--copyright-font);
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--text-white);
  margin: 0;
  flex: 1;
  text-align: left;
`;

const SurCodesCopyright = styled.p`
  font-family: var(--copyright-font);
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--text-white);
  margin: 0;
  flex: 1;
  text-align: right;
`;

const Copyright = styled.p`
  font-family: var(--copyright-font);
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--text-white);
  margin: 0;
  flex: 1;
  text-align: center;
`;

const MutantoLink = styled.a`
  color: var(--text-white);
  text-decoration: underline;
  font-weight: 400;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--inmove-rosa-color);
  }
`;

const SurCodesLink = styled.a`
  color: var(--text-white);
  text-decoration: underline;
  font-weight: 400;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--inmove-rosa-color);
  }
`;
