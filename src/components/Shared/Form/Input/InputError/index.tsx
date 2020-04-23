import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const InputErrorStyled = styled.div`
    background-color: ${(props): string => props.theme.colors.error};
    padding: 10px;
    border-radius: 5px;
    margin: -3px 0 10px 0;
    font-size: 13px;
    position: relative;
    width: 100%;
    animation: fadeIn 1s;

    &::before {
        content: "";
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid ${(props): string => props.theme.colors.error};
        position: absolute;
        top: -8px;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`;

const InputError: React.FC = ({ children }: PropsWithChildren<{}>): React.ReactElement => {
    return <InputErrorStyled>{children}</InputErrorStyled>;
};

export default InputError;
