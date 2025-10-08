import React from 'react';
import styled from 'styled-components';

const TePuedeInteresar = () => {
  return (
    <Section>
      <Container>
        <Title>Te Puede Interesar</Title>
        <Placeholder>
          Próximamente: productos relacionados
        </Placeholder>
      </Container>
    </Section>
  );
};

export default TePuedeInteresar;

const Section = styled.div`
  max-width: 1200px;
  margin: 4rem auto 0;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    margin-top: 3rem;
  }
`;

const Container = styled.div``;

const Title = styled.h2`
  font-family: 'Onest', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #262626;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Placeholder = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  font-family: 'Onest', sans-serif;
  font-size: 1.1rem;
  color: #666;
  font-style: italic;
`;


