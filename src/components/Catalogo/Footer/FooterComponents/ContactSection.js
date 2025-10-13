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