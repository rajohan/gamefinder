import React, { useContext, useEffect, useState } from "react";
import { ValidationError } from "yup";

import { StoreContext } from "../../store";
import Input from "../Shared/Form/Input";
import InputError from "../Shared/Form/Input/InputError";
import Form from "../Shared/Form";
import Button from "../Shared/Form/Button";
import Success from "../Shared/Form/Success";
import { initialStateTouched, initialStateValues } from "./initialStates";
import { Inputs, FieldError } from "./types";
import { schema } from "./validationSchema";
import { setTitle } from "../../store/actions";

const Contact: React.FC = (): React.ReactElement => {
    const { dispatch } = useContext(StoreContext);
    const [values, setValues] = useState(initialStateValues);
    const [touched, setTouched] = useState(initialStateTouched(false));
    const [messageSent, setMessageSent] = useState(false);
    const [currentErrors, setCurrentErrors] = useState<FieldError[]>();

    useEffect(() => {
        dispatch(setTitle("Contact"));
    }, [dispatch]);

    useEffect(() => {
        schema
            .validate(values, { abortEarly: false })
            .then(() => setCurrentErrors([]))
            .catch(errors => {
                setCurrentErrors(
                    errors.inner.map((error: ValidationError) => {
                        return { name: error.path, message: error.message };
                    })
                );
            });
    }, [values]);

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>
    ): void => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleBlur = (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>): void => {
        setTouched({
            ...touched,
            [event.target.name]: true
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (schema.isValidSync(values)) {
            console.log("Message sent", values);
            setValues(initialStateValues);
            setTouched(initialStateTouched(false));
            setMessageSent(true);
        } else {
            setMessageSent(false);
            setTouched(initialStateTouched(true));
        }
    };

    const renderError = (field: string): boolean | React.ReactNode => {
        if (currentErrors) {
            const error = currentErrors.filter(error => error.name === field);
            return error.length > 0 && <InputError>{error[0].message}</InputError>;
        }

        return false;
    };

    const renderInputs = ({ name, placeholder, label, type }: Inputs): React.ReactNode => {
        return (
            <React.Fragment>
                <Input
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    label={label}
                    value={values[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type={type}
                />
                {touched[name] && renderError(name)}
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <h1>Contact Us</h1>
            <h2>Get an answer within 24 hours</h2>
            <Form onSubmit={handleSubmit}>
                {messageSent && <Success>Your message has been successfully sent.</Success>}
                {renderInputs({ name: "firstName", placeholder: "First name" })}
                {renderInputs({ name: "lastName", placeholder: "Last name" })}
                {renderInputs({ name: "email", placeholder: "Email", type: "email" })}
                {renderInputs({ name: "message", placeholder: "Message", type: "textarea" })}
                <Button type="button">Send Message</Button>
            </Form>
        </React.Fragment>
    );
};

export default Contact;
