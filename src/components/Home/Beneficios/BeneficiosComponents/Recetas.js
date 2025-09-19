import React from 'react';
import styled from 'styled-components';

const Recetas = ({ orientation = 'left' }) => {
  return (
    <SectionContainer>
       <ContentWrapper $orientation={orientation}>
         {orientation === 'right' ? (
           <>
             <ImageContent>
               <RecipesContainer>
                 <RecipeCard>
                   <RecipeImage src="https://picsum.photos/120/80?random=4" alt="Receta 1" />
                   <RecipeInfo>
                     <RecipeTitle>Ensalada de Quinoa</RecipeTitle>
                     <RecipeTime>15 min</RecipeTime>
                   </RecipeInfo>
                 </RecipeCard>
                 <RecipeCard>
                   <RecipeImage src="https://picsum.photos/120/80?random=5" alt="Receta 2" />
                   <RecipeInfo>
                     <RecipeTitle>Bowl de Avena</RecipeTitle>
                     <RecipeTime>10 min</RecipeTime>
                   </RecipeInfo>
                 </RecipeCard>
                 <RecipeCard>
                   <RecipeImage src="https://picsum.photos/120/80?random=6" alt="Receta 3" />
                   <RecipeInfo>
                     <RecipeTitle>Batido Proteico</RecipeTitle>
                     <RecipeTime>5 min</RecipeTime>
                   </RecipeInfo>
                 </RecipeCard>
               </RecipesContainer>
             </ImageContent>
             <TextContent $orientation={orientation}>
               <SectionTitle>Recetas saludables</SectionTitle>
               <SectionDescription>
                 Recetas deliciosas y nutritivas que se adaptan a tus objetivos de entrenamiento y estilo de vida.
               </SectionDescription>
             </TextContent>
           </>
         ) : (
           <>
             <TextContent $orientation={orientation}>
               <SectionTitle>Recetas saludables</SectionTitle>
               <SectionDescription>
                 Recetas deliciosas y nutritivas que se adaptan a tus objetivos de entrenamiento y estilo de vida.
               </SectionDescription>
             </TextContent>
             <ImageContent>
               <RecipesContainer>
                 <RecipeCard>
                   <RecipeImage src="https://picsum.photos/120/80?random=4" alt="Receta 1" />
                   <RecipeInfo>
                     <RecipeTitle>Ensalada de Quinoa</RecipeTitle>
                     <RecipeTime>15 min</RecipeTime>
                   </RecipeInfo>
                 </RecipeCard>
                 <RecipeCard>
                   <RecipeImage src="https://picsum.photos/120/80?random=5" alt="Receta 2" />
                   <RecipeInfo>
                     <RecipeTitle>Bowl de Avena</RecipeTitle>
                     <RecipeTime>10 min</RecipeTime>
                   </RecipeInfo>
                 </RecipeCard>
                 <RecipeCard>
                   <RecipeImage src="https://picsum.photos/120/80?random=6" alt="Receta 3" />
                   <RecipeInfo>
                     <RecipeTitle>Batido Proteico</RecipeTitle>
                     <RecipeTime>5 min</RecipeTime>
                   </RecipeInfo>
                 </RecipeCard>
               </RecipesContainer>
             </ImageContent>
           </>
         )}
       </ContentWrapper>
    </SectionContainer>
  );
};

export default Recetas;

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
    min-height: 370px;
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
  text-align: ${props => props.$orientation === 'right' ? 'right' : 'left'};
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

const RecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 300px;
  transform: translateY(-20px);
  z-index: 2;
  
  @media (max-width: 768px) {
    transform: translateY(0);
  }
`;

const RecipeCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const RecipeImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const RecipeInfo = styled.div`
  flex: 1;
  padding: 1rem;
`;

const RecipeTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #1F2937;
  margin-bottom: 0.3rem;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const RecipeTime = styled.div`
  font-size: 0.8rem;
  color: #8B42A6;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
