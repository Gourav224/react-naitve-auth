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

    const borderColor = error ? theme.colors.error : theme.colors.border;

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
                        borderColor: borderColor,
                    },
                ]}
            >
                <Picker
                    selectedValue={value}
                    onValueChange={onChange}
                    style={[styles.picker, { color: theme.colors.text }]}
                    dropdownIconColor={theme.colors.text}
                    accessibilityLabel="Gender Picker"
                    accessibilityHint="Select a gender from the options"
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
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 4,
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 4,
    },
    picker: {
        height: 50,
        paddingHorizontal: 12,
        justifyContent: "center",
    },
    error: {
        fontSize: 12,
        marginTop: 4,
    },
});
