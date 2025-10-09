import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCategoriasWithFallback } from '../../../hooks/useCategorias';

const CategoriasNav = () => {
  const navigate = useNavigate();
  const { categorias, loading, error } = useCategoriasWithFallback();

  const handleVerMas = (slug) => {
    navigate(`/#categoria-${slug}`);
  };

  if (loading) {
    return (
      <Section>
        <Container>
          <LoadingMessage>Cargando categorías...</LoadingMessage>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Container>
          <ErrorMessage>Error al cargar las categorías. Intenta nuevamente.</ErrorMessage>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <Header>
          <h2>Nuestros Productos</h2>
        </Header>

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
      </Container>
    </Section>
  );
};

export default CategoriasNav;

const Section = styled.section`
  padding: 4rem 2rem;
  background: var(--background-white-color);
  
  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 4rem;
  padding: 0rem 2rem;
  text-align: center;

  h2 {
    font-size: 54px;
    font-weight: 600;
    color: var(--text-black);
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-black);
    font-size: 19px;
    font-weight: 300;
    max-width: 700px;
    margin: 0 auto;
  }

  @media (max-width: 1024px) {
    p {
      font-size: 17px;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 27px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  color: var(--text-black);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 4rem 0;
  font-size: 1.2rem;
  color: #e74c3c;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  position: relative;
  height: 250px;
  border-radius: 40px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    height: 180px;
    border-radius: 15px;
  }
  
  @media (max-width: 480px) {
    height: 160px;
    border-radius: 12px;
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
  font-size: 4rem;
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
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-bottom: 0.5rem;
  
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
`;

const Name = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: left;
  margin: 0;
  font-family: 'Onest', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const VerMasButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 1.5rem;
  background: white;
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
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
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus {
    outline: 2px solid var(--inmove-rosa-color);
    outline-offset: 2px;
  }
  
  @media (max-width: 1024px) {
    bottom: 1.2rem;
    right: 1.2rem;
    padding: 8px 8px 8px 14px;
  }
  
  @media (max-width: 768px) {
    bottom: 1rem;
    right: 1rem;
    padding: 6px 6px 6px 12px;
  }
  
  @media (max-width: 480px) {
    bottom: 0.8rem;
    right: 0.8rem;
    padding: 4px 4px 4px 10px;
  }
`;

const ButtonText = styled.span`
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 20px;
  padding-right: 3px;
  
  @media (max-width: 1024px) {
    font-size: 18px;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

const ArrowIcon = styled.div`
  width: 32px;
  height: 32px;
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
  
  @media (max-width: 1024px) {
    width: 28px;
    height: 28px;
    padding: 5px;
  }
  
  @media (max-width: 768px) {
    width: 24px;
    height: 24px;
    padding: 4px;
  }
  
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    padding: 3px;
  }
`;



