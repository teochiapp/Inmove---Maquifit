import React from 'react';
import styled from 'styled-components';
import LogoSection from './FooterComponents/LogoSection';
import NavigationSection from './FooterComponents/NavigationSection';
import ContactSection from './FooterComponents/ContactSection';
import CopyrightOnly from './FooterComponents/CopyrightOnly';
import ScrollToTopButton from './FooterComponents/ScrollToTopButton';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoSection />
        <NavigationSection />
        <ContactSection />
      </FooterContent>
      <CopyrightOnly />
      <ScrollToTopButton />
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
  color: white;
  padding: 3rem 2rem 1rem;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 2rem 1rem 1rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
`;
