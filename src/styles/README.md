# Fuente Onest - Guía de Uso

## Importación
La fuente Onest ya está importada en `src/index.css` con todos los weights disponibles (100-900).

## Uso en Styled Components

### Método 1: Directo en styled-components
```javascript
const Title = styled.h1`
  font-family: 'Onest', sans-serif;
  font-weight: 800;
  font-size: 2rem;
`;
```

### Método 2: Usando las utilidades (recomendado)
```javascript
import { fonts, getFontWeight } from '../styles/fonts';

const Title = styled.h1`
  font-family: ${fonts.primary};
  font-weight: ${getFontWeight('bold')};
  font-size: 2rem;
`;
```

### Método 3: Usando estilos predefinidos
```javascript
import { fontStyles } from '../styles/fonts';

const Title = styled.h1`
  ${fontStyles.heading}
  font-size: 2rem;
`;
```

## Weights Disponibles
- `thin`: 100
- `extraLight`: 200
- `light`: 300
- `regular`: 400 (por defecto)
- `medium`: 500
- `semiBold`: 600
- `bold`: 700
- `extraBold`: 800
- `black`: 900

## Ejemplos de Uso

### Títulos
```javascript
const MainTitle = styled.h1`
  font-family: 'Onest', sans-serif;
  font-weight: 800;
  font-size: 3rem;
  line-height: 1.2;
`;
```

### Subtítulos
```javascript
const Subtitle = styled.h2`
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 1.3;
`;
```

### Texto del cuerpo
```javascript
const BodyText = styled.p`
  font-family: 'Onest', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
`;
```

### Botones
```javascript
const Button = styled.button`
  font-family: 'Onest', sans-serif;
  font-weight: 600;
  font-size: 1rem;
`;
```

## CSS Global
La fuente Onest ya está configurada como fuente principal en el body, por lo que todos los elementos heredarán esta fuente automáticamente.
