import React from "react";
import styled from "styled-components";
import PlanesContent from './PlanesComponents/PlanesContent';
import PlanesImage from './PlanesComponents/PlanesImage';

const Planes = () => {
  return (
    <PlanesSection>
      <ContentWrapper>
        <PlanesContent />

        <PlanesImage />
      </ContentWrapper>
    </PlanesSection>
  );
};

export default Planes;

// -------- Styled Components -------- //

const PlanesSection = styled.section`
  background: linear-gradient(176.76deg, #C9DDE6 1.64%, #C7DBE4 35.87%, #C8DCE5 63.98%, #DCE6EE 87.65%);
  padding: 6rem 2rem;
  min-height: 70vh;
  position: relative;
  overflow: visible;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
    min-height: auto;
    overflow: hidden;
  }
  
  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;


  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0rem;
  }
`;
