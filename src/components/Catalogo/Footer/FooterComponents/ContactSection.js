import React from 'react';
import styled from 'styled-components';

const ContactSection = () => {
  return (
    <ContactContainer>
      <SectionTitle>Contacto</SectionTitle>
      <ContactInfo>
        <ContactItem>
          <ContactIcon>📧</ContactIcon>
          <ContactText>info@maquifit.com</ContactText>
        </ContactItem>
        <ContactItem>
          <ContactIcon>📱</ContactIcon>
          <ContactText>+54 9 11 1234-5678</ContactText>
        </ContactItem>
        <ContactItem>
          <ContactIcon>📍</ContactIcon>
          <ContactText>Buenos Aires, Argentina</ContactText>
        </ContactItem>
      </ContactInfo>
      <SocialLinks>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <SocialIcon>📘</SocialIcon>
        </SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <SocialIcon>📷</SocialIcon>
        </SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <SocialIcon>🐦</SocialIcon>
        </SocialLink>
      </SocialLinks>
    </ContactContainer>
  );
};

export default ContactSection;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SectionTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0 0 1rem 0;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ContactIcon = styled.span`
  font-size: 16px;
`;

const ContactText = styled.span`
  color: #d1d5db;
  font-size: 14px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #d1d5db;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const SocialIcon = styled.span`
  font-size: 20px;
`;
