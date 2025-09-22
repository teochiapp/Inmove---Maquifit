import React from "react";
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Productos from './Productos/Productos';
import Categorias from './Categorias/Categorias';
import SobreMi from './SobreMi/SobreMi';
import Strapi from './Strapi/Strapi';
import Planes from './Planes/Planes';
import FAQ from './FAQ/FAQ';
import Footer from './Footer/Footer';

const Catalogo = () => {
  return (
    <>
      <div id="header">
        <Header />
      </div>
      
      <div id="hero">
        <Hero />
      </div>
      
      <div id="productos">
        <Productos />
      </div>
      
      <div id="categorias">
        <Categorias />
      </div>
      
      <div id="sobre-mi">
        <SobreMi />
      </div>
      
      <div id="strapi">
        <Strapi />
      </div>
      
      <div id="planes">
        <Planes />
      </div>
      
      <div id="faq">
        <FAQ />
      </div>
      
      <Footer />
    </>
  );
};

export default Catalogo;