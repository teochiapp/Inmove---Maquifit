import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams();
  
  // Datos de ejemplo para el producto
  const producto = {
    id: id,
    nombre: 'Base de Maquillaje Premium',
    precio: '$25.000',
    descripcion: 'Base de maquillaje de larga duración con acabado natural. Perfecta para todo tipo de piel.',
    imagen: '/placeholder.jpg',
    categoria: 'Maquillaje',
    stock: 15,
    caracteristicas: [
      'Duración de 12 horas',
      'Resistente al agua',
      'SPF 15',
      'Para todo tipo de piel'
    ]
  };

  return (
    <div className="single-product">
      <div className="breadcrumb">
        <Link to="/">Inicio</Link> / 
        <Link to="/catalogo">Catálogo</Link> / 
        <span>{producto.nombre}</span>
      </div>
      
      <div className="product-details">
        <div className="product-image">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>
        
        <div className="product-info">
          <h1>{producto.nombre}</h1>
          <p className="categoria">{producto.categoria}</p>
          <p className="precio">{producto.precio}</p>
          <p className="descripcion">{producto.descripcion}</p>
          
          <div className="caracteristicas">
            <h3>Características:</h3>
            <ul>
              {producto.caracteristicas.map((caracteristica, index) => (
                <li key={index}>{caracteristica}</li>
              ))}
            </ul>
          </div>
          
          <div className="stock">
            <p>Stock disponible: {producto.stock} unidades</p>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-btn">Agregar al Carrito</button>
            <button className="wishlist-btn">Agregar a Favoritos</button>
          </div>
        </div>
      </div>
      
      <div className="related-products">
        <h2>Productos Relacionados</h2>
        {/* Aquí irían productos relacionados */}
      </div>
    </div>
  );
};

export default SingleProduct;
