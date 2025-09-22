import styled from "styled-components";
import { motion } from "framer-motion";

const ChatsBubble = () => {
  return (
    <ChatsContainer>
      <BubbleOne
        as={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 0.5, 
          ease: "easeOut",
          delay: 0.2 
        }}
      >
        <h5>Ani</h5>
        <p>
          Queria aprovechar para decirte que me encanta ver cómo vas avanzando
          como profesional. Admiro mucho tu dedicación y la forma en que
          acompañás a tus alumnos, me motiva a no bajar los brazos ❤️{" "}
        </p>
        <span className="timestamp">19:52</span>
      </BubbleOne>
      <BubbleTwo
        as={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: 0.5, 
          ease: "easeOut",
          delay: 0.4 
        }}
      >
        <h5>Juancho</h5>
        <p>
          Sin darme cuenta voy descubrieno algunos cambios. Me ayudó el
          entrenamiento para regular el estrés del mes pasado 🙌🏽 💃🏽{" "}
        </p>
        <span className="timestamp">14:06</span>
      </BubbleTwo>
      <Bubletreeandfour>
        <BubbleThree
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.6 
          }}
        >
          <h5>Lu</h5>
          <p>
            Justo me agarraste sacándome unas fotos porque veía que estos meses
            mejoramos jajaj{" "}
          </p>
          <span className="timestamp">9:00</span>
        </BubbleThree>
        <Bubblefour
          as={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.8 
          }}
        >
          <h5>Lu</h5>
          <p>así que nada, feliz por los resultados, gracias! 😄 🥳 </p>
          <span className="timestamp">9:02</span>
        </Bubblefour>
      </Bubletreeandfour>
    </ChatsContainer>
  );
};

export default ChatsBubble;

const ChatsContainer = styled.div`
  display: flex;
  position: absolute;
  right: 10%;
  z-index: 999;
  gap: 60px;
  top: 15%;
  align-items: flex-end;

  @media (max-width: 1500px) {
    right: 5%;
  }

  @media (max-width: 1300px) {
    top: 40%;
  }
  @media (max-width: 992px) {
    top: 55%;
    right: 15%;
  }
  @media (max-width: 910px) {
    top: 55%;
    right: 8%;
  }

   @media (max-width: 820px) {
    top: 55%;
    right: 6%;
  }

   
  @media (max-width: 782px) {
    top: 25%;
    right: -433px;
  }
   
   @media (max-width: 700px) {
    right: -500px;
  }
   @media (max-width: 600px) {
    right: -550px;
  }
   @media (max-width: 485px) {
    right: -565px;
  }
   @media (max-width: 450px) {
    right: -580px;
  }
   @media (max-width: 425px) {
    right: -590px;
  }
   @media (max-width: 400px) {
    right: -600px;
  }
   @media (max-width: 385px) {
    right: -610px;
  }
   @media (max-width: 365px) {
    right: -600px;
  }
   @media (max-width: 350px) {
    right: -610px;
  }
  
   @media (max-width: 325px) {
    right: -615px;
  }
 



`;

const BubbleOne = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
  background: var(--text-white);
  border-radius: 10px 10px 10px 10px;
  height: 265px;
  position: relative;

  h5 {
    color: #00a700;
    padding: 4px 10px 0 10px;
    font-size: 15px;
  }

  p {
    padding: 0 10px 10px 10px;
    flex: 1;
  }

  .timestamp {
    color: #666;
    font-size: 12px;
    padding: 0 10px 10px 10px;
    text-align: right;
    margin-top: auto;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
  }

  @media (max-width: 1300px) {
    bottom: 200px;
    left: 250px;
  }

  @media (max-width: 992px) {
    bottom: 0px;
    left: -10px;
  }
    
  @media (max-width: 782px) {
    width:350px;
    left: 200px;
    height:155px;
  }
    
  @media (max-width: 365px) {
        width: 308px;
        left: 115px;
        height: 180px;
  }
`;

const BubbleTwo = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
  background: var(--text-white);
  border-radius: 10px 10px 10px 10px;
  height: 180px;
  position: relative;

  h5 {
    color: #0061a7;
    padding: 4px 10px 0 10px;
    font-size: 15px;
  }

  p {
    padding: 0 10px 10px 10px;
    flex: 1;
  }

  .timestamp {
    color: #666;
    font-size: 12px;
    padding: 0 10px 10px 10px;
    text-align: right;
    margin-top: auto;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
  }

  @media (max-width: 782px) {
    top: 200px;
    right: 210px;
    width:350px;
    height:155px;
  }

      
  @media (max-width: 365px) {
        width: 308px;
        height: 140px;
        right:255px;
  }
`;

const BubbleThree = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
  background: var(--text-white);
  border-radius: 10px 10px 10px 10px;
  height: 140px;
  position: relative;

  h5 {
    color: #dd0218;
    padding: 4px 10px 0 10px;
    font-size: 15px;
  }

  p {
    padding: 0 10px 10px 10px;
    flex: 1;
  }

  .timestamp {
    color: #666;
    font-size: 12px;
    padding: 0 10px 10px 10px;
    text-align: right;
    margin-top: auto;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
  }

    @media (max-width: 782px) {
    width:350px;
    right: 620px;
    height:120px;
    top: 500px;
  }

   @media (max-width: 365px) {
        width: 308px;
  }
`;

const Bubblefour = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px;
  background: var(--text-white);
  border-radius: 10px 10px 10px 10px;
  height: 120px;
  position: relative;

  h5 {
    color: #dd0218;
    padding: 4px 10px 0 10px;
    font-size: 15px;
  }

  p {
    padding: 0 10px 10px 10px;
    flex: 1;
  }

  .timestamp {
    color: #666;
    font-size: 12px;
    padding: 0 10px 10px 10px;
    text-align: right;
    margin-top: auto;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
  }
    @media (max-width: 782px) {
    width:350px;
    right: 620px;
    height:120px;
    top: 500px;
  }

  
   @media (max-width: 365px) {
        width: 308px;
  }
`;

const Bubletreeandfour = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
