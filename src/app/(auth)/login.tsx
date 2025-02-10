import { View } from "react-native";
import { Stack } from "expo-router";
import { useTheme } from "@/src/context/ThemeProvider";
import { LoginForm } from "@/src/components/forms/LoginForm";

export default function Login() {
    const { theme } = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Stack.Screen
                options={{
                    title: "Login",
                    headerStyle: {
                        backgroundColor: theme.colors.card,
                    },
                    headerTintColor: theme.colors.text,
                }}
            />
            <LoginForm />
        </View>
    );
}
