import React from "react";
import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

const Hero = () => {
  return (
    <HeroContainer>
      <HeroCirclepinkOne />
      <HeroContent>
        <LeftSection>
          <WomanImage src="/catalogo/hero-girl.webp" alt="Mujer entrenando" />
        </LeftSection>

        <RightSection>
          <TextContent>
            <MainTitle>
              Entrená con
              <br />
              estilo,{" "}
              <strong>
                activá tu
                <br />
                modo InMove.
              </strong>
            </MainTitle>
            <Subtitle>
              Descubrí la colección de In Move y llevá tu energía a otro nivel.
            </Subtitle>
            <CTAButton>
              <ButtonText>Ver colección</ButtonText>
              <SearchIconContainer>
                <svg viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8333 9.60246C15.8333 13.2844 12.8486 16.2691 9.16667 16.2691C5.48477 16.2691 2.5 13.2844 2.5 9.60246C2.5 5.92056 5.48477 2.93579 9.16667 2.93579C12.8486 2.93579 15.8333 5.92056 15.8333 9.60246Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5003 17.9358L13.917 14.3524" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SearchIconContainer>
            </CTAButton>
          </TextContent>
        </RightSection>
      </HeroContent>
      <HeroCirclepinkTwo />
    </HeroContainer>
  );
};

export default Hero;

// ------------------ ESTILOS ------------------

const HeroContainer = styled.section`
  background: rgba(228, 156, 196, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100vw;

  @media (max-width: 1400px) {
    padding: 50px 40px 0px;
  }

  @media (max-width: 1200px) {
    padding: 40px 30px 0px;
  }

  @media (max-width: 992px) {
    padding: 40px 24px 0px;
  }

  @media (max-width: 768px) {
    padding: 90px 20px 0px;
  }

  @media (max-width: 480px) {
    padding: 90px 16px 0px;
  }
`;

const HeroCirclepinkOne = styled.div`
  position: absolute;
  top: -14.1%;
  right: -24.6%;
  z-index: 1;
  background: radial-gradient(#da5f8b 40.16%, transparent 69.47%);
  width: 128.2%;
  height: 101.8%;
  border-radius: 100%;
  transform: rotate(158deg);

  @media (max-width: 1200px) {
    width: 100%;
    height: 80%;
    top: -10%;
    right: -20%;
  }

  @media (max-width: 992px) {
    width: 90%;
    height: 70%;
    top: -8%;
    right: -30%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 77%;
    top: -6%;
    right: -25%;
    transform: rotate(35deg);
  }

  @media (max-width: 480px) {
    top: -5%;
    right: -22%;
  }
`;

const HeroCirclepinkTwo = styled.div`
  position: absolute;
  bottom: -23.1%;
  left: -18.7%;
  z-index: 1;
  background: radial-gradient(#da5f8b 40.16%, transparent 69.47%);
  width: 128.2%;
  height: 101.8%;
  border-radius: 100%;
  transform: rotate(158deg);

  @media (max-width: 1200px) {
    width: 100%;
    height: 80%;
    bottom: -18%;
    left: -15%;
  }

  @media (max-width: 992px) {
    width: 90%;
    height: 70%;
    bottom: -15%;
    left: -25%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 77%;
    bottom: -12%;
    left: -22%;
    transform: rotate(35deg);
  }

  @media (max-width: 480px) {
    bottom: -10%;
    left: -20%;
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 100px;
  z-index: 2;
  position: relative;
  min-height: 744px;

  @media (max-width: 1400px) {
    gap: 80px;
    min-height: 650px;
  }

  @media (max-width: 1200px) {
    gap: 60px;
    min-height: 580px;
  }

  @media (max-width: 992px) {
    gap: 50px;
    min-height: 500px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    align-items: center;
    min-height: auto;
  }

`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-self: flex-end; /* Siempre al fondo */

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    align-self: flex-end;
  }
`;

const WomanImage = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 667px;
  object-fit: contain;
  object-position: bottom;

  @media (max-width: 1400px) {
    max-height: 580px;
  }

  @media (max-width: 1200px) {
    max-height: 520px;
  }

  @media (max-width: 992px) {
    max-height: 450px;
  }

  @media (max-width: 768px) {
    max-height: 350px;
  }

  @media (max-width: 480px) {
    max-height: 280px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 660px;

  @media (max-width: 1400px) {
    height: 580px;
  }

  @media (max-width: 1200px) {
    height: 520px;
  }

  @media (max-width: 992px) {
    height: 450px;
  }

  @media (max-width: 768px) {
    order: 1;
    height: auto;
    width: 100%;
  }
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 600px;
  font-family: --copyright-font;

  @media (max-width: 1200px) {
    max-width: 500px;
    gap: 20px;
  }

  @media (max-width: 992px) {
    max-width: 450px;
    gap: 18px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 14px;
    max-width: 320px;
  }
`;

const MainTitle = styled.h1`
  font-size: 70px;
  font-weight: 400;
  color: white;
  line-height: 1.35;
  margin: 0;

  @media (max-width: 1400px) {
    font-size: 60px;
    line-height: 90px;
  }

  @media (max-width: 1200px) {
    font-size: 52px;
    line-height: 78px;
  }

  @media (max-width: 992px) {
    font-size: 44px;
    line-height: 66px;
  }

  @media (max-width: 768px) {
    font-size: 36px;
    line-height: 54px;
  }

  @media (max-width: 480px) {
    font-size: 40px;
    line-height: 42px;
    margin-top: 30px;
  }

  @media (max-width: 360px) {
    font-size: 30px;
    line-height: 36px;
  }

  strong {
    font-weight: bold;
    color: white;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  font-weight: normal;
  color: white;
  line-height: 1.5;
  margin: 0;

  @media (max-width: 1400px) {
    font-size: 1.2rem;
  }

  @media (max-width: 1200px) {
    font-size: 1.1rem;
  }

  @media (max-width: 992px) {
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    align-self: center;
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  padding-right: 3px;
`;

const SearchIconContainer = styled.div`
  width: 32px;
  height: 32px;
  background: var(--inmove-rosa-color);
  border-radius: 50%;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 100%;
    height: 100%;
    color: var(--text-black);
  }
`;
