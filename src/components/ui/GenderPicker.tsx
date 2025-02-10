import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../context/ThemeProvider";

interface GenderPickerProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export function GenderPicker({ value, onChange, error }: GenderPickerProps) {
    const { theme } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
                Gender
            </Text>
            <View
                style={[
                    styles.pickerContainer,
                    {
                        backgroundColor: theme.colors.card,
                        borderColor: error
                            ? theme.colors.error
                            : theme.colors.border,
                    },
                ]}
            >
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={[styles.picker, { color: theme.colors.text }]}
                    dropdownIconColor={theme.colors.text}
                >
                    <Picker.Item label="Select gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </View>
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
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
    },
    picker: {
        height: 48,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
    },
});
