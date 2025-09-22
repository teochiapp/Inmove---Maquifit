import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { generarUrlProducto } from '../../../utils/slugUtils';
import { getProductoPortada, getProductoAltText } from '../../../utils/imageUtils';

const ProductoCard = ({ producto }) => {
  // Acceder a los datos de Strapi correctamente
  const attributes = producto.attributes || {};
  const id = producto.id;
  
  return (
    <CardContainer>
      <ImageContainer>
        <Link to={generarUrlProducto(attributes.Nombre)}>
          <ProductImage 
            src={getProductoPortada(producto)} 
            alt={getProductoAltText(producto)} 
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
            }}
          />
        </Link>
      </ImageContainer>
      
      <CardContent>
        <ProductNameLink to={generarUrlProducto(attributes.Nombre)}>
          {attributes.Nombre || 'Sin nombre'}
        </ProductNameLink>
        
        {attributes.Talle && (
          <ProductDetail>
            <DetailLabel>Talle:</DetailLabel>
            <DetailValue>{attributes.Talle}</DetailValue>
          </ProductDetail>
        )}
        
        {attributes.Color && (
          <ProductDetail>
            <DetailLabel>Color:</DetailLabel>
            <DetailValue>{attributes.Color}</DetailValue>
          </ProductDetail>
        )}
        
        <ViewButton to={generarUrlProducto(attributes.Nombre)}>
          Ver Detalles
        </ViewButton>
      </CardContent>
    </CardContainer>
  );
};

export default ProductoCard;

const CardContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
  
  &:hover {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const ProductNameLink = styled(Link)`
  font-family: 'Onest', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: #262626;
  margin-bottom: 1rem;
  line-height: 1.4;
  text-decoration: none;
  display: block;
  transition: color 0.3s ease;
  
  &:hover {
    color: #B088E0;
  }
`;

const ProductDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const DetailLabel = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #666;
`;

const DetailValue = styled.span`
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  color: #262626;
`;

const ViewButton = styled(Link)`
  display: inline-block;
  width: 100%;
  padding: 0.75rem 1rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #B088E0 0%, #8B5CF6 100%);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-family: 'Onest', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    transform: translateY(-1px);
  }
`;
