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

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Bloquear scroll en body
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Bloquear scroll en html para mayor compatibilidad
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Restaurar scroll
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    // Cleanup function para restaurar el scroll
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.width = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
        
        <MobileMenuButton onClick={toggleMobileMenu} $isOpen={isMobileMenuOpen}>
          <MenuLine $isOpen={isMobileMenuOpen} />
          <MenuLine $isOpen={isMobileMenuOpen} />
          <MenuLine $isOpen={isMobileMenuOpen} />
        </MobileMenuButton>
      </HeaderContainer>
      
      <MobileMenu $isOpen={isMobileMenuOpen} onClick={closeMobileMenu}>
        <CloseButton onClick={closeMobileMenu}>
          <CloseIcon>×</CloseIcon>
        </CloseButton>
        <MobileMenuContent $isOpen={isMobileMenuOpen} onClick={(e) => e.stopPropagation()}>
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
          <MobileContactButton onClick={closeMobileMenu}>
            <ArrowIcon src="/icons/arrow-top.png" alt="Arrow" />
            Contacto
          </MobileContactButton>
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
  max-width: calc(100vw - 12rem);
  box-sizing: border-box;
  
  @media (max-width: 1400px) {
    left: 3rem;
    right: 3rem;
    max-width: calc(100vw - 6rem);
  }
  
  @media (max-width: 1200px) {
    left: 2.5rem;
    right: 2.5rem;
    padding: 0 1.5rem;
    max-width: calc(100vw - 5rem);
  }
  
  @media (max-width: 1024px) {
    left: 2rem;
    right: 2rem;
    padding: 0 1.25rem;
    max-width: calc(100vw - 4rem);
  }
  
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 2fr 0.5fr;
    padding: 0;
  }

  @media (min-width: 768px) and (max-width: 900px) {
    grid-template-columns: 0.5fr 2fr 0.5fr;
  }
  
  @media (max-width: 768px) {
    left: 1rem;
    right: 1rem;
    top: 1rem;
    padding: 0 1rem;
    max-width: calc(100vw - 2rem);
  }
`;

const LogoSection = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-shrink: 0;
  min-width: 0;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 3rem;
  margin-right: 30px;
  flex-shrink: 1;
  min-width: 0;
  
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
  flex-shrink: 0;
  min-width: 0;
  
  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 8px;
  transition: all 0.3s ease;
  z-index: 1001;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    align-items: center;
  }
`;

const MenuLine = styled.div`
  width: 26px;
  height: 3px;
  background-color: var(--text-black);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  
  ${props => props.$isOpen && `
    &:nth-child(1) {
      transform: rotate(45deg) translate(6px, 6px);
    }
    
    &:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    
    &:nth-child(3) {
      transform: rotate(-45deg) translate(6px, -6px);
    }
  `}
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, 
    rgba(0, 0, 0, 0.8) 0%, 
    rgba(38, 38, 38, 0.7) 25%, 
    rgba(197, 138, 218, 0.1) 50%, 
    rgba(0, 0, 0, 0.8) 100%);
  backdrop-filter: blur(15px) saturate(1.5);
  -webkit-backdrop-filter: blur(15px) saturate(1.5);
  z-index: 10000;
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(197, 138, 218, 0.1) 0%, transparent 70%);
    animation: ${props => props.$isOpen ? 'pulse 2s ease-in-out infinite' : 'none'};
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
`;

const MobileMenuContent = styled.div`
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.95) 0%, 
    rgba(255, 255, 255, 0.9) 50%, 
    rgba(248, 247, 242, 0.95) 100%);
  backdrop-filter: blur(25px) saturate(1.2);
  -webkit-backdrop-filter: blur(25px) saturate(1.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 32px;
  padding: 3.5rem 2.5rem;
  width: 85%;
  max-width: 380px;
  min-width: 280px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  transform: ${props => props.$isOpen ? 'scale(1) translateY(0) rotateX(0deg)' : 'scale(0.9) translateY(-20px) rotateX(10deg)'};
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  
  /* Mejorar scroll en iOS */
  -webkit-overflow-scrolling: touch;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(from 0deg, transparent, rgba(197, 138, 218, 0.1), transparent);
    animation: rotate 10s linear infinite;
    z-index: -1;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  /* Media queries específicas para móviles */
  @media (max-width: 480px) {
    width: 90%;
    padding: 2.5rem 1.5rem;
    max-height: 85vh;
  }
  
  @media (max-width: 360px) {
    width: 95%;
    padding: 2rem 1rem;
    max-height: 80vh;
  }
`;

const MobileNavLink = styled.a`
  text-decoration: none;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  text-align: center;
  padding: 0.8rem 1rem;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(197, 138, 218, 0.2), 
      rgba(191, 232, 57, 0.2), 
      transparent);
    transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(197, 138, 218, 0.3) 0%, transparent 70%);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
  
  &:hover {
    background: linear-gradient(135deg, 
      rgba(197, 138, 218, 0.15), 
      rgba(255, 255, 255, 0.8), 
      rgba(191, 232, 57, 0.1));
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 12px 25px rgba(197, 138, 218, 0.2),
      0 0 0 1px rgba(197, 138, 218, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    
    &:before {
      left: 100%;
    }
    
    &:after {
      width: 300px;
      height: 300px;
    }
  }
  
  &.active {
    color: var(--primary-color);
    background: linear-gradient(135deg, 
      rgba(197, 138, 218, 0.2), 
      rgba(255, 255, 255, 0.9), 
      rgba(197, 138, 218, 0.1));
    box-shadow: 
      0 8px 20px rgba(197, 138, 218, 0.3),
      0 0 0 2px rgba(197, 138, 218, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
    transform: translateY(-2px) scale(1.01);
    
    &:before {
      background: linear-gradient(90deg, 
        transparent, 
        rgba(197, 138, 218, 0.3), 
        rgba(191, 232, 57, 0.2), 
        transparent);
      left: 100%;
      animation: shimmer 2s ease-in-out infinite;
    }
  }
  
  @keyframes shimmer {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(10px); }
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

const MobileContactButton = styled.button`
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
  margin-top: 1rem;
  width: auto;
  align-self: center;
  
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
  width: 28px;
  height: 28px;
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 10001;
  min-width: 48px;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
    background: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 480px) {
    top: 1.5rem;
    right: 1.5rem;
    min-width: 44px;
    min-height: 44px;
    padding: 0.5rem;
  }
`;

const CloseIcon = styled.span`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--text-black);
  line-height: 1;
  display: block;
  
  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;
