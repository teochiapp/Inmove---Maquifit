import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCategoriasWithFallback } from '../../../hooks/useCategorias';

const CategoriasNav = () => {
  const navigate = useNavigate();
  const { categorias, loading, error } = useCategoriasWithFallback();

  const handleVerMas = (slug) => {
    navigate(`/catalogo#categoria-${slug}`);
  };

  return (
    <Section>
      <Container>
        <Header>
          <h2>Más Categorías</h2>
        </Header>

        {loading && <LoadingMessage>Cargando categorías...</LoadingMessage>}
        {error && <ErrorMessage>Error al cargar las categorías.</ErrorMessage>}

        {!loading && !error && (
          <Grid>
            {categorias.map((categoria) => (
              <Card key={categoria.id} $color={categoria.color}>
                <Image>
                  {categoria.portada ? (
                    <img src={categoria.portada} alt={categoria.nombre} />
                  ) : (
                    <Placeholder $color={categoria.color}>📦</Placeholder>
                  )}
                </Image>

                <Overlay>
                  <Icon>
                    {categoria.icono ? <img src={categoria.icono} alt={categoria.nombre} /> : <span>📦</span>}
                  </Icon>
                  <Name>{categoria.nombre}</Name>
                </Overlay>

                <VerMasButton onClick={() => handleVerMas(categoria.slug)}>
                  <ButtonText>Ver más</ButtonText>
                  <ArrowIcon>
                    <img src="/icons/arrow-top.png" alt="Arrow" />
                  </ArrowIcon>
                </VerMasButton>
              </Card>
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
};

export default CategoriasNav;

const Section = styled.section`
  padding: 4rem 2rem;
  background: #F9F5F0;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 2.5rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;

  h2 {
    font-family: 'Onest', sans-serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    font-weight: 600;
    color: #262626;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem 0;
  font-size: 1rem;
  color: var(--text-black);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem 0;
  font-size: 1rem;
  color: #e74c3c;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    gap: 1.25rem;
  }
`;

const Card = styled.div`
  position: relative;
  height: 190px;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    height: 140px;
    border-radius: 20px;
  }
  
  @media (max-width: 480px) {
    height: 130px;
    border-radius: 16px;
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${props => props.$color}20, ${props => props.$color}40);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  opacity: 0.7;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(38, 38, 38, 0.75) 0%, rgba(38, 38, 38, 0.3) 60%, transparent 100%);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2rem;
  gap: 1rem;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 1.25rem;
  }
`;

const Icon = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  span {
    font-size: 2rem;
    color: white;
  }
  
  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    
    span {
      font-size: 1.75rem;
    }
  }
  
  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    
    span {
      font-size: 1.5rem;
    }
  }
`;

const Name = styled.h3`
  color: white;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem);
  font-weight: 600;
  text-align: left;
  margin: 0;
  font-family: 'Onest', sans-serif;
  letter-spacing: -0.02em;
`;

const VerMasButton = styled.button`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-50%) scale(1);
  }
  
  @media (max-width: 768px) {
    right: 1.5rem;
    padding: 8px 8px 8px 14px;
  }
  
  @media (max-width: 480px) {
    right: 1.25rem;
    padding: 8px 8px 8px 12px;
  }
`;

const ButtonText = styled.span`
  color: #262626;
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: clamp(0.95rem, 2vw, 1.05rem);
  padding-right: 3px;
`;

const ArrowIcon = styled.div`
  width: 30px;
  height: 30px;
  object-fit: contain;
  background: var(--inmove-rosa-color);
  border-radius: 50%;
  padding: 7px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: rotate(180deg) scaleX(-1);
  }
  
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    padding: 6px;
  }
  
  @media (max-width: 480px) {
    width: 26px;
    height: 26px;
    padding: 5px;
  }
`;



