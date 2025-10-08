import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePlanes } from "../../../hooks/usePlanes";
import ModalCheckout from "./ModalCheckout";

const Planes = () => {
  // Obtener planes desde Strapi
  const { planes, loading, error } = usePlanes();
  
  // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Mapeo de features con sus iconos correspondientes
  const featureIcons = {
    "Plan de entrenamiento 100% personalizado (3 a 6 días, en gimnasio o en casa con pocos elementos).":
      "pesa.png",
    "Orientación nutricional adaptada a tus objetivos y estilo de vida.":
      "manzana.png",
    "Videos explicativos de cada ejercicio.": "videocamara.png",
    "Ideas de recetas y colaciones fit (dulces y saladas).": "libro.png",
    "Control de progreso con fotos y medidas al finalizar las 4 semanas.":
      "camara.png",
    "Acceso al grupo exclusivo Team Naquifit (recetas, tips y motivación diaria).":
      "like.png",
    "Asesoramiento por whats app (lunes a viernes 8 a 18 hs - sábados 9 a 15 hs).":
      "dialog-colored.png",
    "Todo lo del plan de 4 semanas.": "suma-blue.png",
    "Readaptación del plan según tu progreso (cada 4 semanas).":
      "pesa-blue.png",
    "Cambios evolutivos en fuerza, técnica y hábitos.": "biceps.png",
    "Todo lo del plan de 3 meses.": "suma-verde.png",
    "Readaptación mensual personalizada.": "pesa-verde.png",
    "Seguimiento continuo para lograr resultados duraderos.":
      "biceps-verde.png",
  };

  // Colores predefinidos para los planes
  const planColors = ["#C58ADA", "#9DC6DA", "#9FC329"];

  // Transformar datos de Strapi al formato esperado por el componente
  const plansFormatted = planes
    .map((plan) => ({
      id: plan.id,
      title: plan.attributes.Titulo,
      price: plan.attributes.Precio,
      description: plan.attributes.Descripcion,
      highlight: plan.attributes.Subtitulo,
    }))
    .sort((a, b) => Number(a.price) - Number(b.price))
    .map((plan, index) => ({
      ...plan,
      color: planColors[index % planColors.length],
      featured: index === 1, // El segundo plan será destacado
      // Features asignadas según el índice DESPUÉS de ordenar por precio
      features: index === 0 ? [
        "Plan de entrenamiento 100% personalizado (3 a 6 días, en gimnasio o en casa con pocos elementos).",
        "Orientación nutricional adaptada a tus objetivos y estilo de vida.",
        "Videos explicativos de cada ejercicio.",
        "Ideas de recetas y colaciones fit (dulces y saladas).",
        "Control de progreso con fotos y medidas al finalizar las 4 semanas.",
        "Acceso al grupo exclusivo Team Naquifit (recetas, tips y motivación diaria).",
        "Asesoramiento por whats app (lunes a viernes 8 a 18 hs - sábados 9 a 15 hs).",
      ] : index === 1 ? [
        "Todo lo del plan de 4 semanas.",
        "Readaptación del plan según tu progreso (cada 4 semanas).",
        "Cambios evolutivos en fuerza, técnica y hábitos.",
      ] : [
        "Todo lo del plan de 3 meses.",
        "Readaptación mensual personalizada.",
        "Seguimiento continuo para lograr resultados duraderos.",
      ]
    }));

  const handleCheckout = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  // Mostrar loading
  if (loading) {
    return (
      <PlanesSection>
        <Container>
          <LoadingContainer>
            <LoadingText>Cargando planes...</LoadingText>
          </LoadingContainer>
        </Container>
      </PlanesSection>
    );
  }

  // Mostrar error
  if (error) {
    return (
      <PlanesSection>
        <Container>
          <ErrorContainer>
            <ErrorTitle>Error al cargar los planes</ErrorTitle>
            <ErrorMessage>{error}</ErrorMessage>
          </ErrorContainer>
        </Container>
      </PlanesSection>
    );
  }

  // Si no hay planes
  if (plansFormatted.length === 0) {
    return (
      <PlanesSection>
        <Container>
          <ErrorContainer>
            <ErrorTitle>No hay planes disponibles</ErrorTitle>
            <ErrorMessage>Por favor, contacta con el administrador.</ErrorMessage>
          </ErrorContainer>
        </Container>
      </PlanesSection>
    );
  }

  // Componente SVG personalizado
  const CustomArrowIcon = ({ $color }) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.8335 5.83301L14.1668 5.83301L14.1668 14.1663"
        stroke={$color}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.8335 14.1663L14.1668 5.83301"
        stroke={$color}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <PlanesSection>
      <Container>
        <Header
          as={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
            ease: "easeOut" 
          }}
        >
          <h2>Planes de entrenamiento</h2>
          <p>
            <Bold>
              Entrenamientos personalizados, nutrición adaptada y seguimiento
              contínuo.
            </Bold>{" "}
            Cada plan está pensado para que progreses paso a paso, mejorando
            fuerza, técnica y composición corporal mientras incorporás hábitos
            saludables que se ajustan a tu estilo de vida.
          </p>
        </Header>

        <PlansGrid
          as={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ 
            duration: window.innerWidth <= 768 ? 0.4 : 0.8, 
            ease: "easeOut",
            delay: window.innerWidth <= 768 ? 0.1 : 0.3 
          }}
        >
          {plansFormatted.map((plan) => (
            <PlanCard key={plan.id} $color={plan.color}>
              <Highlight $color={plan.color}>
                {plan.highlight.toUpperCase()}
              </Highlight>
              <PlanTitle $color={plan.color}>{plan.title}</PlanTitle>
              <PlanPrice $color={plan.color}>
                ${plan.price.toLocaleString("es-AR", { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0 
                })}
              </PlanPrice>
              <PlanDescription>{plan.description}</PlanDescription>
              <SectionTitle>¿Qué incluye?</SectionTitle>
              <PlanFeatures $color={plan.color}>
                {plan.features.map((f, i) => (
                  <li key={i}>
                    <FeatureIcon
                      src={`/icons/${featureIcons[f]}`}
                      alt="Feature icon"
                    />
                    {f}
                  </li>
                ))}
              </PlanFeatures>
              <PlanButton
                $color={plan.color}
                onClick={() => handleCheckout(plan)}
              >
                <ButtonText>Empezá hoy</ButtonText>
                <ArrowIcon $color={plan.color}>
                  <CustomArrowIcon $color={plan.color} />
                </ArrowIcon>
              </PlanButton>
            </PlanCard>
          ))}
        </PlansGrid>
      </Container>
      
      <ModalCheckout 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plan={selectedPlan}
      />
    </PlanesSection>
  );
};

