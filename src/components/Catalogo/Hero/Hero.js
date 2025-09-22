import React from "react";
import styled from "styled-components";
import HeroContent from './HeroComponents/HeroContent';

const Hero = () => {
  return (
    <HeroContainer>   
      <HeroContent />
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.section`
  background: linear-gradient(180deg, #E1EEF7 0.03%, #C3D5DF 103.81%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  height: 600px;
  padding-top: 120px;
  padding-left: 56px;
  padding-right: 56px;
  padding-bottom: 56px;
  width: 100%;
  max-width: 100vw;

  @media (max-width: 1400px) {
   padding-left: 30px;
  }

  @media (max-width: 992px) {
   height: 500px;
   padding-top: 100px;
  }
  
  @media (max-width: 768px) {
    height: 400px;
    padding: 80px 20px 40px;
  }
`;
