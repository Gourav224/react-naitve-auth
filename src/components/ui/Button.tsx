import { useTheme } from "@/src/context/ThemeProvider";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
} from "react-native";

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: "solid" | "outline";
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
}

export function Button({
    title,
    onPress,
    variant = "solid",
    loading = false,
    disabled = false,
    style,
}: ButtonProps) {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: variant === "solid" ? theme.colors.primary : "transparent",
                    borderColor: theme.colors.primary,
                    borderWidth: variant === "outline" ? 1 : 0,
                    opacity: disabled || loading ? 0.6 : 1,
                },
                style, // Allow custom styles
            ]}
            onPress={onPress}
            activeOpacity={0.7}
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
                            color: variant === "solid" ? "white" : theme.colors.primary,
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
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        minWidth: 150,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
});
