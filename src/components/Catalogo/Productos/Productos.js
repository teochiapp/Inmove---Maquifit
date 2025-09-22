import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import ProductosGrid from './ProductosComponents/ProductosGrid';

const Productos = () => {
  const categorias = [
    {
      id: 1,
      nombre: "Calzas",
      descripcion: "Calzas cómodas y elásticas para tus entrenamientos",
      color: "#C58ADA"
    },
    {
      id: 2,
      nombre: "Remeras",
      descripcion: "Remeras transpirables y cómodas para el deporte",
      color: "#9DC6DA"
    },
    {
      id: 3,
      nombre: "Tops",
      descripcion: "Tops deportivos con soporte y estilo",
      color: "#9FC329"
    },
    {
      id: 4,
      nombre: "Conjuntos",
      descripcion: "Conjuntos completos para lucir perfecta",
      color: "#BFE839"
    }
  ];

  return (
    <ProductosSection>
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
          <h2>Nuestros Productos</h2>
          <p>
            <Bold>
              Descubre nuestra colección de ropa deportiva de alta calidad.
            </Bold>{" "}
            Cada pieza está diseñada para brindarte comodidad, estilo y funcionalidad 
            en tus entrenamientos y actividades deportivas.
          </p>
        </Header>

        <ProductosGrid categorias={categorias} />
      </Container>
    </ProductosSection>
  );
};

export default Productos;

const ProductosSection = styled.section`
  padding: 4rem 2rem;
  background: #F9F8F3;
  
  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  padding: 0rem 2rem;
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
    max-width: 700px;
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
