// ThemeContext.tsx
import { createContext, useContext } from 'react';
import { ThemeContextProps } from '../types/types';

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};