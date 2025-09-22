import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Qué tallas tienen disponibles?",
      answer: "Tenemos tallas desde XS hasta XXL. Cada producto incluye una guía de tallas detallada para ayudarte a elegir la talla correcta."
    },
    {
      question: "¿Cuáles son los materiales de los productos?",
      answer: "Utilizamos materiales de alta calidad como poliéster, elastano y algodón técnico que ofrecen transpirabilidad, elasticidad y durabilidad."
    },
    {
      question: "¿Hacen envíos a todo el país?",
      answer: "Sí, realizamos envíos a todo el país. Los tiempos de entrega varían según la ubicación, generalmente entre 3 a 7 días hábiles."
    },
    {
      question: "¿Cuál es la política de devoluciones?",
      answer: "Ofrecemos 30 días para cambios y devoluciones. Los productos deben estar en perfecto estado y con etiquetas originales."
    },
    {
      question: "¿Cómo puedo contactar para consultas?",
      answer: "Puedes contactarnos por WhatsApp, email o a través de nuestras redes sociales. Estamos disponibles de lunes a viernes de 8 a 18h."
    },
    {
      question: "¿Los productos tienen garantía?",
      answer: "Todos nuestros productos tienen garantía de calidad. Si encuentras algún defecto de fabricación, te lo reemplazamos sin costo."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQSection>
      <Container>
        <Header
          as={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
            ease: "easeOut" 
          }}
        >
          <h2>Preguntas Frecuentes</h2>
          <p>
            <Bold>
              Resolvemos las dudas más comunes sobre nuestros productos.
            </Bold>{" "}
            Si no encuentras la respuesta que buscas, no dudes en contactarnos.
          </p>
        </Header>

        <FAQContainer
          as={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
            ease: "easeOut",
            delay: window.innerWidth <= 768 ? 0.1 : 0.3 
          }}
        >
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                delay: index * 0.1
              }}
            >
              <FAQQuestion 
                onClick={() => toggleFAQ(index)}
                $isOpen={openIndex === index}
              >
                <QuestionText>{faq.question}</QuestionText>
                <ToggleIcon $isOpen={openIndex === index}>+</ToggleIcon>
              </FAQQuestion>
              <FAQAnswer $isOpen={openIndex === index}>
                <AnswerText>{faq.answer}</AnswerText>
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQContainer>
      </Container>
    </FAQSection>
  );
};

export default FAQ;

const FAQSection = styled.section`
  padding: 4rem 2rem;
  background: #F9F8F3;
  
  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;

  h2 {
    font-size: 54px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-black);
    font-size: 19px;
    font-weight: 300;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    p {
      font-size: 17px;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 38px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const Bold = styled.span`
  font-weight: 500;
`;

const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FAQQuestion = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(197, 138, 218, 0.05);
  }
`;

const QuestionText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-black);
  flex: 1;
  margin-right: 1rem;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ToggleIcon = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  transition: transform 0.3s ease;
  transform: ${props => props.$isOpen ? 'rotate(45deg)' : 'rotate(0deg)'};
`;

const FAQAnswer = styled.div`
  max-height: ${props => props.$isOpen ? '200px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AnswerText = styled.p`
  padding: 0 1.5rem 1.5rem;
  font-size: 16px;
  font-weight: 400;
  color: var(--text-black);
  line-height: 1.6;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
