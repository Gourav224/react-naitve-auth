import { useTheme } from "@/src/context/ThemeProvider";
import { Stack } from "expo-router";

export default function AuthLayout() {
    const { theme } = useTheme();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.card,
                },
                headerTintColor: theme.colors.text,
                headerShadowVisible: false,
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    title: "Login",
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: "Create Account",
                }}
            />
        </Stack>
    );
}
