import { useTheme } from "@/src/context/ThemeProvider";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: "solid" | "outline";
    loading?: boolean;
    disabled?: boolean;
}

export function Button({
    title,
    onPress,
    variant = "solid",
    loading = false,
    disabled = false,
}: ButtonProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor:
                        variant === "solid"
                            ? theme.colors.primary
                            : "transparent",
                    borderColor: theme.colors.primary,
                    borderWidth: variant === "outline" ? 1 : 0,
                    opacity: disabled ? 0.5 : 1,
                },
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === "solid" ? "white" : theme.colors.primary}
                />
            ) : (
                <Text
                    style={[
                        styles.text,
                        {
                            color:
                                variant === "solid"
                                    ? "white"
                                    : theme.colors.primary,
                        },
                    ]}
                >
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 48,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
});
