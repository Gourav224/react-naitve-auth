import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { loginSchema } from "../../utils/validation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuth } from "@/src/context/AuthContext";

export function LoginForm() {
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

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
                    <Input
                        label="Email"
                        value={values.email}
                        onChangeText={handleChange("email")}
                        error={touched.email ? errors.email : undefined}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Password"
                        value={values.password}
                        onChangeText={handleChange("password")}
                        error={touched.password ? errors.password : undefined}
                        secureTextEntry
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <Button onPress={handleSubmit} title="Login" />
                    <Button
                        onPress={() => router.push("/register")}
                        title="Create Account"
                        variant="outline"
                    />
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 16,
    },
    error: {
        color: "red",
        marginTop: 8,
    },
});
