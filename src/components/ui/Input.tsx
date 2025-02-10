import { useTheme } from "@/src/context/ThemeProvider";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
    TextStyle,
    ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
    label: string;
    error?: string;
    containerStyle?: ViewStyle;
}

export function Input({ label, error, containerStyle, ...props }: InputProps) {
    const { theme } = useTheme();

    return (
        <View style={[styles.container, containerStyle]}>
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
                placeholderTextColor={theme.colors.text + "99"}
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
        gap: 6,
        marginBottom: 12,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
    },
    input: {
        height: 50,
        borderWidth: 1.5,
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
        fontWeight: "500",
    },
});
