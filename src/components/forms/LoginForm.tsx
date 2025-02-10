import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { loginSchema } from "../../utils/validation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeProvider";

export function LoginForm() {
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();
    const { theme } = useTheme();

    const handleSubmit = async (values: {
        email: string;
        password: string;
    }) => {
        try {
            await login(values.email, values.password);
            router.replace("/(app)/home");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, values, handleChange, errors, touched }) => (
                <View style={styles.container}>
                    <Text style={[styles.title, { color: theme.colors.text }]}>
                        Welcome Back
                    </Text>

                    <Input
                        label="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        error={touched.email ? errors.email : undefined}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        containerStyle={styles.input}
                    />
                    <Input
                        label="Password"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        error={touched.password ? errors.password : undefined}
                        secureTextEntry
                        containerStyle={styles.input}
                    />

                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <Button
                        onPress={handleSubmit}
                        title="Login"
                        style={styles.loginButton}
                    />
                    <Button
                        onPress={() => router.push("/register")}
                        title="Create Account"
                        variant="outline"
                        style={styles.registerButton}
                    />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    input: {
        width: "100%",
    },
    error: {
        color: "red",
        marginTop: 8,
        textAlign: "center",
    },
    loginButton: {
        width: "100%",
        backgroundColor: "#007AFF",
    },
    registerButton: {
        width: "100%",
        borderColor: "#007AFF",
    },
});
