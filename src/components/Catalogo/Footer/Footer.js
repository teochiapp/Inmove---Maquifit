import React from "react";
import styled from "styled-components";
import LogoSection from "./FooterComponents/LogoSection";
import NavigationSection from "./FooterComponents/NavigationSection";
import ContactSection from "./FooterComponents/ContactSection";
import CopyrightOnly from "./FooterComponents/CopyrightOnly";
import BottomSection from "./FooterComponents/BottomSection";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection />
        <NavigationSection />
        <ContactSection />
      </FooterContent>
      <BottomSection />
      <MobileCopyright>
        <CopyrightOnly />
      </MobileCopyright>
      <BackToTopButton onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} aria-label="Volver arriba">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </BackToTopButton>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: rgba(26, 31, 34, 1);
  padding: 3rem 6rem 2rem;
  position: relative;
  border-radius: 42px;
  margin: 1rem;

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
  justify-content: space-between;
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
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    text-align: center;
    width: 100%;
  }
`;

const BackToTopButton = styled.button`
  position: fixed;
  right: 35px;
  bottom: 35px;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: var(--inmove-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease;
  z-index: 2000;
  opacity: 0.9;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25);
    opacity: 1;
  }

  &:active {
    transform: translateY(0);
  }

  color: #fff; /* currentColor para el SVG */

  svg {
    display: block;
  }

  svg path {
    stroke: #fff !important;
  }

  @media (max-width: 768px) {
    right: 16px;
    bottom: 16px;
    width: 44px;
    height: 44px;
  }
`;
