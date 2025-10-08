import React, { useEffect } from "react";
import Header from './Header/Header';
import Hero from './Hero/Hero';
import Productos from './Productos/Productos';
import Categorias from './Categorias/Categorias';
import SobreMi from './SobreMi/SobreMi';
import Info from './Info/Info';
import Planes from './Planes/Planes';
import FAQ from './FAQ/FAQ';
import Footer from './Footer/Footer';

const Catalogo = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const HEADER_OFFSET = 100;

    const scrollToHash = (hash) => {
      if (!hash) return;
      const selector = hash.startsWith('#') ? hash : `#${hash}`;
      const target = document.querySelector(selector);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    };

    // Inicial: si entra con hash
    if (window.location.hash) {
      // pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => scrollToHash(window.location.hash), 50);
    }

    // Manejar cambios de hash (e.g., al hacer click en anchors)
    const onHashChange = () => {
      scrollToHash(window.location.hash);
    };
    window.addEventListener('hashchange', onHashChange);

    // Delegación de clicks en anchors internos para forzar scroll suave
    const onClick = (e) => {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      // Aceptar formatos: #id o /catalogo#id
      const isInternalHash = href.startsWith('#') || href.includes('/catalogo#');
      if (!isInternalHash) return;

      // Extraer hash
      let hash = '';
      if (href.startsWith('#')) hash = href;
      else {
        const idx = href.indexOf('#');
        if (idx >= 0) hash = href.slice(idx);
      }

      if (hash) {
        e.preventDefault();
        // Actualizar el hash sin recargar
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
      <div id="header">
        <Header />
      </div>
      
      <div id="hero">
        <Hero />
      </div>

      <div id="info">
        <Info />
      </div>

      <div id="categorias">
        <Categorias />
      </div>

            
      <div id="productos">
        <Productos />
      </div>
      
      
      <div id="sobre-mi">
        <SobreMi />
      </div>
      
      {/* <div id="strapi">
        <Strapi />
      </div> */}
      
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