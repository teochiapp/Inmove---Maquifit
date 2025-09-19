import React from 'react';
import styled from 'styled-components';

const TeamContainer = styled.section`
  padding: 5rem 2rem;
  background: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 3rem;
  font-weight: 800;
  color: #1F2937;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.25rem;
  color: #6B7280;
  margin-bottom: 4rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
`;

const TeamCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const TeamImage = styled.div`
  width: 150px;
  height: 150px;
  background: linear-gradient(135deg, #8B5CF6, #A855F7);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`;

const TeamName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1F2937;
  margin-bottom: 0.5rem;
`;

const TeamRole = styled.p`
  color: #8B5CF6;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TeamDescription = styled.p`
  color: #6B7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const TeamSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  background: #F3F4F6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #6B7280;
  transition: all 0.3s ease;
  
  &:hover {
    background: #8B5CF6;
    color: white;
    transform: translateY(-2px);
  }
`;

const Team = () => {
  const teamMembers = [
    {
      name: 'María González',
      role: 'Fundadora & Personal Trainer',
      description: 'Especialista en entrenamiento funcional y transformación corporal con más de 8 años de experiencia.',
      icon: '👩‍💼',
      social: ['📧', '📱', '💼']
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Nutricionista Deportivo',
      description: 'Experto en nutrición deportiva y planes alimentarios personalizados para optimizar resultados.',
      icon: '👨‍⚕️',
      social: ['📧', '📱', '💼']
    },
    {
      name: 'Ana Martínez',
      role: 'Coach de Bienestar',
      description: 'Especialista en mindfulness y bienestar integral, ayudando a crear hábitos saludables sostenibles.',
      icon: '👩‍🎓',
      social: ['📧', '📱', '💼']
    }
  ];

  return (
    <TeamContainer>
      <Container>
        <SectionTitle>Nuestro Team</SectionTitle>
        <SectionSubtitle>Profesionales comprometidos con tu transformación</SectionSubtitle>
        
        <TeamGrid>
          {teamMembers.map((member, index) => (
            <TeamCard key={index}>
              <TeamImage>{member.icon}</TeamImage>
              <TeamName>{member.name}</TeamName>
              <TeamRole>{member.role}</TeamRole>
              <TeamDescription>{member.description}</TeamDescription>
              <TeamSocial>
                {member.social.map((socialIcon, socialIndex) => (
                  <SocialIcon key={socialIndex} href="#">
                    {socialIcon}
                  </SocialIcon>
                ))}
              </TeamSocial>
            </TeamCard>
          ))}
        </TeamGrid>
      </Container>
    </TeamContainer>
  );
};

export default Team;
