export interface ThemeContextProps {
  theme: string;
  switchTheme: (newTheme: string) => void;
}
export interface ThemeProviderProps {
  children: React.ReactNode;
}
