import React from "react";
import styled from "styled-components";
import Header from '../Header/Header';
import HeroTexts from './HeroComponents/HeroTexts';
import HeroGirl from './HeroComponents/HeroGirl'

const Hero = () => {
  return (
    <HeroContainer>   
      <Header />
      <HeroTexts />
      <HeroGirl />
      <BackgroundsDiagonal />
      <BackgroundsDiagonalTwo />
    </HeroContainer>
  );
};

export default Hero;

const HeroContainer = styled.section`
  background: linear-gradient(180deg, #E1EEF7 0.03%, #C3D5DF 103.81%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 800px;
  padding-top: 80px;
  padding-left: 56px;
  padding-right: 56px;
  padding-bottom: 56px;

  @media (max-width: 1400px) {
   padding-left: 30px;
  }

@media (max-width: 992px) {
   height: 1000px;
  }
  
`;

const BackgroundsDiagonal = styled.div`
    position: absolute;
    right: -111.622px;
    top: 0.5px;
    border-radius: 1072.021px;
    background: linear-gradient(227deg, #A0C2DB 50.16%, #C3D5DF 69.47%);
    filter: blur(101.74297332763672px);
    width: 1150.021px;
    height: 800.586px;
    transform: rotate(-7.138deg);
`

const BackgroundsDiagonalTwo = styled.div`
 width: 1150.021px;
 height: 800.586px;
 transform: rotate(158.442deg);
 position: absolute;
 left: -52.937px;
 bottom: -117.124px;
 border-radius: 1074.895px;
 background: linear-gradient(227deg, #A0C2DB 50.16%, #C3D5DF 69.47%);
 filter: blur(102.01569366455078px);
`