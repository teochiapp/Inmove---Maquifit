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