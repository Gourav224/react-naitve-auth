import { ProfileForm } from "@/src/components/forms/ProfileForm";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeProvider";
import { useRouter } from "expo-router";
import { View, ScrollView, StyleSheet, Text } from "react-native";

export default function Profile() {
    const { user, logout } = useAuth();
    const { theme } = useTheme();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    return (
        <ScrollView
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                    Profile
                </Text>
                <Text style={[styles.subTitle, { color: theme.colors.text }]}>
                    Manage your account settings and preferences
                </Text>
            </View>

            <ProfileForm user={user!} />

            <View style={styles.footer}>
                <Button
                    onPress={handleLogout}
                    title="Logout"
                    variant="outline"
                    style={styles.logoutButton}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        alignItems: "center",
        padding: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        textAlign: "center",
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        marginBottom: 16,
    },
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    logoutButton: {
        paddingVertical: 12,
        borderRadius: 8,
    },
});
