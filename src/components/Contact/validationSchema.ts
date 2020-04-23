import * as yup from "yup";

export const schema = yup.object().shape({
    firstName: yup
        .string()
        .required("First name is required.")
        .min(2, "The first name must be at least 2 characters."),
    lastName: yup
        .string()
        .required("Last name is required.")
        .min(2, "The last name must be at least 2 characters."),
    email: yup
        .string()
        .required("Email is required.")
        .email("Invalid email address."),
    message: yup
        .string()
        .required("Message is required.")
        .min(10, "The message must be at least 10 characters.")
});
