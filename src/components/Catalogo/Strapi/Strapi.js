import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import StrapiDebug from './StrapiComponents/StrapiDebug';

const Strapi = () => {
  return (
    <StrapiSection>
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
          <h2>Productos desde Strapi</h2>
          <p>
            <Bold>
              Conecta con nuestra base de datos de productos en tiempo real.
            </Bold>{" "}
            Esta sección muestra los productos cargados directamente desde Strapi CMS, 
            incluyendo información detallada, imágenes y configuración.
          </p>
        </Header>

        <StrapiDebug />
      </Container>
    </StrapiSection>
  );
};

export default Strapi;

const StrapiSection = styled.section`
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
