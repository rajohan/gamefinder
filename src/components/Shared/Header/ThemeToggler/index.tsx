import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { StoreContext } from "../../../../store";
import { setTheme } from "../../../../store/actions";
import { DARK_THEME, LIGHT_THEME } from "../../../../constants";

const StyledThemeToggler = styled.label<{ isChecked: boolean }>`
    display: flex;
    align-items: center;

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    span {
        position: relative;
        display: block;
        cursor: pointer;
        width: 52px;
        height: 26px;
        background-color: ${(props): string => props.theme.colors.primary};
        border-radius: 3px;
        margin: 10px;

        &::before {
            content: "";
            display: block;
            position: absolute;
            ${(props): string => (props.isChecked ? "right" : "left")}: 0;
            top: 0;
            height: 26px;
            width: 26px;
            background-color: ${(props): string => props.theme.colors.white};
            border-radius: 3px;
            transition: 0.4s;
        }

        &::after {
            content: "${(props): string => (props.isChecked ? "\\1F31E" : "\\1F319")}";
            position: absolute;
            top: 4px;
            ${(props): string => (props.isChecked ? "left" : "right")}: 5px;
            font-size: 12px;
        }
    }
`;

const ThemeToggler: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useContext(StoreContext);
    const [isChecked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(state.theme !== DARK_THEME);
    }, [state.theme]);

    const handleClick = (): void => {
        const theme = !isChecked ? LIGHT_THEME : DARK_THEME;
        dispatch(setTheme(theme));
    };

    return (
        <StyledThemeToggler isChecked={isChecked}>
            <input type="checkbox" checked={isChecked} onChange={handleClick} />
            <span />
        </StyledThemeToggler>
    );
};

export default ThemeToggler;
