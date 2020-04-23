import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

type Props = {
    link?: string;
    type?: "Link" | "link" | "a" | "button";
    target?: string;
    rel?: string;
    onClick?: () => void;
};

const StyledLink = styled.a`
    display: inline-block;
    background-color: ${(props): string => props.theme.colors.secondary};
    color: ${(props): string => props.theme.colors.text};
    text-decoration: none;
    border: none;
    padding: 12px 30px;
    border-radius: 3px;
    margin: 10px 0;
    cursor: pointer;
    outline: none;
    text-align: center;
    font-size: 14px;
    font-weight: 700;

    &:hover {
        background-color: ${(props): string => props.theme.colors.secondaryLight};
        transition: background-color 0.3s;
    }

    &:active {
        margin-top: 13px;
        margin-bottom: 7px;
        transition: margin 0.1s;
    }
`;

const Button: React.FC<Props> = (props: PropsWithChildren<Props>): React.ReactElement => {
    const { link = "", type = "link", children, target, rel, onClick } = props;

    if (type === "a") {
        return (
            <StyledLink href={link} target={target} rel={rel}>
                {children}
            </StyledLink>
        );
    } else if (type === "button") {
        return (
            <StyledLink as="button" onClick={onClick}>
                {children}
            </StyledLink>
        );
    } else {
        return (
            <StyledLink as={Link} to={link}>
                {children}
            </StyledLink>
        );
    }
};

export default Button;
