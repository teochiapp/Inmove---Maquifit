import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './HeaderComponents/Logo';
import { useCategoriasWithFallback } from '../../../hooks/useCategorias';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { categorias, loading } = useCategoriasWithFallback();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detectar si estamos en la página del catálogo
  const isCatalogPage = location.pathname === '/catalogo';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = () => {
    navigate('/carrito');
  };

  const handleCategoryClick = (categoriaSlug) => {
    if (isCatalogPage) {
      // En la página del catálogo, hacer scroll a la sección
      const element = document.getElementById(`categoria-${categoriaSlug}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // En otras páginas, navegar al catálogo con la sección
      navigate(`/catalogo#categoria-${categoriaSlug}`);
    }
  };

  // Manejar scroll automático cuando hay hash en la URL
  useEffect(() => {
    if (isCatalogPage && location.hash) {
      // Esperar un poco para que la página se renderice completamente
      const timer = setTimeout(() => {
        const elementId = location.hash.substring(1); // Remover el #
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isCatalogPage, location.hash]);

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
    if (loading || categorias.length === 0) return;
    
    // Crear array dinámico de secciones basado en las categorías
    const categorySections = categorias.map(cat => `categoria-${cat.slug}`);
    const sections = ['hero', 'productos', ...categorySections, 'sobre-mi', 'strapi', 'planes', 'faq'];
    
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
  }, [loading, categorias]);

  return (
    <>
      <HeaderContainer>
        <LogoSection>
          <Logo />
        </LogoSection>
        
        <Navigation>
          {loading ? (
            <LoadingCategories>Cargando categorías...</LoadingCategories>
          ) : categorias.length > 0 ? (
            categorias.map((categoria) => (
              <CategoryNavLink 
                key={categoria.id}
                onClick={() => handleCategoryClick(categoria.slug)}
                className={activeSection === `categoria-${categoria.slug}` ? 'active' : ''}
              >
                {categoria.icono ? (
                  <CategoryIcon 
                    src={categoria.icono} 
                    alt={categoria.nombre}
                    onError={(e) => {
                      console.warn(`❌ Error cargando icono para ${categoria.nombre}:`, categoria.icono);
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <CategoryIconPlaceholder>📦</CategoryIconPlaceholder>
                )}
                <CategoryName>{categoria.nombre}</CategoryName>
              </CategoryNavLink>
            ))
          ) : (
            <NoCategoriesMessage>
              No hay categorías disponibles. Configura categorías en Strapi.
            </NoCategoriesMessage>
          )}
        </Navigation>
        
        <ContactSection>
          <CartButton onClick={handleCartClick}>
            <CartIcon>
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33366 15.1666C5.70185 15.1666 6.00033 14.8682 6.00033 14.5C6.00033 14.1318 5.70185 13.8333 5.33366 13.8333C4.96547 13.8333 4.66699 14.1318 4.66699 14.5C4.66699 14.8682 4.96547 15.1666 5.33366 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.6667 15.1666C13.0349 15.1666 13.3333 14.8682 13.3333 14.5C13.3333 14.1318 13.0349 13.8333 12.6667 13.8333C12.2985 13.8333 12 14.1318 12 14.5C12 14.8682 12.2985 15.1666 12.6667 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.36621 1.86664L2.69954 1.86664L4.47288 10.1466C4.53793 10.4499 4.70666 10.721 4.95002 10.9132C5.19338 11.1055 5.49615 11.2069 5.80621 11.2L12.3262 11.2C12.6297 11.1995 12.9239 11.0955 13.1602 10.9052C13.3966 10.7149 13.561 10.4497 13.6262 10.1533L14.7262 5.19997L3.41288 5.19997" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </CartIcon>
            Carrito
          </CartButton>
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
          {loading ? (
            <LoadingCategories>Cargando categorías...</LoadingCategories>
          ) : categorias.length > 0 ? (
            categorias.map((categoria) => (
              <MobileCategoryNavLink 
                key={categoria.id}
                onClick={() => {
                  handleCategoryClick(categoria.slug);
                  closeMobileMenu();
                }}
                className={activeSection === `categoria-${categoria.slug}` ? 'active' : ''}
              >
                {categoria.icono ? (
                  <CategoryIcon 
                    src={categoria.icono} 
                    alt={categoria.nombre}
                    onError={(e) => {
                      console.warn(`❌ Error cargando icono para ${categoria.nombre}:`, categoria.icono);
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <CategoryIconPlaceholder>📦</CategoryIconPlaceholder>
                )}
                <CategoryName>{categoria.nombre}</CategoryName>
              </MobileCategoryNavLink>
            ))
          ) : (
            <NoCategoriesMessage>
              No hay categorías disponibles.<br />
              Configura categorías en Strapi.
            </NoCategoriesMessage>
          )}
           <MobileCartButton onClick={() => {
             handleCartClick();
             closeMobileMenu();
           }}>
             <CartIcon>
               <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M5.33366 15.1666C5.70185 15.1666 6.00033 14.8682 6.00033 14.5C6.00033 14.1318 5.70185 13.8333 5.33366 13.8333C4.96547 13.8333 4.66699 14.1318 4.66699 14.5C4.66699 14.8682 4.96547 15.1666 5.33366 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M12.6667 15.1666C13.0349 15.1666 13.3333 14.8682 13.3333 14.5C13.3333 14.1318 13.0349 13.8333 12.6667 13.8333C12.2985 13.8333 12 14.1318 12 14.5C12 14.8682 12.2985 15.1666 12.6667 15.1666Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                 <path d="M1.36621 1.86664L2.69954 1.86664L4.47288 10.1466C4.53793 10.4499 4.70666 10.721 4.95002 10.9132C5.19338 11.1055 5.49615 11.2069 5.80621 11.2L12.3262 11.2C12.6297 11.1995 12.9239 11.0955 13.1602 10.9052C13.3966 10.7149 13.561 10.4497 13.6262 10.1533L14.7262 5.19997L3.41288 5.19997" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
             </CartIcon>
             Carrito
           </MobileCartButton>
        </MobileMenuContent>
      </MobileMenu>
    </>
  );
};

export default Header;

// Estilos (copiados del Header original)
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  background-color: rgba(249, 248, 243, 0.9);
  height: 90px;
  display: flex;
  backdrop-filter: blur(20px);
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  padding: 0 6rem;
  box-sizing: border-box;
  
  @media (max-width: 1400px) {
    padding: 0 3rem;
  }
  
  @media (max-width: 1200px) {
    padding: 0 2.5rem;
  }
  
  @media (max-width: 1024px) {
    padding: 0 2rem;
  }
  
  @media (min-width: 1101px) {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
  }

  @media (min-width: 1101px) and (max-width: 1500px) {
    padding: 0 1.5rem;
  }

  @media (min-width: 1101px) and (max-width: 1300px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 1100px) {
    display: flex;
    padding: 0 2rem;
    height: 80px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.5rem;
    height: 70px;
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
  justify-content: center;
  gap: 3rem;
  margin-right: 30px;
  flex-shrink: 1;
  min-width: 0;
  
  @media (max-width: 1752px) {
    gap: 2rem;
    margin-right: 20px;
  }
  
  @media (max-width: 1650px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 1500px) {
    gap: 1rem;

    a {
      font-size: 0.8rem !important;
    }
  }
  
  @media (max-width: 1280px) {
    gap: 0.5rem;
  }
  
  @media (max-width: 1160px) {
    gap: 0.1rem;

    a {
      font-size: 0.7rem !important;
    }
  }
  
  @media (max-width: 1100px) {
    display: none;
  }
`;

const ContactSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
  flex-shrink: 0;
  min-width: 0;
  
  @media (max-width: 1100px) {
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
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease;
  }
  
  @media (max-width: 1100px) {
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
    color: var(--inmove-rosa-color);
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
    color: var(--inmove-rosa-color);
  }
  
  &.active {
    color: var(--inmove-rosa-color);
  }
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
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
    transition: all 0.1s ease;
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

// ===== Nuevos componentes para categorías =====

const LoadingCategories = styled.div`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
`;

const NoCategoriesMessage = styled.div`
  color: #6b7280;
  font-family: 'Onest', sans-serif;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  text-align: center;
  font-style: italic;
  
  @media (max-width: 1024px) {
    font-size: 0.8rem;
  }
`;

const CategoryNavLink = styled.div`
  text-decoration: none;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  position: relative;
  
  &:hover {
    color: var(--inmove-color);
    transform: translateY(-1px);
  }
  
  &:active {
    color: var(--inmove-color);
    transform: translateY(0px);
  }
  
  &.active {
    color: var(--inmove-color);
    font-weight: 600;
  }
  
  @media (max-width: 1200px) {
    font-size: 0.85rem;
    gap: 0.4rem;
    padding: 0.4rem 0.6rem;
  }
  
  @media (max-width: 1024px) {
    font-size: 0.8rem;
    gap: 0.3rem;
    padding: 0.3rem 0.5rem;
  }
  
  @media (max-width: 900px) {
    font-size: 0.75rem;
  }
`;

const CategoryIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
  
  @media (max-width: 1200px) {
    width: 18px;
    height: 18px;
  }
  
  /* Tablet: mantener tamaño decente con labels */
  @media (max-width: 1024px) and (min-width: 768px) {
    width: 16px;
    height: 16px;
  }
  
  /* Móvil: iconos más pequeños sin labels */
  @media (max-width: 767px) {
    width: 14px;
    height: 14px;
  }
`;

const CategoryIconPlaceholder = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  flex-shrink: 0;
  opacity: 0.6;
  
  @media (max-width: 1200px) {
    width: 18px;
    height: 18px;
    font-size: 12px;
  }
  
  /* Tablet: mantener tamaño decente con labels */
  @media (max-width: 1024px) and (min-width: 768px) {
    width: 16px;
    height: 16px;
    font-size: 11px;
  }
  
  /* Móvil: placeholders más pequeños sin labels */
  @media (max-width: 767px) {
    width: 14px;
    height: 14px;
    font-size: 10px;
  }
`;

const CategoryName = styled.span`
  white-space: nowrap;
  font-size: 0.9rem;
  
  /* Ocultar en móviles pequeños */
  @media (max-width: 767px) {
    display: none;
  }
  
  /* Mostrar en tablets con fuente un poco más pequeña */
  @media (min-width: 768px) and (max-width: 1024px) {
    display: inline;
    font-size: 0.85rem;
  }
  
  /* Desktop: tamaño normal */
  @media (min-width: 1025px) {
    display: inline;
    font-size: 0.9rem;
  }
`;

const MobileCategoryNavLink = styled.div`
  text-decoration: none;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  padding: 0.8rem 1rem;
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(218, 95, 139, 0.2), 
      transparent);
    transition: left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  
  &:hover {
    color: var(--inmove-color);
    transform: translateY(-2px) scale(1.02);
  }
  
  &:active {
    color: var(--inmove-color);
    transform: translateY(0px) scale(1.0);
    transition: all 0.1s ease;
  }
  
  &.active {
    color: var(--inmove-color);
    font-weight: 600;
    transform: translateY(-1px) scale(1.01);
  }
  
  ${CategoryIcon} {
    width: 24px;
    height: 24px;
  }
  
  ${CategoryName} {
    display: inline;
  }
`;

// ===== Componentes del carrito =====

const CartButton = styled.button`
  background: var(--inmove-rosa-color);
  border: none;
  border-radius: 100px;
  padding: 8px 12px;
  color: var(--text-white);
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
    transform: translateY(0px);
    transition: all 0.1s ease;
  }
`;

const MobileCartButton = styled.button`
  background: var(--inmove-rosa-color);
  border: none;
  border-radius: 100px;
  padding: 8px 12px;
  color: var(--text-white);
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
    transform: translateY(0px);
    transition: all 0.1s ease;
  }
`;

const CartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  object-fit: contain;
  background: var(--inmove-color);
  border-radius: 50%;
  padding: 6px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;
