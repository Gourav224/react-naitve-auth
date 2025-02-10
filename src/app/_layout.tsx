import { Slot } from "expo-router";
import { ThemeProvider } from "../context/ThemeProvider";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Slot />
            </AuthProvider>
        </ThemeProvider>
    );
}
