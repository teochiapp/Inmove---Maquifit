import React from 'react';
import useAPI from '../hooks/useAPI';

const StrapiDataExample = () => {
  // Ejemplo 1: Obtener todos los productos
  const { data: productosData, loading: productosLoading, error: productosError } = useAPI('/productos');
  
  // Ejemplo 2: Obtener un producto específico
  const { data: productoData, loading: productoLoading, error: productoError } = useAPI('/productos/1');

  // Estructura de respuesta de Strapi:
  /*
  Para /productos (colección):
  {
    "data": [
      {
        "id": 1,
        "attributes": {
          "Nombre": "Mi Producto",
          "Descripcion": "Descripción del producto",
          "Talle": "M",
          "Color": "Azul",
          "CategoriaProducto": {
            "data": {
              "id": 1,
              "attributes": {
                "Nombre": "Remeras",
                "createdAt": "2023-...",
                "updatedAt": "2023-...",
                "publishedAt": "2023-..."
              }
            }
          },
          "createdAt": "2023-...",
          "updatedAt": "2023-...",
          "publishedAt": "2023-..."
        }
      }
    ],
    "meta": {
      "pagination": {
        "page": 1,
        "pageSize": 25,
        "pageCount": 1,
        "total": 1
      }
    }
  }

  Para /productos/1 (item individual):
  {
    "data": {
      "id": 1,
      "attributes": {
        "Nombre": "Mi Producto",
        "Descripcion": "Descripción del producto",
        "Talle": "M",
        "Color": "Azul",
        "CategoriaProducto": {
          "data": {
            "id": 1,
            "attributes": {
              "Nombre": "Remeras",
              "createdAt": "2023-...",
              "updatedAt": "2023-...",
              "publishedAt": "2023-..."
            }
          }
        },
        "createdAt": "2023-...",
        "updatedAt": "2023-...",
        "publishedAt": "2023-..."
      }
    },
    "meta": {}
  }
  */

  // Cómo acceder a los datos:
  const productos = productosData?.data || [];
  const producto = productoData?.data;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Ejemplo de uso de datos de Strapi</h1>
      
      {/* Ejemplo 1: Lista de productos */}
      <section>
        <h2>1. Lista de productos</h2>
        {productosLoading && <p>Cargando productos...</p>}
        {productosError && <p>Error: {productosError}</p>}
        {productos.length > 0 && (
          <div>
            <p>Total de productos: {productos.length}</p>
            <ul>
              {productos.map((item) => (
                <li key={item.id}>
                  <strong>ID:</strong> {item.id} | 
                  <strong> Nombre:</strong> {item.attributes.Nombre} | 
                  <strong> Talle:</strong> {item.attributes.Talle} | 
                  <strong> Color:</strong> {item.attributes.Color} | 
                  <strong> Categoría:</strong> {item.attributes.CategoriaProducto?.data?.attributes?.Nombre || 'No asignada'}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Ejemplo 2: Producto individual */}
      <section>
        <h2>2. Producto individual (ID: 1)</h2>
        {productoLoading && <p>Cargando producto...</p>}
        {productoError && <p>Error: {productoError}</p>}
        {producto && (
          <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
            <h3>{producto.attributes.Nombre}</h3>
            <p><strong>ID:</strong> {producto.id}</p>
            <p><strong>Descripción:</strong> {producto.attributes.Descripcion}</p>
            <p><strong>Talle:</strong> {producto.attributes.Talle}</p>
            <p><strong>Color:</strong> {producto.attributes.Color}</p>
            <p><strong>Categoría:</strong> {producto.attributes.CategoriaProducto?.data?.attributes?.Nombre || 'No asignada'}</p>
            <p><strong>Creado:</strong> {new Date(producto.attributes.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </section>

      {/* Ejemplo 3: Datos raw para debugging */}
      <section>
        <h2>3. Datos raw (para debugging)</h2>
        <details>
          <summary>Ver estructura completa de productos</summary>
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
            {JSON.stringify(productosData, null, 2)}
          </pre>
        </details>
        
        <details>
          <summary>Ver estructura completa de producto individual</summary>
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
            {JSON.stringify(productoData, null, 2)}
          </pre>
        </details>
      </section>
    </div>
  );
};

export default StrapiDataExample;
