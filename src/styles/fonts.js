// Font utilities for styled-components
export const fonts = {
  primary: "'Onest', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
  weights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  }
};

// Helper function to get font weight
export const getFontWeight = (weight) => fonts.weights[weight] || fonts.weights.regular;

// Common font styles
export const fontStyles = {
  heading: {
    fontFamily: fonts.primary,
    fontWeight: fonts.weights.bold,
    lineHeight: 1.2
  },
  subheading: {
    fontFamily: fonts.primary,
    fontWeight: fonts.weights.semiBold,
    lineHeight: 1.3
  },
  body: {
    fontFamily: fonts.primary,
    fontWeight: fonts.weights.regular,
    lineHeight: 1.6
  },
  caption: {
    fontFamily: fonts.primary,
    fontWeight: fonts.weights.medium,
    lineHeight: 1.4
  }
};
