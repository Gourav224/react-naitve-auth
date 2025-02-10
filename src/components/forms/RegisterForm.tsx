import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/src/context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { registerSchema } from "@/src/utils/validation";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { GenderPicker } from "../ui/GenderPicker";
import { DateInput } from "../ui/DateInput";

interface RegisterFormValues {
    name: string;
    email: string;
    password: string;
    gender: "male" | "female" | "other";
    dateOfBirth: Date;
    avatar?: string;
}

export function RegisterForm() {
    const [error, setError] = useState("");
    const { register } = useAuth();
    const router = useRouter();

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0].uri;
        }
    };

    const handleSubmit = async (values: RegisterFormValues) => {
        try {
            await register(values);
            router.replace("/(app)/home");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        }
    };

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
                gender: "male",
                dateOfBirth: new Date(),
                avatar: undefined,
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, values, setFieldValue, errors, touched }) => (
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            source={values.avatar}
                            onPress={async () => {
                                const uri = await handleImagePick();
                                if (uri) setFieldValue("avatar", uri);
                            }}
                        />
                    </View>
                    <Input
                        label="Name"
                        value={values.name}
                        onChangeText={(text) => setFieldValue("name", text)}
                        error={touched.name ? errors.name : undefined}
                    />
                    <Input
                        label="Email"
                        value={values.email}
                        onChangeText={(text) => setFieldValue("email", text)}
                        error={touched.email ? errors.email : undefined}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Input
                        label="Password"
                        value={values.password}
                        onChangeText={(text) => setFieldValue("password", text)}
                        error={touched.password ? errors.password : undefined}
                        secureTextEntry
                    />
                    <GenderPicker
                        value={values.gender}
                        onChange={(value) => setFieldValue("gender", value)}
                        error={touched.gender ? errors.gender : undefined}
                    />
                    <DateInput
                        label="Date of Birth"
                        value={values.dateOfBirth}
                        onChange={(date) => setFieldValue("dateOfBirth", date)}
                        error={
                            touched.dateOfBirth && errors.dateOfBirth
                                ? String(errors.dateOfBirth)
                                : undefined
                        }
                    />
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                    <Button onPress={() => handleSubmit()} title="Register" />
                    <Button
                        onPress={() => router.push("/login")}
                        title="Already have an account?"
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
    avatarContainer:{
        alignItems: "center",
    }
});
