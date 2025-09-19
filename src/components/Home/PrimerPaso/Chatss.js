import styled from "styled-components";

const ChatsBubble = () => {
  return (
    <ChatsContainer>
      <BubbleOne>
        <h5>Ani</h5>
        <p>
          Queria aprovechar para decirte que me encanta ver cómo vas avanzando
          como profesional. Admiro mucho tu dedicación y la forma en que
          acompañás a tus alumnos, me motiva a no bajar los brazos ❤️{" "}
        </p>
        <span className="timestamp">19:52</span>
      </BubbleOne>
      <BubbleTwo>
        <h5>Juancho</h5>
        <p>
          Sin darme cuenta voy descubrieno algunos cambios. Me ayudó el
          entrenamiento para regular el estrés del mes pasado 🙌🏽 💃🏽{" "}
        </p>
        <span className="timestamp">14:06</span>
      </BubbleTwo>
      <Bubletreeandfour>
        <BubbleThree>
          <h5>Lu</h5>
          <p>
            Justo me agarraste sacándome unas fotos porque veía que estos meses
            mejoramos jajaj{" "}
          </p>
          <span className="timestamp">9:00</span>
        </BubbleThree>
        <Bubblefour>
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
  right: 5%;
  z-index: 999;
  gap: 60px;
  top: 15%;
  align-items: flex-end;
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
    content: '';
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
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
    content: '';
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
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
    content: '';
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
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
    content: '';
    position: absolute;
    bottom: 20px;
    left: -10px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid var(--text-white);
  }
`;

const Bubletreeandfour = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
