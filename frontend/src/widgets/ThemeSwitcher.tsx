import { useTheme } from "../app/contexts/ThemeContext";

export const ThemeSwitcher: React.FC = () => {
  const { theme, switchTheme } = useTheme();

  const themes = ['default', 'theme-light', 'theme-yellow'];

  const handleThemeChange = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    switchTheme(themes[nextIndex]);
    //console.log('New Theme:', themes[nextIndex]); // Log the new theme
  };

  return (
    <button onClick={handleThemeChange} className="mx-4">
      Toggle Theme
    </button>
  );
};
