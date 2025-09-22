import React from 'react';
import styled from 'styled-components';

const CopyrightOnly = () => {
  return (
    <CopyrightContainer>
      <Copyright>
      Diseñada por Mutanto.  © 2025 — Copyright
      </Copyright>
      <SurCodesCopyright>
        Desarrollada por SurCodes. © 2025 — Copyright
      </SurCodesCopyright>
    </CopyrightContainer>
  );
};

export default CopyrightOnly;

const CopyrightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  @media (max-widht:425px){

  gap:1rem;
  }
`;

const Copyright = styled.p`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #262626;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const SurCodesCopyright = styled.p`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #262626;
  margin: 0;
  text-align: center;
`;

const MutantuLogo = styled.span`
  width: 16px;
  height: 16px;
  background-color: #E04A4A;
  border-radius: 50%;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.125rem;
`;
