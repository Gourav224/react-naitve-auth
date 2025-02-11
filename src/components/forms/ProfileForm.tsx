import { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import * as yup from "yup";
import { User } from "@/src/types";
import { useAuth } from "@/src/context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { Input } from "../ui/Input";
import { GenderPicker } from "../ui/GenderPicker";
import { DateInput } from "../ui/DateInput";
import { Button } from "../ui/Button";

const profileSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    gender: yup
        .string()
        .oneOf(["male", "female", "other"], "Invalid gender")
        .required("Gender is required"),
    dateOfBirth: yup
        .date()
        .max(new Date(), "Invalid date")
        .required("Date of birth is required"),
});

interface ProfileFormProps {
    user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { updateProfile } = useAuth();

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

    const handleSubmit = async (values: Partial<User>) => {
        try {
            await updateProfile(values);
            setSuccessMessage("Profile updated successfully!");
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        }
    };

    return (
        <Formik
            initialValues={{
                name: user.name,
                email: user.email,
                gender: user.gender,
                dateOfBirth: new Date(user.dateOfBirth),
                avatar: user.avatar,
            }}
            validationSchema={profileSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, values, setFieldValue, errors, touched }) => (
                <View style={styles.container}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            source={values.avatar}
                            size={120}
                            onPress={async () => {
                                const uri = await handleImagePick();
                                if (uri) setFieldValue("avatar", uri);
                            }}
                        />
                        <TouchableOpacity
                            onPress={async () => {
                                const uri = await handleImagePick();
                                if (uri) setFieldValue("avatar", uri);
                            }}
                        >
                            <Text
                                style={[
                                    styles.avatarLabel,
                                    { color: values.avatar ? "green" : "gray" },
                                ]}
                            >
                                {values.avatar
                                    ? "Tap to change avatar"
                                    : "Tap to select avatar"}
                            </Text>
                        </TouchableOpacity>
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

                    <GenderPicker
                        value={values.gender}
                        onChange={(value) => setFieldValue("gender", value)}
                        error={touched.gender ? errors.gender : undefined}
                    />

                    {/* Date of Birth Picker */}
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

                    {successMessage ? (
                        <Text style={styles.successMessage}>
                            {successMessage}
                        </Text>
                    ) : null}

                    <Button
                        onPress={() => handleSubmit()}
                        title="Update Profile"
                        style={styles.submitButton}
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
    avatarContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatarLabel: {
        fontSize: 14,
        marginTop: 8,
        fontWeight: "600",
        textAlign: "center",
    },
    error: {
        color: "red",
        marginTop: 8,
        fontSize: 14,
    },
    successMessage: {
        color: "green",
        marginTop: 8,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "600",
    },
    submitButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 8,
    },
});
