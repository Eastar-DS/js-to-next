/**
 * Theme Definition
 * Presentation Layer - Styled Components Theme
 */

/**
 * 테마 타입 정의
 */
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    error: string;
    border: string;
    hover: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      small: string;
      medium: string;
      large: string;
      xlarge: string;
    };
    fontWeight: {
      normal: number;
      medium: number;
      bold: number;
    };
  };
  borderRadius: {
    small: string;
    medium: string;
    large: string;
  };
  shadows: {
    small: string;
    medium: string;
    large: string;
  };
}

/**
 * 기본 테마
 */
export const theme: Theme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#2c3e50',
    textSecondary: '#7f8c8d',
    error: '#e74c3c',
    border: '#ecf0f1',
    hover: '#f8f9fa',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      small: '12px',
      medium: '16px',
      large: '24px',
      xlarge: '32px',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
  },
  shadows: {
    small: '0 1px 3px rgba(0, 0, 0, 0.12)',
    medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
    large: '0 10px 20px rgba(0, 0, 0, 0.15)',
  },
};
