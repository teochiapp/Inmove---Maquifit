import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Hook para detectar la sección activa
  useEffect(() => {
    const sections = ['hero', 'sobre-mi', 'beneficios', 'planes', 'team'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset para el header fijo
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Llamar una vez al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderContainer>
        <LogoSection>
          <Logo />
        </LogoSection>
        
        <Navigation>
          <NavLink href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Inicio</NavLink>
          <NavLink href="#sobre-mi" className={activeSection === 'sobre-mi' ? 'active' : ''}>Sobre Mi</NavLink>
          <NavLink href="#beneficios" className={activeSection === 'beneficios' ? 'active' : ''}>Cambios</NavLink>
          <NavLink href="#planes" className={activeSection === 'planes' ? 'active' : ''}>Planes</NavLink>
          <NavLink href="#team" className={activeSection === 'team' ? 'active' : ''}>App Team Maquifit</NavLink>
        </Navigation>
        
        <ContactSection>
          <ContactButton>
            <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
            Contacto
          </ContactButton>
        </ContactSection>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          <MenuLine />
          <MenuLine />
          <MenuLine />
        </MobileMenuButton>
      </HeaderContainer>
      
      <MobileMenu $isOpen={isMobileMenuOpen} onClick={closeMobileMenu}>
        <MobileMenuContent onClick={(e) => e.stopPropagation()}>
          <MobileNavLink href="#hero" className={activeSection === 'hero' ? 'active' : ''} onClick={closeMobileMenu}>
            Inicio
          </MobileNavLink>
          <MobileNavLink href="#sobre-mi" className={activeSection === 'sobre-mi' ? 'active' : ''} onClick={closeMobileMenu}>
            Sobre Mi
          </MobileNavLink>
          <MobileNavLink href="#beneficios" className={activeSection === 'beneficios' ? 'active' : ''} onClick={closeMobileMenu}>
            Cambios
          </MobileNavLink>
          <MobileNavLink href="#planes" className={activeSection === 'planes' ? 'active' : ''} onClick={closeMobileMenu}>
            Planes
          </MobileNavLink>
          <MobileNavLink href="#team" className={activeSection === 'team' ? 'active' : ''} onClick={closeMobileMenu}>
            App Team Maquifit
          </MobileNavLink>
          <ContactButton onClick={closeMobileMenu}>
            <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
            Contacto
          </ContactButton>
        </MobileMenuContent>
      </MobileMenu>
    </>
  );
};

export default Header;


const HeaderContainer = styled.header`
  position: fixed;
  top: 2rem;
  left: 6rem;
  right: 6rem;
  z-index: 1000;
  background-color: white;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  padding: 0 2rem;
  
  @media (max-width: 1400px) {
    left: 3rem;
    right: 3rem;
  }
  
  @media (max-width: 1200px) {
    left: 2.5rem;
    right: 2.5rem;
    padding: 0 1.5rem;
  }
  
  @media (max-width: 1024px) {
    left: 2rem;
    right: 2rem;
    padding: 0 1.25rem;
  }
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    padding: 0;
  }

    @media  (min-width: 768px) and (max-width: 900px) {
    grid-template-columns: 0.5fr 2fr 0.5fr;
  }
  
  
  @media (max-width: 768px) {
    left: 1rem;
    right: 1rem;
    top: 1rem;
    padding: 0 1rem;
  }
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
  margin-right: 30px;
  
  @media (max-width: 1400px) {
    gap: 2.5rem;
  }
  
  @media (max-width: 1200px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 1024px) {
    gap: 1rem;
  }
  
  @media (max-width: 900px) {
    gap: 0.7rem;
  }

  @media (max-width: 870px) {
    gap: 0.6rem;
    font-size: 0.9rem;
  }
  
  
  @media (max-width: 767px) {
    display: none;
  }
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
  
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;

const MenuLine = styled.div`
  width: 24px;
  height: 2px;
  background-color: var(--text-black);
  transition: all 0.3s ease;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
`;

const MobileMenuContent = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  width: 80%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const MobileNavLink = styled.a`
  text-decoration: none;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  padding: 1rem;
  border-radius: 10px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  &.active {
    color: var(--primary-color);
    background-color: rgba(197, 138, 218, 0.1);
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &:hover {
    color: var(--primary-color);
  }
  
  &.active {
    color: var(--primary-color);
  }
`;

const ContactButton = styled.button`
  background: var(--terciary-color);
  border: none;
  border-radius: 100px;
  padding: 8px 12px;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
  
  &:active {
    background: var(--secondary-color);
    transform: translateY(0px);
    transition: all 0.1s ease;
  }
`;

const ArrowIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: var(--secondary-color);
  border-radius: 50%;
  padding: 6px;
`;
