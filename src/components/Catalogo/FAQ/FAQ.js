import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle } from "react-icons/fi"; // ícono del botón

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cómo hago mi pedido?",
      answer:
        "Elegís tus productos, armás el pedido en la web y con un clic se envía todo listo a WhatsApp.",
    },
    {
      question: "¿Cómo pago?",
      answer:
        "Aceptamos transferencias bancarias, tarjetas de crédito y débito.",
    },
    {
      question: "¿Hacen envíos?",
      answer: "Sí, realizamos envíos a todo el país en 3 a 7 días hábiles.",
    },
    {
      question: "¿Qué pasa si algo no me queda bien?",
      answer:
        "Podés cambiarlo sin costo dentro de los 30 días, siempre con etiquetas originales.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQSection>
      <Container>
        {/* Columna izquierda */}
        <LeftColumn>
          <h2>Preguntas Frecuentes</h2>
          <CTAButton onClick={() => window.open('https://wa.me/5493513797137', '_blank')}>
            <ButtonText>Escribime!</ButtonText>
            <DialogIcon src="/icons/dialog.png" alt="Dialog" />
          </CTAButton>
        </LeftColumn>

        {/* Columna derecha */}
        <RightColumn>
          {faqs.map((faq, index) => (
            <FAQItem key={index}>
              <FAQQuestion onClick={() => toggleFAQ(index)}>
                <QuestionText>{faq.question}</QuestionText>
                <ToggleIcon>
                  {openIndex === index ? "−" : "+"}
                </ToggleIcon>
              </FAQQuestion>
              <AnimatePresence>
                {openIndex === index && (
                  <FAQAnswer
                    as={motion.div}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <AnswerText>{faq.answer}</AnswerText>
                  </FAQAnswer>
                )}
              </AnimatePresence>
            </FAQItem>
          ))}
        </RightColumn>
      </Container>
    </FAQSection>
  );
};

export default FAQ;

const FAQSection = styled.section`
  background-color: #efeee8;
  padding: 4rem 2rem;
  margin: 3rem 2rem;
  border-radius: 42px;
  width: calc(100% - 4rem);
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    margin: 2rem 1rem;
    padding: 3rem 1.5rem;
    width: calc(100% - 2rem);
  }
  
  @media (max-width: 480px) {
    margin: 1rem 0.5rem;
    padding: 2rem 1rem;
    width: calc(100% - 1rem);
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 3rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 480px) {
    gap: 1.5rem;
  }
`;

const LeftColumn = styled.div`
  width: 100%;
  box-sizing: border-box;
  
  h2 {
    font-size: clamp(28px, 5vw, 40px);
    font-weight: 600;
    margin-bottom: 2rem;
    color: #1f2937;
    word-wrap: break-word;
    line-height: 1.2;
  }
`;

const CTAButton = styled.button`
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
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
  font-family: "Onest", sans-serif;
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
  background: var(--inmove-rosa-color);
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

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  min-width: 0;
  border-top: 1px solid var(--text-black);

`;

const FAQItem = styled.div`
  border-bottom: 1px solid var(--text-black);
  width: 100%;
  box-sizing: border-box;
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.2rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #010205;
`;

const QuestionText = styled.span`
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
`;

const ToggleIcon = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: var(--inmove-rosa-color);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  line-height: 1;
`;

const FAQAnswer = styled.div`
  padding: 0;
  overflow: hidden;
  
  /* Padding interno para el contenido */
  > p {
    padding: 0.8rem 0 1.2rem 0;
    margin: 0;
  }
`;

const AnswerText = styled.p`
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  /* El padding y margin se manejan en FAQAnswer */
`;
