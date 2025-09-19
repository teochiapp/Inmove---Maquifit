import React from 'react';
import { Link } from 'react-router-dom';

const Catalogo = () => {
  // Datos de ejemplo para los productos
  const productos = [
    { id: 1, nombre: 'Base de Maquillaje', precio: '$25.000', imagen: '/placeholder.jpg' },
    { id: 2, nombre: 'Labial Rojo', precio: '$15.000', imagen: '/placeholder.jpg' },
    { id: 3, nombre: 'Sombra de Ojos', precio: '$20.000', imagen: '/placeholder.jpg' },
    { id: 4, nombre: 'Máscara de Pestañas', precio: '$18.000', imagen: '/placeholder.jpg' },
  ];

  return (
    <div className="catalogo">
      <div className="catalogo-header">
        <h1>Catálogo de Productos</h1>
        <p>Descubre nuestra amplia gama de productos de belleza</p>
      </div>
      
      <div className="filtros">
        <button className="filtro-btn active">Todos</button>
        <button className="filtro-btn">Maquillaje</button>
        <button className="filtro-btn">Cuidado Facial</button>
        <button className="filtro-btn">Accesorios</button>
      </div>
      
      <div className="productos-grid">
        {productos.map(producto => (
          <div key={producto.id} className="producto-card">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p className="precio">{producto.precio}</p>
            <Link to={`/producto/${producto.id}`} className="ver-producto-btn">
              Ver Detalles
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