export default Planes;

/* ===== styled-components ===== */

const PlanesSection = styled.section`
  padding: 4rem 2rem;
  background: #EFEEE8;
  
  @media (max-width: 370px) {
    padding: 4rem 1rem;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 3rem;
  padding: 0rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10vw;

  h2 {
    font-size: 54px;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1rem;
  }

  p {
    color: var(--text-black);
    font-size: 19px;
    font-weight: 300;
    border-left: var(--primary-color) 1.5px solid;
    max-width: 700px;
    margin: 0 auto;
    padding-left: 16px;
  }

  @media (max-width: 1024px) {
    p {
      font-size: 17px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;

    h2 {
      font-size: 38px;
    }

    p {
      font-size: 16px;
    }
  }
`;

const PlansGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  
  @media (max-width: 370px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

const PlanCard = styled.div`
  background: #F9F8F3;
  border-radius: 30px;
  padding: 2.5rem 2rem;
  border: 2.5px solid ${(props) => props.$color};
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  margin-top: 1.5rem;
  
  @media (max-width: 370px) {
    padding: 2rem 1.5rem;
    margin-top: 1rem;
  }
`;

const Highlight = styled.div`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: white;
  letter-spacing: 1.15px;
  background: ${(props) => props.$color};
  padding: 5px 10px;
  border-radius: 8px;
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  white-space: nowrap;

    @media screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const PlanTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: ${(props) => props.$color};
  text-transform: uppercase;
  letter-spacing: 1.25px;
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  color: var(--text-black);
`;

const PlanDescription = styled.p`
  text-align: center;
  color: var(--text-black);
  font-weight: 500;
  font-size: 16px;
  height: 100px;

  @media screen and (max-width: 1200px) {
    font-size: 14px;
    height: 80px;
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
    height: 60px;
  }

  @media screen and (max-width: 480px) {
    height: 70px;
  }
`;

const SectionTitle = styled.h4`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 0.3rem;
  color: var(--text-black);

  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  
`;

const PlanFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 30px;

  li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-weight: 300;
    align-items: center;
    font-size: 16px;
    color: var(--text-black);

    @media screen and (min-width: 1054px) and (max-width: 1200px) {
      font-size: 12px;
    }

    
    @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  }

  img {
    width: 24px;
    height: 24px;
  }

    @media screen and (max-width: 768px) {
     img {
      width: 20px;
      height: 20px;
     }
  }
`;

const PlanButton = styled.button`
  margin-top: auto;
  background: ${(props) => props.$color};
  border: none;
  border-radius: 100px;
  padding: 10px 10px 10px 16px;
  padding-left: 14px;
  cursor: pointer;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  

`;

const Bold = styled.span`
  font-weight: 500;
`;

const ButtonText = styled.span`
  color: var(--text-white);
  font-family: "Onest", sans-serif;
  font-weight: 500;
  font-size: 20px;
  padding-right: 3px;

    @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ArrowIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 50%;
  padding: 6px;

  svg {
    color: white;
    font-size: 1.2rem;
  }
`;

const FeatureIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
  flex-shrink: 0;
`;

// Componentes de loading y error
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 300px;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  min-height: 300px;
  text-align: center;
`;

const ErrorTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--text-black);
  font-family: 'Onest', sans-serif;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: #666;
  font-family: 'Onest', sans-serif;
`;
