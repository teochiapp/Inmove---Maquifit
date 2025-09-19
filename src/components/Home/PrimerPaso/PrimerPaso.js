import styled from "styled-components";
import Text from "./ConteinText";
import ChatsBubble from "./Chatss"
const PrimerPaso = () => {
  return (
   
     <FirstStepContainer>

      <Text />
      <ChatsBubble />
      <BurbleTwo />
      <BurbleThree />
      <BurbleFour />
     </FirstStepContainer> 
  );
}

export default PrimerPaso;


const FirstStepContainer = styled.section`
 background: var(--overlay-color);
 height:50vh;
 width:100%;
 overflow: hidden;
 position:relative;
 display:flex;
`;

const Burble = styled.div`
width: 718.609px;
height:1629.213px;
transform: rotate(24.043deg);
flex-shrink: 0;
border-radius: 718.609px;
background: linear-gradient(90deg, #8B42A6 0%, #F9F8F3 100%);
filter: blur(149.13037109375px);
position:absolute;
    left: -4%;
    top: -90%;

  z-index:995;
`;

const BurbleTwo = styled.div`
 width: 793.424px;
 height: 683.875px;
 transform: rotate(-25.758deg);
 flex-shrink: 0;
 background: linear-gradient(90deg, #C58ADA -6.8%, #AD77BE 39.81%, #F9F8F3 84.77%);
 filter: blur(23.429285049438477px);
 position: relative;
    top: -64%;
    left: 13%;
 z-index:995;
`;

const BurbleThree = styled.div`
width: 731.308px;
height: 471.101px;
transform: rotate(-7.138deg);
flex-shrink: 0;
border-radius: 731.308px;
background: linear-gradient(227deg, #C58ADA 50.16%, #8B42A6 69.47%);
filter: blur(69.40665435791016px);
position:absolute;
bottom: -15%;
right: 3%;
z-index:995;
`;


const BurbleFour = styled.div`
position:absolute;
width: 697.195px;
height: 795.881px;
transform: rotate(150.044deg);
flex-shrink: 0;
border-radius: 795.881px;
opacity: 0.8;
background: linear-gradient(90deg, #8B42A6 0%, #F9F8F3 100%);
filter: blur(30.338825225830078px);
right:-22%;
top:-21%;
z-index:995;
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
  justify-content: flex-end;
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