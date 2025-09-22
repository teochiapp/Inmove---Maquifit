import React from "react";
import styled from "styled-components";

const ContactSection = () => {
  return (
    <ContactContainer>
      <ContactInfo>
        <ContactItem>
          <ContactLabel>Escribime</ContactLabel>
          <ContactValue>
            <span>(</span> 351 - 123456 <span>)</span>
          </ContactValue>
        </ContactItem>

        <ContactItem>
          <ContactLabel>Email</ContactLabel>
          <ContactValue>soymaquifit@gmail.com</ContactValue>
        </ContactItem>

        <ContactItem>
          <ContactLabel>Lun-Vie</ContactLabel>
          <ContactValue>9am-6pm</ContactValue>
        </ContactItem>
      </ContactInfo>

      <SurCodesCopyright>
          Desarrollada por SurCodes. © 2025 — Copyright
      </SurCodesCopyright>
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
  color: #b088e0;
`;

const ContactValue = styled.span`
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: #262626;

  span {
    color: #b088e0;
  }
`;

const SurCodesCopyright = styled.p`
  font-family: "Onest", sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  color: #262626;
  margin: 2.5rem 0 0;
  text-align: left;

  @media (max-width: 768px) {
    display: none;
  }
`;
