import React from 'react';
import styled from 'styled-components';

const Transformacion = () => {
  const steps = [
    {
      number: '01',
      backgroundImage: 'https://picsum.photos/400/400?random=1',
      isContentCard: false
    },
    {
      number: '02',
      backgroundImage: 'https://picsum.photos/400/400?random=2',
      isContentCard: false
    },
    {
      number: '03',
      backgroundImage: 'https://picsum.photos/400/400?random=3',
      isContentCard: false
    },
    {
      number: '04',
      backgroundImage: 'https://picsum.photos/400/400?random=4',
      isContentCard: false
    },
    {
      number: '05',
      isContentCard: true,
      title: 'La transformación empieza adentro. Vos también podés.',
      button1: 'Sumate al team Maquifit',
      button2: 'Ver más'
    },
    {
      number: '06',
      backgroundImage: 'https://picsum.photos/400/400?random=5',
      isContentCard: false
    }
  ];

  return (
    <TransformacionContainer>
      <Container>
        <Grid>
          {steps.map((step, index) => (
            <Card key={index} $backgroundImage={step.backgroundImage}>
              {step.isContentCard ? (
                <ContentCard>
                  <ContentTitle>{step.title}</ContentTitle>
                  <ButtonContainer>
                    <ContentButton>
                      <ButtonText>{step.button1}</ButtonText>
                      <ButtonIcon src="/icons/arrow-top.png" alt="Arrow" />
                    </ContentButton>
                    <ContentButton>
                      <ButtonText>{step.button2}</ButtonText>
                      <ButtonIcon src="/icons/dialog.png" alt="Instagram" />
                    </ContentButton>
                  </ButtonContainer>
                </ContentCard>
              ) : (
                <ImageCard />
              )}
            </Card>
          ))}
        </Grid>
      </Container>
    </TransformacionContainer>
  );
};

export default Transformacion;

const TransformacionContainer = styled.section`
  padding: 3rem 1rem;
  background-color: #D8EAF3;
  width: 100%;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    padding: 2rem 0.5rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1.5rem;
  position: relative;
  width: 100%;
  max-width: 100%;
  
  @media (max-width: 1200px) {
    gap: 1.2rem;
  }
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, auto);
    gap: 1rem;
  }
`;

const Card = styled.div`
  background: ${props => props.$backgroundImage ? `url(${props.$backgroundImage})` : 'white'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 30px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease;
  aspect-ratio: 1/1;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    min-height: 200px;
  }
`;

const ImageCard = styled.div`
  width: 100%;
  height: 100%;
`;

const ContentCard = styled.div`
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
`;

const ContentTitle = styled.h3`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 2rem;
  line-height: 1.3;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const ContentButton = styled.button`
  background: white;
  border: none;
  border-radius: 25px;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
  width: 100%;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 1rem;
`;

const ButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  background: var(--terciary-color);
  border-radius: 50%;
  padding: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
