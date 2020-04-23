export type FieldError = {
    name: string;
    message: string;
};

export type Inputs = {
    name: "firstName" | "lastName" | "email" | "message";
    placeholder?: string;
    label?: string;
    type?: string;
};
