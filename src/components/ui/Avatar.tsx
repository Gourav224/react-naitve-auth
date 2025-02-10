import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/src/context/ThemeProvider";

interface AvatarProps {
    source?: string;
    size?: number;
    onPress?: () => void;
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
                },
            ]}
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
        return <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;
    }

    return content;
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: "#ccc",
    },
    placeholder: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
    },
});
