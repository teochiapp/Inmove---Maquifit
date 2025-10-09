import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import SingleProduct from '../components/SingleProduct/SingleProduct';

const SingleProductPage = () => {
  const { nombre } = useParams();
  const productoNombre = nombre ? nombre.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Producto';
  
  return (
    <>
      <Helmet>
        <title>{`Inmove - ${productoNombre}`}</title>
        <meta name="description" content={`Descubre ${productoNombre}. Ropa deportiva de alta calidad para tu entrenamiento.`} />
        <meta property="og:title" content={`Inmove - ${productoNombre}`} />
        <meta property="og:description" content={`Descubre ${productoNombre}. Ropa deportiva de alta calidad para tu entrenamiento.`} />
      </Helmet>
      <SingleProduct />
    </>
  );
};

export default SingleProductPage;
