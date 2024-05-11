import { FC, useEffect, useState } from "react";
import { ThemeContextProps, ThemeProviderProps } from "../types/types";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const localStorageTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(localStorageTheme || 'default');

  const switchTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (!localStorageTheme) {
      localStorage.setItem('theme', theme);
    }
  }, [localStorageTheme, theme]);

  const contextValue: ThemeContextProps = {
    theme,
    switchTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <div className={`app ${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};