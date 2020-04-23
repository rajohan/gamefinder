export const initialStateValues = {
    firstName: "",
    lastName: "",
    email: "",
    message: ""
};

export const initialStateTouched = (
    value: boolean
): { firstName: boolean; lastName: boolean; email: boolean; message: boolean } => ({
    firstName: value,
    lastName: value,
    email: value,
    message: value
});
