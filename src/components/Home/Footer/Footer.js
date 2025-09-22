import React from "react";
import styled from "styled-components";
import LogoSection from "./FooterComponents/LogoSection";
import NavigationSection from "./FooterComponents/NavigationSection";
import ContactSection from "./FooterComponents/ContactSection";
import ScrollToTopButton from "./FooterComponents/ScrollToTopButton";
import CopyrightOnly from "./FooterComponents/CopyrightOnly";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection />
        <NavigationSection />
        <ContactSection />
      </FooterContent>
      <MobileCopyright>
        <CopyrightOnly />
      </MobileCopyright>
      <ScrollToTopButton />
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #efeee8;
  padding: 3rem 6rem 2rem;
  position: relative;
  border-radius: 20px;
  margin: 3rem;

  @media (max-width: 1400px) {
    padding: 3rem 4rem 2rem;
  }

  @media (max-width: 1200px) {
    padding: 3rem 3rem 2rem;
    
  }
  @media (max-width: 1000px) {
    
       margin: 1rem; 
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 2rem;
    margin: 2rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  gap: 3rem;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    gap: 2.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const MobileCopyright = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    max-width: 1200px;
    margin: 2rem auto 0;
    padding: 2rem 0 0;
    border-top: 1px solid rgba(176, 136, 224, 0.2);
    text-align: center;
    width: 100%;
  }
`;
