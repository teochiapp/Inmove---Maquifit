import React from 'react';
import styled from 'styled-components';

const SobreMiImage = () => {
  return (
    <ImageSection>
      <ProfileImage src="/home/sobremi.png" alt="Maquifit" />
    </ImageSection>
  );
};

export default SobreMiImage;

const ImageSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 40px;
  object-fit: cover;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

