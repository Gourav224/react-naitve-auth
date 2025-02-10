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
                <Avatar source={user?.avatar} size={120} />
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
    },
    header: {
        alignItems: "center",
        gap: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
    },
});
