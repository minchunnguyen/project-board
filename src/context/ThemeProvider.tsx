import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { themeLight, themeDark } from '../../src/theme';

export const ThemeContext = React.createContext({
  usedTheme: themeLight,
  themeSwitch: () => {},
});

type Props = {
  children: React.ReactNode;
};

const ThemeContextProvider = (props: Props) => {
  const [theme, setTheme] = useState(themeDark);

  const handleThemeSwitch = () => {
    theme === themeLight ? setTheme(themeDark) : setTheme(themeLight);
  };

  return (
    <ThemeContext.Provider
      value={{ usedTheme: theme, themeSwitch: handleThemeSwitch }}
    >
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
