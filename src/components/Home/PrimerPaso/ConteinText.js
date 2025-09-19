import styled from "styled-components";

const Text = () => {
  return (

  <Texts>
  <Title>
  <div>Es hora de dar</div>
  <div>el primer paso.</div>
  </Title>
  <Subtitle>Cada proceso es único. Escribime y juntos diseñemos un plan adaptado a tu medida.</Subtitle>
  </Texts>

  );
}

export default Text;

const Texts = styled.div`
 display:flex;
 flex-direction:column;
 z-index:999;
 position:absolute; 
 top: 14%;
 left: 3%;
 width: 455px;
 gap:20px;

`;
const Title = styled.div`
 display:flex;
 flex-direction:column;
 
 div{
 color:var(--text-white);
 font-size: 64px;
 font-style: normal;
 font-weight: 600;
 line-height: 110%; /* 70.4px */
 }
`;
const Subtitle = styled.div`
 color:var(--text-white);
 font-size: 20px;
 font-style: normal;
 font-weight: 500;
 line-height: normal;
`;

