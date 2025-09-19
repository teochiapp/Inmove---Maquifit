import styled from 'styled-components';

const Orientacion = () => {
  return (
    <SectionContainer>
      <ContentWrapper>        
        <ImageContent>
          <MealImg src="/home/beneficios/nutricion.webp" alt="Nutrición" />
        </ImageContent>
        <TextContent>
          <SectionTitle>Orientación nutricional</SectionTitle>
          <SectionDescription>
            Adaptada con los macronutrientes y calorías que necesitas para potenciar tus resultados.
          </SectionDescription>
        </TextContent>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default Orientacion;

const SectionContainer = styled.div`
  background: var(--overlay-color);
  border-radius: 40px;
  margin-bottom: 2rem;
  height: 370px;
  padding: 3rem;
  position: relative;
  overflow: visible;
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 1.5rem;
    height: auto;
    min-height: 420px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }
`;

const TextContent = styled.div`
  flex: 1;
  width: 50%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const ImageContent = styled.div`
  flex: 1;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const SectionTitle = styled.h3`
  font-size: 32px;
  font-weight: 500;
  color: var(--text-black);
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #4B5563;
  line-height: 1.6;
  margin: 0;
`;

const MealImg = styled.img`
  width: 100%;
  height: auto;
  max-width: 470px;
  transform: translateY(-50px);
  z-index: 2;
  
  @media (max-width: 768px) {
    transform: translateY(0);
    max-width: 300px;
  }
`;
