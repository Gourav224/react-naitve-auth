import { View, Image, TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/context/ThemeProvider";

interface AvatarProps {
    source?: string;
    size?: number;
    onPress?: () => void;
    style?: ViewStyle;
}

export function Avatar({ source, size = 100, onPress }: AvatarProps) {
    const { theme } = useTheme();

    const content = source ? (
        <Image
            source={{ uri: source }}
            style={[
                styles.image,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    borderColor: theme.colors.border,
                },
            ]}
            onError={(e) =>
                console.log("Image failed to load", e.nativeEvent.error)
            }
        />
    ) : (
        <View
            style={[
                styles.placeholder,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                },
            ]}
        >
            <Ionicons
                name="person"
                size={size * 0.5}
                color={theme.colors.text}
            />
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={{ borderRadius: size / 2 }}
            >
                {content}
            </TouchableOpacity>
        );
    }

    return content;
}

const styles = StyleSheet.create({
    image: {
        resizeMode: "cover",
        borderWidth: 2,
    },
    placeholder: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
    },
});
