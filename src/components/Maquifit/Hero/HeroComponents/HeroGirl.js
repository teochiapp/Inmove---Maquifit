import React from "react";
import styled from "styled-components";

const HeroGirl = () => {
  return (
    <HeroMaquifit>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Girl src="/home/maquifit.webp" alt="Girl" fetchpriority="high" loading="eager" />
        <Strength src="/home/strength.png" alt="Strength" loading="lazy" />
        <Weight src="/home/weight.png" alt="Weight" loading="lazy" />
        <Health src="/home/health.png" alt="Health" loading="lazy" />
         <CTAButton href="mailto:maquiponce96@gmail.com">
            <Icon src="/icons/user.png" alt="User" />
            <ButtonMaquifit> Maquifit</ButtonMaquifit>
         </CTAButton>
      </div>
    </HeroMaquifit>
  );
};

export default HeroGirl;

const HeroMaquifit = styled.div`
position: absolute;
right: calc(-400px + 9vw);
bottom: -61px;
z-index: 5;
-webkit-transform: translate3d(0, 0, 0);
transform: translate3d(0, 0, 0);

@media (min-width: 1600px) {
       
   right:-200px;   
  }

  @media (min-width: 1800px) {
       
   right:10px;   
  }


@media (max-width:992px){ 
        left: 67%;
        top: 64%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        z-index: 5;
}

@media (max-width:475px){ 
        left: 70%;
        
}
`

const Girl = styled.img`
width: 523.237px;
height: 750.366px;
flex-shrink: 0;
aspect-ratio: 523.24/750.37;
position:relative;
z-index: 6;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;
image-rendering: -webkit-optimize-contrast;

@media (max-width:992px){
width: 407.423px;
height: 584.279px;
flex-shrink: 0;
aspect-ratio: 407.42/584.28;

}
`

const Strength = styled.img`
position:absolute;
display: inline-flex;
padding: 33.609px;
justify-content: center;
align-items: center;
gap: 15.804px;
bottom: 165px;
left: -136px;
z-index: 4;
width:220px;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;

@media (max-width:992px){
bottom: 125px;
left: -90px;
width: 200px;
}


`
const Weight = styled.img`
display: inline-flex;
padding: 23.19px;
justify-content: center;
align-items: center;
gap: 10.905px;
position: relative;
bottom: 310px;
right: 184px;
width: 170px;
z-index: 7;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;

@media (max-width:992px){
bottom: 255px;
right: 165px;
width: 150px;
}

@media (max-width:650px){
left: 259px;
bottom: 387px;
}
`
const Health = styled.img`
display: inline-flex;
padding: 18.666px;
overflow: visible;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 8.777px;
flex-shrink: 0;
position:relative;
width: 110px;
bottom: 578px; 
right: 458px;
background: rgba(255, 255, 255, 0.30); 
backdrop-filter: blur(5.125992298126221px);
-webkit-backdrop-filter: blur(5.125992298126221px);
border-radius: 50px;
-webkit-backface-visibility: hidden;
backface-visibility: hidden;

@media (max-width:992px){
 bottom: 559px;
 right: -178px;
 width: 90px;
 z-index: 1;

}
 @media (max-width:650px){
 bottom: 615px;
 right: -31px;
}
`

const CTAButton = styled.a`
  background: rgba(255, 255, 255, 0.40);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: none;
  border-radius: 100px;
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  position:relative;
  top: -215px;
  left: 320px;
  z-index: 9;
  transition: transform 0.3s ease;
  text-decoration: none;
  width: fit-content;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  
  &:hover {
    transform: translateY(-2px);
  }
@media (max-width:992px){
 display:none;

}
  
`;

const ButtonMaquifit = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  padding-right: 3px;

`;

const Icon = styled.img`
    width: 32px;
    height: 32px;
    object-fit: contain;
    background: #C58ADA;
    border-radius: 50%;
    padding: 6px;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
`;