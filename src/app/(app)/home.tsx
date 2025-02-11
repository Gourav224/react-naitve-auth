import { Avatar } from "@/src/components/ui/Avatar";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeProvider";
import { View, Text, StyleSheet } from "react-native";

export default function Home() {
    const { user } = useAuth();
    const { theme } = useTheme();

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <View style={styles.header}>
                <Avatar
                    source={user?.avatar}
                    size={120}
                    style={styles.avatar}
                />
                <Text style={[styles.name, { color: theme.colors.text }]}>
                    Welcome, {user?.name}!
                </Text>
            </View>
            {/* Add more content here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        alignItems: "center",
        gap: 16,
        marginBottom: 30,
    },
    avatar: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
    },
    name: {
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
    },
});
