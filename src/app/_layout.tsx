import { Slot } from "expo-router";
import { ThemeProvider } from "../context/ThemeProvider";
import { AuthProvider } from "../context/AuthContext";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <StatusBar style="auto" />

                <Slot />
            </AuthProvider>
        </ThemeProvider>
    );
}
