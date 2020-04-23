import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    width: 100%;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    background-color: ${(props): string => props.theme.colors.secondary};
    border-top: 3px solid ${(props): string => props.theme.colors.tertiary};

    small {
        padding: 5px;
        font-size: 14px;
        width: 100%;
        text-align: center;
    }

    a {
        margin: 0 5px;
        color: ${(props): string => props.theme.colors.link};
        text-decoration: none;

        &:hover {
            color: ${(props): string => props.theme.colors.linkHover};
        }
    }
`;

const Footer: React.FC = (): React.ReactElement => {
    return (
        <StyledFooter>
            <small>
                Game data and images provided by the
                <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer">
                    rawg.io
                </a>
                API
            </small>
            <small>
                Website created by Raymond Johannessen &copy; 2020
                <a href="https://rajohan.no" target="_blank" rel="noopener noreferrer">
                    rajohan.no
                </a>
            </small>
        </StyledFooter>
    );
};

export default Footer;
