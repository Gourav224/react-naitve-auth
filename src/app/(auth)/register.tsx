import {
    View,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
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
                    headerStyle: { backgroundColor: theme.colors.background },
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.header}>
                            <Text
                                style={[
                                    styles.title,
                                    { color: theme.colors.text },
                                ]}
                            >
                                Welcome! 🎉
                            </Text>
                            <Text
                                style={[
                                    styles.subtitle,
                                    { color: theme.colors.text + "99" },
                                ]}
                            >
                                Create an account to get started
                            </Text>
                        </View>

                        <View style={styles.formContainer}>
                            <RegisterForm />
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
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
        justifyContent: "center",
        paddingHorizontal: 6, // Increased horizontal padding for better spacing
        paddingVertical: 16, // Added vertical padding for better spacing
    },
    header: {
        alignItems: "center",
        marginBottom: 36, // Increased margin for a better separation between header and form
    },
    title: {
        fontSize: 28, // Increased font size for better readability
        fontWeight: "700",
        textAlign: "center", // Ensuring title is centered
    },
    subtitle: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 6,
    },
    formContainer: {
        paddingBottom: 20, // Added extra padding for better spacing at the bottom
    },
});
