import { useState, useEffect } from "react";
import { useTheme } from "../app/contexts/ThemeContext";

export const ThemeSwitcher: React.FC = () => {
  const { theme, switchTheme } = useTheme();
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(false);

  useEffect(() => {
    if(theme != 'default'){
      setIsDarkThemeEnabled(true);
    } else {
      setIsDarkThemeEnabled(false);
    }
  }, [theme]);
  // const themes = ['default', 'theme-light', 'theme-yellow'];

  const handleThemeChange = () => {
    const isDark = !isDarkThemeEnabled;
    setIsDarkThemeEnabled(!isDarkThemeEnabled);
    if(isDark){
      switchTheme('theme-light');
    } else {
      switchTheme('default');
    } 
    // const currentIndex = themes.indexOf(theme);
    // const nextIndex = (currentIndex + 1) % themes.length;
    // switchTheme(themes[nextIndex]);
    //console.log('New Theme:', themes[nextIndex]); // Log the new theme
  };

  return (
    <button onClick={handleThemeChange} className="mx-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill={isDarkThemeEnabled ? "#08e8de" : "#ffffff"} version="1.1" id="Capa_1" width="20px" height="20px" viewBox="0 0 30.457 30.457">
        <g>
          <path d="M29.693,14.49c-0.469-0.174-1-0.035-1.32,0.353c-1.795,2.189-4.443,3.446-7.27,3.446c-5.183,0-9.396-4.216-9.396-9.397   c0-2.608,1.051-5.036,2.963-6.835c0.366-0.347,0.471-0.885,0.264-1.343c-0.207-0.456-0.682-0.736-1.184-0.684   C5.91,0.791,0,7.311,0,15.194c0,8.402,6.836,15.238,15.238,15.238c8.303,0,14.989-6.506,15.219-14.812   C30.471,15.118,30.164,14.664,29.693,14.49z" />
        </g>
      </svg>
    </button>
  );
};
