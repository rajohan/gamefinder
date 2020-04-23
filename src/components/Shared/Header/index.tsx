import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Navigation from "./Navigation";
import Toggle from "./ThemeToggler";

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%;
    z-index: 9999;
    background-color: ${(props): string => props.theme.colors.secondary};
    border-bottom: 3px solid ${(props): string => props.theme.colors.tertiary};

    .logo {
        margin-left: 20px;
        font-weight: 700;
        color: ${(props): string => props.theme.colors.text};
        text-decoration: none;

        &:hover {
            color: ${(props): string => props.theme.colors.linkHover};
        }
    }

    .navRight {
        display: flex;
        align-items: center;
    }
`;

const Header: React.FC = (): React.ReactElement => {
    return (
        <StyledHeader>
            <Link className="logo" to="/">
                Game Finder
            </Link>
            <div className="navRight">
                <Toggle />
                <Navigation />
            </div>
        </StyledHeader>
    );
};

export default Header;
