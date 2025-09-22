import styled from "styled-components";
import Text from "./ConteinText";
import ChatsBubble from "./Chatss"
const PrimerPaso = () => {
  return (
   
     <FirstStepContainer>
      
      <div>
      <Text />
      <ChatsBubble />
      </div>
      <Burble />
      <BurbleTwo />
      <BurbleThree />
      <BurbleFour />
     </FirstStepContainer> 
  );
}

export default PrimerPaso;


const FirstStepContainer = styled.section`
 background: var(--overlay-color);
 height:500px;
 width:100%;
 overflow: hidden;
 position:relative;
 display:flex;

 div {
  
 display:flex;
 
 }

 @media (max-width: 1300px){
   
  height:600px;
 
 } 


 @media (max-width: 992px){
   
  height:750px;
 
 } 

 @media (max-width: 782px){
   
  height:1100px;
 
 }

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

