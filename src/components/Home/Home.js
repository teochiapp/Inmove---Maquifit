import React from "react";
import Hero from "./Hero/Hero";
import Tienda from "./Tienda/Tienda";
import SobreMi from "./SobreMi/SobreMi";
import Beneficios from "./Beneficios/Beneficios";
import Transformacion from "./Transformacion/Transformacion";
import Planes from "./Planes/Planes";
import Objetivos from "./Objetivos/Objetivos";
import PrimerPaso from "./PrimerPaso/PrimerPaso";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <>
      <div id="hero">
        <Hero />
      </div>
      
      <div id="tienda">
        <Tienda />
      </div>
      
      <div id="sobre-mi">
        <SobreMi />
      </div>
      
      <div id="transformacion">
        <Transformacion />
      </div>
      
      <div id="beneficios">
        <Beneficios />
      </div>
      
      <div id="primer-paso">
        <PrimerPaso />
      </div>
      
      <div id="planes">
        <Planes />
      </div>
      
      <div id="objetivos">
        <Objetivos />
      </div>
      
      <Footer />
    </>
  );
};

export default Home;
