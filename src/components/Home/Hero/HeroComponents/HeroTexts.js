import React from "react";
import styled from "styled-components";


const HeroTexts = () => {
  return (
    <Texts>
      <Title>
        <div>Tu cuerpo,</div>
        <div>Tu mente,</div>
        <div>nuestro objetivo</div>
        <Subtitle>
          Entrenamiento y alimentación a tu medida.
        </Subtitle>
      </Title>
       <TextMobile> 
        <div>Tu cuerpo, tu</div>
        <div>mente, nuestro</div>
        <div>objetivo</div>
        </TextMobile>
        <CTAButton>
          <ButtonText>Empezá hoy!</ButtonText>
          <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
        </CTAButton>
    </Texts>
  );
};

export default HeroTexts;


const Texts = styled.div`
  color: var(--text-black);
  font-size: 92px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%;
  z-index:999;
  position: relative;
  left:100px;

 @media (max-width: 1500px) {
       font-size: 88px;
   
  }
  @media (max-width: 1400px) {
       
   left:45px;   
  }
   
  @media (max-width: 1300px) {
       font-size: 80px;
      
  }

    @media (max-width: 1200px) {
       font-size: 75px;
       
  }
        @media (max-width: 1110px) {
        font-size: 66px;
        position: relative;
        top: -27px;
        }

  @media (max-width: 1030px) {
        left:-10px; 
        }

  
   @media (max-width:992px) {
        left: 50%;
        top: -3%;
        transform: translate(-50%, -50%);
        }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-items: flex-start;


  
  @media (max-width:992px) {
        display:none;
        }
    
`;

const Subtitle = styled.span`
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  padding-top: 20px;
`;
const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position:relative;
  top : 160px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width:992px) { 
    
    transform: translate(-50%, -15%);
    top: 315px;
    left: 223px;
    z-index:999;
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  padding-right: 3px;

`;

const ArrowIcon = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
    background: var(--secondary-color);
    border-radius: 50%;
    padding: 6px;
    transform: rotate(0deg);
`;

const TextMobile = styled.div`

 display:none;


@media (max-width:992px) {
  display:flex;
 transform: translate(5%, -15%);
  flex-direction:column;
  text-align:center;
  font-size:60px;
  }

  @media (max-width:515px){
  font-weight:bold;
  font-size:45px;
  }

  @media (max-width:400px){
  font-size:40px;
  }
`


