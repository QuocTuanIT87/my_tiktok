import { createContext, useState } from 'react';

export const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState();

    const setDarkMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'dark');
        setIsDark(true);
    };

    const setLightMode = () => {
        document.querySelector('body').setAttribute('data-theme', 'light');
        setIsDark(false);
    };

    const value = {
        isDark,
        setDarkMode,
        setLightMode,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
