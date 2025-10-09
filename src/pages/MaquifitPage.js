import React from 'react';
import { Helmet } from 'react-helmet-async';
import Maquifit from '../components/Maquifit/Maquifit';

const MaquifitPage = () => {
  return (
    <>
      <Helmet>
        <title>Inmove - Maquifit</title>
        <meta name="description" content="Maquifit - Planes de entrenamiento y alimentación personalizados. Transforma tu cuerpo con programas adaptados a tus objetivos." />
        <meta property="og:title" content="Inmove - Maquifit | Entrenamiento y Nutrición Personalizada" />
        <meta property="og:description" content="Maquifit - Planes de entrenamiento y alimentación personalizados. Transforma tu cuerpo con programas adaptados a tus objetivos." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Maquifit />
    </>
  );
};

export default MaquifitPage;


