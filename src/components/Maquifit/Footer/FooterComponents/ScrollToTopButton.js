import React from 'react';
import styled from 'styled-components';

const ScrollToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ScrollButton onClick={scrollToTop} aria-label="Scroll to top">
      <ArrowIcon>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 19V5M5 12L12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ArrowIcon>
    </ScrollButton>
  );
};

export default ScrollToTopButton;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background-color: #B0E04A;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(176, 224, 74, 0.3);
  z-index: 1000;
  
  &:hover {
    background-color: #9BC93A;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(176, 224, 74, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(176, 224, 74, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const ArrowIcon = styled.div`
  color: #262626;
  display: flex;
  align-items: center;
  justify-content: center;
`;
