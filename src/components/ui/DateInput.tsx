import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from "react-native";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useTheme } from "../../context/ThemeProvider";

interface DateInputProps {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
    error?: string;
}

export function DateInput({ label, value, onChange, error }: DateInputProps) {
    const [show, setShow] = useState(false);
    const { theme } = useTheme();

    const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(Platform.OS === "ios");
        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: theme.colors.text }]}>
                {label}
            </Text>
            {Platform.OS === "ios" ? (
                <View
                    style={[
                        styles.dateContainer,
                        {
                            backgroundColor: theme.colors.card,
                            borderColor: error
                                ? theme.colors.error
                                : theme.colors.border,
                        },
                    ]}
                >
                    <DateTimePicker
                        value={value}
                        mode="date"
                        display="spinner"
                        onChange={handleChange}
                        style={styles.iosDatePicker}
                    />
                </View>
            ) : (
                <>
                    <TouchableOpacity
                        onPress={() => setShow(true)}
                        style={[
                            styles.dateButton,
                            {
                                backgroundColor: theme.colors.card,
                                borderColor: error
                                    ? theme.colors.error
                                    : theme.colors.border,
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.dateText,
                                { color: theme.colors.text },
                            ]}
                        >
                            {value.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                    {show && (
                        <DateTimePicker
                            value={value}
                            mode="date"
                            display="default"
                            onChange={handleChange}
                        />
                    )}
                </>
            )}
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
    dateContainer: {
        borderWidth: 1,
        borderRadius: 8,
        overflow: "hidden",
    },
    dateButton: {
        height: 48,
        borderWidth: 1,
        borderRadius: 8,
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    dateText: {
        fontSize: 16,
    },
    iosDatePicker: {
        height: 120,
    },
    error: {
        fontSize: 12,
        marginTop: 4,
    },
});
