import styled from "styled-components";

const Text = () => {
  return (

  <Texts>
  <Title>
  <div>Es hora de dar</div>
  <div>el primer paso.</div>
  </Title>
  <Subtitle>Cada proceso es único. Escribime y juntos diseñemos un plan adaptado a tu medida.</Subtitle>


  <ButtonContainer>
      <CTAButton>
        <ButtonText>Escribime!</ButtonText>
        <DialogIcon src="/icons/dialog.png" alt="Dialog" />
      </CTAButton>
  </ButtonContainer>
  </Texts>

  );
}

export default Text;

const Texts = styled.div`
 display:flex;
 flex-direction:column;
 z-index:999;
 position:absolute; 
 top: 50px;
 left: 50px;
 width: 455px;
 gap:20px;
 
 @media (max-width: 768px) {
   top: 30px;
   left: 30px;
   width: 300px;
 }
`;
const Title = styled.div`
 display:flex;
 flex-direction:column;
 
 div{
 color: white;
 font-size: 64px;
 font-style: normal;
 font-weight: 600;
 line-height: 110%; /* 70.4px */
 
 @media (max-width: 768px) {
   font-size: 48px;
 }
 }
`;
const Subtitle = styled.div`
 color: white;
 font-size: 20px;
 font-style: normal;
 font-weight: 500;
 line-height: normal;
 
 @media (max-width: 768px) {
   font-size: 16px;
 }
`;


const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
  }
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.1rem);
  padding-right: 3px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DialogIcon = styled.img`
    width: clamp(28px, 4vw, 32px);
    height: clamp(28px, 4vw, 32px);
    object-fit: contain;
    background: var(--secondary-color);
    border-radius: 43%;
    padding: clamp(6px, 1.5vw, 8px);
    
    @media (max-width: 768px) {
      width: 28px;
      height: 28px;
      padding: 6px;
    }
    
    @media (max-width: 480px) {
      width: 24px;
      height: 24px;
      padding: 5px;
    }
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: clamp(30px, 8vw, 50px);
  
  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 40px;
  }
  
  @media (max-width: 480px) {
    justify-content: center;
    margin-top: 30px;
  }
`;