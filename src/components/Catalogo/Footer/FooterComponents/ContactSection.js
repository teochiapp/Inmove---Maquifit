import React from "react";
import styled from "styled-components";

const ContactSection = () => {
  return (
    <ContactContainer>
      <ContactInfo>
        <ContactItem>
          <ContactLabel>Escribime</ContactLabel>
          <ContactValue>
            <span>(</span> 351 - 3797137 <span>)</span>
          </ContactValue>
        </ContactItem>

        <ContactItem>
          <ContactLabel>Email</ContactLabel>
          <ContactValue>inmove.mf@gmail.com</ContactValue>
        </ContactItem>

        <ContactItem>
          <ContactLabel>Horarios</ContactLabel>
          <HoursContainer>
            <DaysRow>
              <DayLabel>Lun—Vie</DayLabel>
              <DayLabel>Sáb</DayLabel>
            </DaysRow>
            <TimesRow>
              <TimeValue>8:00 - 18:00</TimeValue>
              <TimeValue>9:00 - 15:00</TimeValue>
            </TimesRow>
          </HoursContainer>
        </ContactItem>
      </ContactInfo>

      <SocialLinks>
        <SocialLink 
          href="https://www.instagram.com/maquifit.p/?hl=es-la" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.5 7.5V7.501" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
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

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 1.1rem;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ContactLabel = styled.span`
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--inmove-rosa-color);
`;

const ContactValue = styled.span`
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: var(--text-white);

  span {
    color: var(--inmove-rosa-color);
  }
`;

const HoursContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const DaysRow = styled.div`
  display: flex;
  gap: 3.5rem;

  @media (max-width: 768px) {
    gap: 2.5rem;
  }
`;

const TimesRow = styled.div`
  display: flex;
  gap: 1.3rem;

  @media (max-width: 768px) {
    gap: 1.3rem;
  }
`;

const DayLabel = styled.span`
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: var(--text-white);
  min-width: 60px;
`;

const TimeValue = styled.span`
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: var(--text-white);
  min-width: 100px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(218, 95, 139, 0.1);
  color: var(--inmove-rosa-color);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--inmove-rosa-color);
    color: white;
    transform: translateY(-2px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;