import React from "react";
import styled from "styled-components";
import { ShoppingCart, List, Send } from "lucide-react"; // íconos opcionales

const Info = () => {
  const items = [
    {
      icon: <ShoppingCart size={20} color="var(--inmove-color)" />,
      title: "ELEGI TUS PRODUCTOS",
      text: "Sumá al carrito todo lo que te guste.",
    },
    {
      icon: <List size={20} color="var(--inmove-color)" />,
      title: "GENERÁ TU PEDIDO",
      text: "Con un clic la app arma el resumen automático con todo lo que elegiste.",
    },
    {
      icon: <Send size={20} color="var(--inmove-color)" />,
      title: "ENVIÁ POR WHATSAPP",
      text: "Mandás el pedido ya listo y coordinamos la entrega al toque.",
    },
  ];

  return (
    <Container>
      {items.map((item, index) => (
        <Card key={index}>
          <TitleRow>
            <IconWrapper>{item.icon}</IconWrapper>
            <Title>{item.title}</Title>
          </TitleRow>
          <Text>{item.text}</Text>
        </Card>
      ))}
    </Container>
  );
};

export default Info;

// ---------- styled-components ----------

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  padding: 2rem 1.5rem; /* padding lateral */
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: nowrap; /* mantener siempre en una fila */

  @media (max-width: 1024px) {
    gap: 1.5rem;
    padding: 2rem 1.25rem;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1.5rem 1rem;
    justify-content: center; /* centrar cards en mobile */
    flex-wrap: wrap; /* permitir wrap solo en mobile */
  }
`;

const Card = styled.div`
  flex: 1 1 calc(33.333% - 2rem); /* mantener 3 por fila hasta mobile */
  min-width: 200px; /* reducir min-width para tablet */
  text-align: left;
  padding: 1rem;

  @media (max-width: 992px) {
    min-width: 180px; /* aún más pequeño en tablet */
    padding: 0.8rem;
  }

  @media (max-width: 600px) {
    flex: 1 1 100%;
    min-width: 0;
    text-align: center; /* centrar contenido en mobile */
    padding: 1rem;
  }
`;

const IconWrapper = styled.div`
`;

const TitleRow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  background: #DA5F8B1A;
  margin: 0;
  margin-bottom: 1.5rem;
  padding: 5px 10px;
  border-radius: 8px;

  @media (max-width: 768px) {
    gap: 0.4rem;
    padding: 4px 8px;
    justify-content: center; /* centrar icono+título en mobile */
  }
`;

const Title = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  margin: 0;
  letter-spacing: 1.2px;
  color: var(--inmove-color);
  font-weight: 700;
  text-transform: uppercase;


  @media (max-width: 992px) {
    font-size: 0.8rem;
    letter-spacing: 1px;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  color: var(--text-black);
  line-height: 1.4;

  @media (max-width: 992px) {
    font-size: 0.9rem;
    line-height: 1.3;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
    text-align: center; /* centrar texto en mobile */
  }
`;
