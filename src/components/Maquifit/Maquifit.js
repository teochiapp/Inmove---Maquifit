import React, { useEffect } from "react";
import Hero from "./Hero/Hero";
import Tienda from "./Tienda/Tienda";
import SobreMi from "./SobreMi/SobreMi";
import Beneficios from "./Beneficios/Beneficios";
import Transformacion from "./Transformacion/Transformacion";
import Planes from "./Planes/Planes";
import Objetivos from "./Objetivos/Objetivos";
import PrimerPaso from "./PrimerPaso/PrimerPaso";
import Footer from "./Footer/Footer";
import ScrollToTopButton from "./Footer/FooterComponents/ScrollToTopButton";

const Maquifit = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const HEADER_OFFSET = 100;

    const scrollToHash = (hash) => {
      if (!hash || hash === '#') return;
      const selector = hash.startsWith('#') ? hash : `#${hash}`;
      if (selector.length <= 1) return;
      
      try {
        const target = document.querySelector(selector);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } catch (error) {
        console.warn('Invalid selector:', selector);
      }
    };

    // Scroll inicial si hay hash en la URL
    if (window.location.hash) {
      setTimeout(() => scrollToHash(window.location.hash), 100);
    }

    // Manejar cambios de hash
    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);

    // Delegación de clicks en anchors internos
    const onClick = (e) => {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const isInternalHash = href.startsWith('#') || href.includes('/maquifit#');
      if (!isInternalHash) return;

      let hash = '';
      if (href.startsWith('#')) hash = href;
      else {
        const idx = href.indexOf('#');
        if (idx >= 0) hash = href.slice(idx);
      }

      if (hash) {
        e.preventDefault();
        if (window.location.hash !== hash) {
          window.history.pushState(null, '', hash);
        }
        scrollToHash(hash);
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('click', onClick);
    };
  }, []);

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
      <ScrollToTopButton />
    </>
  );
};

export default Maquifit;
