import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCategoriasWithFallback } from '../../hooks/useCategorias';

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
            {categorias.map((categoria, index) => (
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
  background: var(--background-white-color);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 2.5rem;
  text-align: center;

  h2 {
    font-size: 32px;
    font-weight: 600;
    color: var(--text-black);
    margin: 0;
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
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  position: relative;
  height: 220px;
  border-radius: 32px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    height: 180px;
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
  background: linear-gradient(135deg, rgba(38, 38, 38, 0.7), rgba(38, 38, 38, 0.1));
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.5rem;
`;

const Icon = styled.div`
  width: 36px;
  height: 36px;
  margin-bottom: 0.5rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: brightness(0) invert(1);
  }

  span {
    font-size: 1.8rem;
    color: white;
  }
`;

const Name = styled.h3`
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
  text-align: left;
  margin: 0;
  font-family: 'Onest', sans-serif;
`;

const VerMasButton = styled.button`
  position: absolute;
  bottom: 1.5rem;
  right: 1.25rem;
  background: white;
  border: none;
  border-radius: 100px;
  padding: 8px 8px 8px 14px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    background: #f8f9fa;
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 18px;
  padding-right: 3px;
`;

const ArrowIcon = styled.div`
  width: 28px;
  height: 28px;
  object-fit: contain;
  background: var(--inmove-rosa-color);
  border-radius: 50%;
  padding: 6px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: rotate(180deg) scaleX(-1);
  }
`;


