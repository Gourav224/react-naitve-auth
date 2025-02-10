import { useTheme } from "@/src/context/ThemeProvider";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
                {label}
            </Text>
            <TextInput
                style={[
                    styles.input,
                    {
                        backgroundColor: theme.colors.card,
                        color: theme.colors.text,
                        borderColor: error
                            ? theme.colors.error
                            : theme.colors.border,
                    },
                ]}
                placeholderTextColor={theme.colors.text + "80"}
                {...props}
            />
            {error && (
                <Text style={[styles.error, { color: theme.colors.error }]}>
                    {error}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
    },
});
