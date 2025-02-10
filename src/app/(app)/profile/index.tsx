import { ProfileForm } from "@/src/components/forms/ProfileForm";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/context/AuthContext";
import { useTheme } from "@/src/context/ThemeProvider";
import { useRouter } from "expo-router";
import { View, ScrollView, StyleSheet } from "react-native";

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
            <ProfileForm user={user!} />
            <View style={styles.footer}>
                <Button
                    onPress={handleLogout}
                    title="Logout"
                    variant="outline"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        padding: 20,
    },
});
