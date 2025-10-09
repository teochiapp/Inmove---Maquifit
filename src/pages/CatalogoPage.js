import React from 'react';
import { Helmet } from 'react-helmet-async';
import Catalogo from '../components/Catalogo/Catalogo';

const CatalogoPage = () => {
  return (
    <>
      <Helmet>
        <title>Inmove - Tienda</title>
        <meta name="description" content="Descubre nuestra colección de ropa deportiva de alta calidad. Conjuntos, calzas, tops y más para tu entrenamiento." />
        <meta property="og:title" content="Inmove - Tienda de Productos Deportivos" />
        <meta property="og:description" content="Descubre nuestra colección de ropa deportiva de alta calidad. Conjuntos, calzas, tops y más para tu entrenamiento." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Catalogo />
    </>
  );
};

export default CatalogoPage;
