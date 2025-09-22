import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import CategoriaSection from './CategoriasComponents/CategoriaSection';

const Categorias = () => {
  const categoriasData = [
    {
      id: 1,
      nombre: "Calzas",
      descripcion: "Calzas cómodas y elásticas para tus entrenamientos",
      color: "#C58ADA",
      productos: [
        { id: 1, nombre: "Calza Deportiva Negra", precio: 15000, imagen: "/productos/calza1.jpg" },
        { id: 2, nombre: "Calza Deportiva Rosa", precio: 15000, imagen: "/productos/calza2.jpg" },
        { id: 3, nombre: "Calza Deportiva Azul", precio: 15000, imagen: "/productos/calza3.jpg" },
        { id: 4, nombre: "Calza Deportiva Verde", precio: 15000, imagen: "/productos/calza4.jpg" }
      ]
    },
    {
      id: 2,
      nombre: "Remeras",
      descripcion: "Remeras transpirables y cómodas para el deporte",
      color: "#9DC6DA",
      productos: [
        { id: 5, nombre: "Remera Deportiva Blanca", precio: 12000, imagen: "/productos/remera1.jpg" },
        { id: 6, nombre: "Remera Deportiva Negra", precio: 12000, imagen: "/productos/remera2.jpg" },
        { id: 7, nombre: "Remera Deportiva Gris", precio: 12000, imagen: "/productos/remera3.jpg" },
        { id: 8, nombre: "Remera Deportiva Azul", precio: 12000, imagen: "/productos/remera4.jpg" }
      ]
    },
    {
      id: 3,
      nombre: "Tops",
      descripcion: "Tops deportivos con soporte y estilo",
      color: "#9FC329",
      productos: [
        { id: 9, nombre: "Top Deportivo Negro", precio: 18000, imagen: "/productos/top1.jpg" },
        { id: 10, nombre: "Top Deportivo Rosa", precio: 18000, imagen: "/productos/top2.jpg" },
        { id: 11, nombre: "Top Deportivo Verde", precio: 18000, imagen: "/productos/top3.jpg" },
        { id: 12, nombre: "Top Deportivo Azul", precio: 18000, imagen: "/productos/top4.jpg" }
      ]
    },
    {
      id: 4,
      nombre: "Conjuntos",
      descripcion: "Conjuntos completos para lucir perfecta",
      color: "#BFE839",
      productos: [
        { id: 13, nombre: "Conjunto Deportivo Negro", precio: 25000, imagen: "/productos/conjunto1.jpg" },
        { id: 14, nombre: "Conjunto Deportivo Rosa", precio: 25000, imagen: "/productos/conjunto2.jpg" },
        { id: 15, nombre: "Conjunto Deportivo Verde", precio: 25000, imagen: "/productos/conjunto3.jpg" },
        { id: 16, nombre: "Conjunto Deportivo Azul", precio: 25000, imagen: "/productos/conjunto4.jpg" }
      ]
    }
  ];

  return (
    <CategoriasSection>
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
          <h2>Categorías de Productos</h2>
          <p>
            <Bold>
              Explora cada categoría y descubre todos nuestros productos disponibles.
            </Bold>{" "}
            Cada categoría contiene una selección cuidadosa de productos diseñados 
            para satisfacer tus necesidades deportivas.
          </p>
        </Header>

        {categoriasData.map((categoria, index) => (
          <CategoriaSection 
            key={categoria.id} 
            categoria={categoria} 
            index={index}
          />
        ))}
      </Container>
    </CategoriasSection>
  );
};

export default Categorias;

const CategoriasSection = styled.section`
  padding: 4rem 2rem;
  background: #EFEEE8;
  
  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 4rem;
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
