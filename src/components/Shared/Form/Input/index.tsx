import React, { PropsWithChildren } from "react";
import styled from "styled-components";

import Label from "../Label";

const StyledInput = styled.div`
    margin: 7px 0;
    width: 100%;

    input,
    textarea {
        background-color: ${(props): string => props.theme.colors.tertiary};
        border: none;
        color: ${(props): string => props.theme.colors.text};
        padding: 9px 10px 7px 10px;
        border-radius: 2px;
        outline: none;
        border-bottom: 3px solid ${(props): string => props.theme.colors.tertiary};
        width: 100%;

        &:focus {
            border-color: ${(props): string => props.theme.colors.secondary};
        }

        &::placeholder {
            color: ${(props): string => props.theme.colors.primary};
            opacity: 1;
        }
    }

    textarea {
        margin-bottom: -4px;
        resize: vertical;
        min-height: 200px;
    }
`;

type Props = {
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
};

const Input: React.FC<Props> = (props: PropsWithChildren<Props>): React.ReactElement => {
    const { id = "", name, type = "text", placeholder, label, value, onChange, onBlur } = props;

    const input =
        type === "textarea" ? (
            <textarea id={id} name={name} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur} />
        ) : (
            <input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        );

    if (label) {
        return (
            <StyledInput>
                <Label htmlFor={id}>{label}</Label>
                {input}
            </StyledInput>
        );
    }

    return <StyledInput>{input}</StyledInput>;
};

export default Input;
