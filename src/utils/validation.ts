import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

export const registerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Password is required"),
    gender: yup
        .string()
        .oneOf(["male", "female", "other"], "Invalid gender")
        .required("Gender is required"),
    dateOfBirth: yup
        .date()
        .max(new Date(), "Invalid date")
        .required("Date of birth is required"),
});
