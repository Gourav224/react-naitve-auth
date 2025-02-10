import { createContext, useContext } from "react";
import { darkTheme } from "../utils/theme";

const ThemeContext = createContext({
    theme: darkTheme,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeContext.Provider value={{ theme: darkTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
