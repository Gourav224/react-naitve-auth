import {
    View,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
} from "react-native";
import { Stack } from "expo-router";
import { RegisterForm } from "@/src/components/forms/RegisterForm";
import { useTheme } from "@/src/context/ThemeProvider";

export default function RegisterScreen() {
    const { theme } = useTheme();

    return (
        <>
            <Stack.Screen
                options={{
                    title: "Create Account",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerTintColor: theme.colors.text,
                }}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.background },
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <View style={styles.header}>
                        <Text
                            style={[styles.title, { color: theme.colors.text }]}
                        >
                            Welcome!
                        </Text>
                        <Text
                            style={[
                                styles.subtitle,
                                { color: theme.colors.text + "80" },
                            ]}
                        >
                            Create an account to get started
                        </Text>
                    </View>

                    <RegisterForm />
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 12,
        gap: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 16,
    },
});
