import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <ScrollButton onClick={scrollToTop}>
          <ArrowIcon src="/icons/arrow-top.png" alt="Scroll to top" />
        </ScrollButton>
      )}
    </>
  );
};

export default ScrollToTopButton;

const ScrollButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 50px;
  height: 50px;
  background: var(--primary-color);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 1000;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(197, 138, 218, 0.3);
  }
  
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    width: 45px;
    height: 45px;
  }
`;

const ArrowIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  transform: rotate(180deg);
  filter: brightness(0) invert(1);
  
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
