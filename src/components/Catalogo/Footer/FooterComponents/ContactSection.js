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
          <ContactValue>
            Lun—Vie: 8:00 - 18:00 | Sáb: 9:00 - 15:00
          </ContactValue>
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

const HoursRow = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`;

const HourBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;