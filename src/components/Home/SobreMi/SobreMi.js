import React from 'react';
import styled from 'styled-components';
import SobreMiContent from './SobreMiComponents/SobreMiContent';
import SobreMiImage from './SobreMiComponents/SobreMiImage';

const SobreMi = () => {
  return (
    <SobreMiContainer>
      <Container>
        <SobreMiImage />
        <SobreMiContent />
      </Container>
    </SobreMiContainer>
  );
};

export default SobreMi;

const SobreMiContainer = styled.section`
  padding: 5rem 2rem;
  background: var(--overlay-color);

  
  @media screen and (max-width: 768px) {
    padding: 4rem 2rem;

  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  align-items: start;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;

  }
`;